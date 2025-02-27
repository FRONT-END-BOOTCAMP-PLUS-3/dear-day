import { UserRepository } from "@/domain/repositories/UserRepository";
import { CreateUserDto } from "./dto/CreateUserDto";
import { v4 as uuidv4 } from "uuid";

export const CreateUserUsecase = async (
  user: CreateUserDto,
  userRepository: UserRepository
): Promise<CreateUserDto> => {
  return await userRepository.createUser({
    id: uuidv4(), // 일단 UUID 자동 생성 (이걸 실제 DB에 직접 집어넣는건 아님)
    ...user,
    createdAt: new Date(),
  });
};
