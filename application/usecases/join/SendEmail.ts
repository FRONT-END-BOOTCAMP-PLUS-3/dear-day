import nodemailer from "nodemailer";
import { SendEmailDto } from "./dto/SendEmailDto";

// 이메일 전송을 위한 SMTP 설정
const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MAILER_ID,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

const otpStorage: { [key: string]: string } = {}; // 이메일별 OTP 저장

// 이메일로 인증 코드를 전송하는 함수
export const SendEmailUsecase = async (
  email: string
): Promise<SendEmailDto> => {
  if (!email) {
    return { ok: false, message: "이메일 주소가 필요합니다." }; // 이메일 주소가 없을 경우
  }

  const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
  otpStorage[email] = generatedCode; // OTP 저장

  const mailOptions = {
    from: process.env.NODE_MAILER_ID,
    to: email,
    subject: "[광운대학교 강의실 예약 시스템] 인증코드",
    html: `인증번호는 <strong>${generatedCode}</strong> 이며, 만료시간 3분 내에 입력해주시길 바랍니다.`,
  };

  try {
    await smtpTransport.sendMail(mailOptions);
    return {
      ok: true,
      code: generatedCode,
      message: "인증 코드가 발송되었습니다.",
    };
  } catch (error) {
    console.error("이메일 발송 오류:", error);
    return { ok: false, message: "이메일 발송에 실패했습니다." };
  }
};
