import bcrypt from "bcrypt";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { CreateUserDto } from "./dto/CreateUserDto";
import { User } from "@prisma/client";
import { v4 as uuidv4 } from "uuid"; // UUID 생성

export const CreateUserUsecase = async (
  user: CreateUserDto,
  userRepository: UserRepository
): Promise<User> => {
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
