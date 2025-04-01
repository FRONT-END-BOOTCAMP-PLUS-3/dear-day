import nodemailer from "nodemailer";
import { SendEmailDto } from "./dto/SendEmailDto";

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MAILER_ID,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

const otpStorage: { [key: string]: string } = {}; // 이메일별 OTP 저장

export const SendEmailUsecase = async (
  email: string
): Promise<SendEmailDto> => {
  if (!email) {
    return { ok: false };
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
    return { ok: true, code: generatedCode };
  } catch (error) {
    console.error("Email sending error:", error);
    return { ok: false };
  }
};
