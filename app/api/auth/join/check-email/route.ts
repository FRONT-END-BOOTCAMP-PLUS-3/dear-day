import { PgUserRepository } from "@/infrastructure/repositories/PgUserRepository";
import { CheckEmailUsecase } from "@/application/usecases/join/CheckEmail";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { NextResponse } from "next/server";
import { CheckEmailDto } from "@/application/usecases/join/dto/CheckEmailDto";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // ✅ JSON 데이터를 파싱하여 body에서 email 추출

    if (!body.email) {
      return NextResponse.json(
        { error: "이메일을 입력해주세요." },
        { status: 400 }
      );
    }

    const userRepository: UserRepository = new PgUserRepository();
    const result: CheckEmailDto = await CheckEmailUsecase(
      body.email,
      userRepository
    );

    return NextResponse.json(result);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 이메일 확인 중 서버 오류 발생:", error);
    }
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}
