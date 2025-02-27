import { UserRepository } from "@/domain/repositories/UserRepository";

import { User, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PgUserRepository implements UserRepository {
  // 이메일로 사용자 찾는 메서드
  async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
  // 유저 생성하는 메서드
  async createUser(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      // id와 createdAt은 일부러 넣지 않았음! DB에서 기본값으로 넣어줘요
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });

    return createdUser;
  }
}
