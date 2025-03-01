import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { LoginDto } from "./dto/LoginDto";
import { User } from "@prisma/client";

export const LoginUsecase = async (
  loginInfo: LoginDto,
  userRepository: UserRepository
): Promise<{ user: User | null; token?: string }> => {
  const userInfo = await userRepository.execute(loginInfo.email);

  if (!userInfo) {
    return { user: null };
  }

  const isPasswordValid = await bcrypt.compare(
    loginInfo.password,
    userInfo.password
  );
  if (!isPasswordValid) return { user: null };

  const token = jwt.sign(
    { id: userInfo.id }, // 페이로드 (유저 정보 일부 포함)
    process.env.NEXT_PUBLIC_JWT_SECRET!, // 환경 변수에서 비밀키 가져오기
    { expiresIn: "1h" } // 토큰 만료 시간 설정
  );

  return { user: userInfo, token }; // 로그인 성공 시 사용자 정보 반환
};
