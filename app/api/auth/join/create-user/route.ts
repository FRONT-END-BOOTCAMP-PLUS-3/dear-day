import { NextResponse } from "next/server";
import { PgUserRepository } from "@/infrastructure/repositories/PgUserRepository";
import { CreateUserUsecase } from "@/application/usecases/join/CreateUser";
import { CreateUserDto } from "@/application/usecases/join/dto/CreateUserDto";

export async function POST(req: Request) {
  try {
    const body: CreateUserDto = await req.json();

    // 필수 값 검증
    if (!body.username || !body.email || !body.password) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    const userRepository = new PgUserRepository();
    const createdUser = await CreateUserUsecase(body, userRepository);

    return NextResponse.json(createdUser, { status: 201 }); // 201 Created 반환
  } catch (error) {
    console.error("회원가입 오류:", error);
    return NextResponse.json(
      { error: "회원가입 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
