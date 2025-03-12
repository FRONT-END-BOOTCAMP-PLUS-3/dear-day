import { UserInfoDto } from "@/application/usecases/mypage/dto/UserInfoDto";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { User, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PgUserRepository implements UserRepository {
  // 마이페이지 사용자 정보 보여주는 메서드
  async findUserInfo(userId: string): Promise<UserInfoDto> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }

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

  async updateDropUser(userId: string): Promise<void> {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          delete_date: new Date(),
        },
      });
    } catch (error) {
      console.error("유저 탈퇴 업데이트 실패:", error);
      throw new Error("유저 탈퇴 업데이트 중 오류 발생");
    }
  }

  async findUserByUserId(userId: string): Promise<User | null> {
    try {
      return await prisma.user.findUnique({
        where: { id: userId },
      });
    } finally {
      await prisma.$disconnect();
    }
  }
}
