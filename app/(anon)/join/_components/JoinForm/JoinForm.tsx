"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Input from "@/components/Input/Input/Input";
import styles from "./JoinForm.module.scss";
import FlexibleButton from "@/components/Button/FlexibleButton/FlexibleButton";

interface JoinFormProps {
  setIsFormValid: (valid: boolean) => void;
  onSubmit: (formData: FormDataType) => void; // ✅ 부모에게 데이터 전달
}

interface FormDataType {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function JoinForm({ setIsFormValid, onSubmit }: JoinFormProps) {
  const [formData, setFormData] = useState<FormDataType>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 중복 검사 상태
  const [emailError, setEmailError] = useState<string | null>(null); // 이메일 에러 메시지
  const [isValidForm, setIsValidForm] = useState(false); // ✅ 전체 폼 유효 상태

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 이메일이 변경되면 중복 검사 초기화
    if (name === "email") {
      setIsEmailValid(false);
      setEmailError(null);
    }

    checkFormValidity({ ...formData, [name]: value }, isEmailValid);
  };

  const checkFormValidity = (data: FormDataType, emailValid: boolean) => {
    const allFilled = Object.values(data).every((val) => val.trim() !== "");
    const passwordMatch = data.password === data.passwordConfirm;
    const isValid = allFilled && emailValid && passwordMatch;

    setIsFormValid(isValid);
    setIsValidForm(isValid);
  };

  // 이메일 중복 검사 API 호출
  const handleEmailCheck = async () => {
    const isValid =
      formData.email.includes("@") && formData.email.includes(".");
    if (!isValid) {
      alert("이메일 형식에 맞게 다시 입력하세요.");
      return;
    }

    try {
      const response = await fetch("/api/join/check-email", {
        method: "POST",
        body: JSON.stringify({ email: formData.email }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("서버 오류 발생");
      }

      const data = await response.json();
      if (data.isDuplicate) {
        setIsEmailValid(false);
        setEmailError("이미 사용 중인 이메일입니다.");
      } else {
        setIsEmailValid(true);
        setEmailError(null);
        alert("사용 가능한 이메일입니다.");
      }

      checkFormValidity(formData, !data.isDuplicate);
    } catch (error) {
      setEmailError("이메일 확인 중 오류가 발생했습니다.");
      console.error("이메일 확인 중 오류 발생:", error);
    }
  };
  // ✅ 폼이 유효해지면 부모 컴포넌트로 데이터 전달
  useEffect(() => {
    if (isValidForm) {
      onSubmit(formData);
    }
  }, [isValidForm, formData, onSubmit]);

  return (
    <form className={styles.form}>
      <div>
        <label className={styles.label}>이름</label>
        <Input
          name="username"
          value={formData.username}
          placeholder="실명을 입력해주세요."
          onChange={handleChange}
        />
      </div>

      <div>
        <label className={styles.label}>이메일</label>
        <div className={styles.emailValidation}>
          <Input
            name="email"
            type="email"
            value={formData.email}
            placeholder="이메일을 입력해주세요."
            onChange={handleChange}
          />
          <FlexibleButton
            onClick={handleEmailCheck}
            value={isEmailValid ? "사용 가능" : "중복 확인"}
            disabled={isEmailValid} // 이메일 중복 검사 성공 시 버튼 비활성화
          />
        </div>
        {emailError && <p className={styles.errorText}>{emailError}</p>}{" "}
        {/* 에러 메시지 표시 */}
      </div>

      <div>
        <label className={styles.label}>비밀번호</label>
        <Input
          name="password"
          type="password"
          value={formData.password}
          placeholder="8자 이상 문자를 입력해주세요."
          onChange={handleChange}
        />
      </div>

      <div>
        <label className={styles.label}>비밀번호 확인</label>
        <Input
          name="passwordConfirm"
          type="password"
          value={formData.passwordConfirm}
          placeholder="비밀번호를 다시 입력해주세요."
          onChange={handleChange}
        />
      </div>
    </form>
  );
}
