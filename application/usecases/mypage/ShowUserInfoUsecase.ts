import { UserInfoDto } from "@/application/usecases/mypage/dto/UserInfoDto";
import { UserRepository } from "@/domain/repositories/UserRepository";

export const showUserInfoUsecase = async (
  userRepository: UserRepository,
  userId: string
): Promise<UserInfoDto> => {
  return await userRepository.findUserInfo(userId);
};
