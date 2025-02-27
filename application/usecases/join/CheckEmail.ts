import { UserRepository } from "@/domain/repositories/UserRepository";
import { CheckEmailDto } from "./dto/CheckEmailDto";

export const CheckEmailUsecase = async (
  email: string,
  userRepository: UserRepository
): Promise<CheckEmailDto> => {
  const user = await userRepository.findUserByEmail(email);

  return {
    email,
    isDuplicate: user !== null, // 해당 이메일을 가진 유저가 존재하면 true, 없으면 false
  };
};
