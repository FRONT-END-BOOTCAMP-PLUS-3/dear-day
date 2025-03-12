import { dropUserUsecase } from "@/application/usecases/mypage/DropUserUsecase";
import { PgUserRepository } from "@/infrastructure/repositories/PgUserRepository";
import { getUserIdFromToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function PATCH() {
  const userId = await getUserIdFromToken();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userRepo = new PgUserRepository();
    const result = await dropUserUsecase(userId as string, userRepo);

    return NextResponse.json({ message: "삭제 완료", result }, { status: 200 });
  } catch (error) {
    console.error("삭제 요청 실패:", error);
    return NextResponse.json(
      { error: "삭제 요청 처리 중 오류 발생" },
      { status: 500 }
    );
  }
}
