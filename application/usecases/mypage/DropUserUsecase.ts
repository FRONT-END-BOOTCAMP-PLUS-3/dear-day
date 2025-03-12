import { UserRepository } from "@/domain/repositories/UserRepository";

export const dropUserUsecase = async (
  userId: string,
  userRepo: UserRepository
): Promise<void> => {
  return await userRepo.updateDropUser(userId);
};
