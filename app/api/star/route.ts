import { StarRepository } from "@/domain/repositories/StarRepository";
import { CreateStarDto } from "@/application/usecases/star/dto/CreateStarDto";
import { PgStarRepository } from "@/infrastructure/repositories/PgStarRepository";
import { NextRequest, NextResponse } from "next/server";
import { createStarUsecase } from "@/application/usecases/star/CreateStarUsecase";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const data: CreateStarDto = await req.json();

      const StarRepository: StarRepository = new PgStarRepository();

      // 스타 생성 실행
      await createStarUsecase(StarRepository, data);

      return NextResponse.json({ message: "스타 생성 완료" }, { status: 201 });
    } catch (error) {
      console.error("스타 생성 오류:", error);
      return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
    }
  }
}
