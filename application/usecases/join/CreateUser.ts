import bcrypt from "bcrypt";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { CreateUserDto } from "./dto/CreateUserDto";
import { User } from "@prisma/client";
import { v4 as uuidv4 } from "uuid"; // UUID 생성

const validatePassword = (password: string): boolean => {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 8;

  return hasLetter && hasNumber && hasSpecial && isLongEnough;
};

export const CreateUserUsecase = async (
  user: CreateUserDto,
  userRepository: UserRepository
): Promise<User> => {
  // 비밀번호 유효성 검사
  if (!validatePassword(user.password)) {
    throw new Error(
      "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다."
    );
  }

  const hashedPassword = await bcrypt.hash(user.password, 10); // 비밀번호 암호화

  return await userRepository.createUser({
    id: uuidv4(),
    username: user.username,
    email: user.email,
    password: hashedPassword, // 암호화된 비밀번호 저장
    createdAt: new Date(),
    deleteDate: null,
  });
};
