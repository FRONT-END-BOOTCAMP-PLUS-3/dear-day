import { PgUserRepository } from "@/infrastructure/repositories/PgUserRepository";
import { CheckEmailUsecase } from "@/application/usecases/join/CheckEmail";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { NextResponse } from "next/server";
import { CheckEmailDto } from "@/application/usecases/join/dto/CheckEmailDto";

export async function POST(email: string) {
  const userRepository: UserRepository = new PgUserRepository();

  const result: CheckEmailDto = await CheckEmailUsecase(email, userRepository);
  return NextResponse.json(result);
}
