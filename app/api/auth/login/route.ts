import { NextResponse } from "next/server";
import { PgUserRepository } from "@/infrastructure/repositories/PgUserRepository";
import { LoginUsecase } from "@/application/usecases/login/Login";
import { UserRepository } from "@/domain/repositories/UserRepository";

export async function POST(req: Request) {
  try {
    const loginInfo = await req.json();

    // 이메일 및 비밀번호가 존재하는지 확인
    if (!loginInfo.email || !loginInfo.password) {
      return NextResponse.json(
        { error: "아이디 / 비밀번호를 모두 입력해주세요." },
        { status: 400 }
      );
    }

    const userRepository: UserRepository = new PgUserRepository();
    const data = await LoginUsecase(loginInfo, userRepository);

    if (!data.user) {
      return NextResponse.json({ error: "로그인 실패" }, { status: 401 });
    }

    // JWT 토큰을 HTTP-Only 쿠키에 저장
    const response = NextResponse.json({ id: data.user.id });
    response.headers.set(
      "Set-Cookie",
      `auth_token=${data.token}; Path=/; HttpOnly; SameSite=Strict; ${
        process.env.NODE_ENV === "production" ? "Secure;" : ""
      } Max-Age=3600`
    );

    return response;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 로그인 처리 중 오류 발생:", error);
    }
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}
