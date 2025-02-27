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

  async execute(email: string): Promise<User | null> {
    try {
      // 이메일로 사용자 조회
      const user = await prisma.user.findUnique({
        where: { email },
      });

      // 사용자가 존재하지 않으면 로그인 실패
      if (!user) return null;
      return user;
    } finally {
      await prisma.$disconnect();
    }
  }
}
