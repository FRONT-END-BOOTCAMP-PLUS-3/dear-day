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
  verificationCode: string; // 이메일 인증 번호
}

export default function JoinForm({ setIsFormValid, onSubmit }: JoinFormProps) {
  const [formData, setFormData] = useState<FormDataType>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    verificationCode: "", // 이메일 인증 코드 상태 추가
  });

  const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 중복 검사 상태
  const [emailError, setEmailError] = useState<string | null>(null); // 이메일 에러 메시지
  const [isVerificationSent, setIsVerificationSent] = useState(false); // 이메일 인증 버튼 상태
  const [isValidForm, setIsValidForm] = useState(false); // ✅ 전체 폼 유효 상태
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 여부
  const [serverValidationCode, setServerValidationCode] = useState<
    string | null
  >(null); // 인증 코드
  const [countdown, setCountdown] = useState<number>(0); // 인증 코드 유효 시간 상태
  const [loading, setLoading] = useState<boolean>(false);
  const [verificationCodeError, setVerificationCodeError] = useState<
    string | null
  >(null); // 인증 코드 에러 메시지

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
      setCountdown(0); // 카운트다운 초기화
      setIsVerificationSent(false); // 인증 코드 전송 초기화
      setServerValidationCode(null);
      setIsEmailVerified(false); // 이메일 인증 여부 초기화
      setLoading(false);
      setIsValidForm(false); // 폼 유효성 초기화
      setVerificationCodeError(null); // 인증 코드 에러 초기화
    }

    // 인증 코드가 변경될 때마다 검증
    if (name === "verificationCode" && serverValidationCode) {
      if (value === serverValidationCode) {
        setIsEmailVerified(true);
        setVerificationCodeError(null); // 인증 코드 일치하면 에러 없애기
        setCountdown(0); // 인증 코드 일치 시 카운트다운 초기화
      } else {
        setIsEmailVerified(false);
        setVerificationCodeError("인증 코드가 동일하지 않습니다.");
      }
    }

    checkFormValidity({ ...formData, [name]: value }, isEmailValid);
  };

  const checkFormValidity = (data: FormDataType, emailValid: boolean) => {
    const allFilled = Object.values(data).every((val) => val.trim() !== "");
    const passwordMatch = data.password === data.passwordConfirm;
    const isValid = allFilled && emailValid && passwordMatch && isEmailVerified;

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
      const response = await fetch("/api/auth/join/check-email", {
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
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 이메일 확인 중 오류 발생:", error);
      }
    }
  };

  // 이메일 인증 API 호출
  const handleEmailVerification = async () => {
    setLoading(true);

    if (!isEmailValid) {
      alert("이메일 중복 확인을 먼저 해주세요.");
      return;
    }

    try {
      const response = await fetch("/api/auth/join/send-email", {
        method: "POST",
        body: JSON.stringify({ email: formData.email }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("서버 오류 발생");
      }

      const data = await response.json();

      // 인증 코드가 성공적으로 발송되었을 때의 처리
      if (data.ok) {
        alert("인증 코드가 이메일로 전송되었습니다.");
        setServerValidationCode(data.code || ""); // 인증코드 저장
        setCountdown(180); // 3분 카운트다운 시작
        setLoading(false);
      } else {
        alert("인증 코드 발송에 실패했습니다.");
      }

      setIsVerificationSent(true);
    } catch (error) {
      alert("인증 코드 전송 중 오류가 발생했습니다.");
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 인증 코드 전송 오류:", error);
      }
    }
  };

  // 카운트다운이 3분으로 설정되면, 1초씩 감소시키기
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

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
      {isEmailValid && (
        <div className={styles.verificationContainer}>
          <div>
            <FlexibleButton
              onClick={handleEmailVerification}
              value={
                loading
                  ? "전송 중..."
                  : countdown > 0
                    ? `남은 시간: ${Math.floor(countdown / 60)}:${(
                        countdown % 60
                      )
                        .toString()
                        .padStart(2, "0")}`
                    : isEmailVerified
                      ? "이메일 인증 완료"
                      : "이메일 인증 요청"
              }
              disabled={loading || countdown > 0 || isEmailVerified}
            />
          </div>

          {/* 인증 코드 입력 */}
          {!isEmailVerified && isVerificationSent && (
            <div>
              <Input
                name="verificationCode"
                type="text"
                value={formData.verificationCode}
                placeholder="인증 코드를 입력하세요."
                onChange={handleChange}
              />
              {verificationCodeError && (
                <p className={styles.errorText}>{verificationCodeError}</p>
              )}
            </div>
          )}
        </div>
      )}

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
