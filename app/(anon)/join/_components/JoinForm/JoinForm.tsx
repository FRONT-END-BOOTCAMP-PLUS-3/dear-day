"use client";

import { useState, ChangeEvent } from "react";
import Input from "@/components/Input/Input/Input";
import styles from "./JoinForm.module.scss";
import FlexibleButton from "@/components/Button/FlexibleButton/FlexibleButton";

export default function JoinForm({
  setIsFormValid,
}: {
  setIsFormValid: (valid: boolean) => void;
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [isEmailValid, setIsEmailValid] = useState(false); // ✅ 중복 확인 상태

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    checkFormValidity({ ...formData, [name]: value }, isEmailValid);
  };

  const checkFormValidity = (data: typeof formData, emailValid: boolean) => {
    const allFilled = Object.values(data).every((val) => val.trim() !== "");
    const passwordMatch = data.password === data.passwordConfirm;
    setIsFormValid(allFilled && emailValid && passwordMatch);
  };

  const handleEmailCheck = async () => {
    // ✅ 이메일 중복 확인 로직 (예제)
    const isValid = formData.email.includes("@"); // 예제: "@" 포함 여부로 검증
    setIsEmailValid(isValid);
    checkFormValidity(formData, isValid);
    alert(
      isValid ? "사용 가능한 이메일입니다." : "이미 사용 중인 이메일입니다."
    );
  };

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
            value="중복 확인"
            disabled={isEmailValid}
          />
        </div>
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
