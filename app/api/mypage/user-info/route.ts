import { NextResponse } from "next/server";
import { showUserInfoUsecase } from "@/application/usecases/mypage/ShowUserInfoUsecase";
import { getUserIdFromToken } from "@/utils/auth";
import { PgUserRepository } from "@/infrastructure/repositories/PgUserRepository";

export async function GET() {
  try {
    const userId = await getUserIdFromToken();
    const userRepository = new PgUserRepository();
    const userInfo = await showUserInfoUsecase(
      userRepository,
      userId as string
    );

    return NextResponse.json(userInfo, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 API 요청 처리 중 오류 발생:", error);
    }
    return NextResponse.json(
      { error: "Failed to fetch user info" },
      { status: 500 }
    );
  }
}
