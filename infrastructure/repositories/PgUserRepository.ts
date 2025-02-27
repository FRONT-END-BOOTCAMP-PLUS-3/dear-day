import { UserRepository } from "@/domain/repositories/UserRepository";
import { User, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PgUserRepository implements UserRepository {
  // 이메일로 사용자 찾는 메서드
  async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await prisma.user.findUnique({
        where: { email },
      });
    } finally {
      await prisma.$disconnect();
    }
  }

  // 유저 생성하는 메서드
  async createUser(user: User): Promise<User> {
    try {
      const createdUser = await prisma.user.create({
        data: {
          username: user.username,
          email: user.email,
          password: user.password,
        },
      });
      return createdUser;
    } finally {
      await prisma.$disconnect();
    }
  }
}
