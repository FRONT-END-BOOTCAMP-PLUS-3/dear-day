import { User } from "@prisma/client";

export interface UserRepository {
  findUserByEmail(email: string): Promise<User | null>; // 이메일로 사용자 찾는 메서드
  createUser(user: User): Promise<User>; // 유저 생성하는 메서드
  execute(email: string): Promise<User | null>; // 로그인하는 메서드
}
