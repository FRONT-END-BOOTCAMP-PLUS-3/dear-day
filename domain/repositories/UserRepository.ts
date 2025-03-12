import { UserInfoDto } from "@/application/usecases/mypage/dto/UserInfoDto";
import { User } from "@prisma/client";

export interface UserRepository {
  findUserByEmail(email: string): Promise<User | null>; // 이메일로 사용자 찾는 메서드
  createUser(user: User): Promise<User>; // 유저 생성하는 메서드
  execute(email: string): Promise<User | null>; // 로그인하는 메서드
  findUserInfo(userId: string): Promise<UserInfoDto>; // 마이페이지 사용자 정보 보여주는 메서드
  updateDropUser(userId: string): Promise<void>;
}
