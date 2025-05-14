import { NextResponse } from "next/server";
import { SendEmailUsecase } from "@/application/usecases/join/SendEmail";
import { SendEmailDto } from "@/application/usecases/join/dto/SendEmailDto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email: string = body.email;

    // 이메일 전송 결과를 받음
    const sendEmail: SendEmailDto = await SendEmailUsecase(email);

    // 이메일 전송 결과에 따라 응답 처리
    if (sendEmail.ok) {
      return NextResponse.json(sendEmail, { status: 201 });
    } else {
      return NextResponse.json(
        { error: sendEmail.message || "이메일 발송에 실패했습니다." },
        { status: 500 }
      );
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 이메일 전송 오류:", error);
    }
    return NextResponse.json(
      { error: "회원가입 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
