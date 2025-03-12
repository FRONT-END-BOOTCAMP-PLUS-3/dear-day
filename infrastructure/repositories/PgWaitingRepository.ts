import { PrismaClient, Waiting } from "@prisma/client";
import { WaitingRepository } from "@/domain/repositories/WaitingRepository";
import { HeadCountDto } from "@/application/usecases/ticket/dto/HeadCountDto";
import { WaitingCardViewDto } from "@/application/usecases/mypage/dto/WaitingCardViewDto";

const prisma = new PrismaClient();

export class PgWaitingRepository implements WaitingRepository {
  async findAllWaitingByUserId(userId: string): Promise<WaitingCardViewDto[]> {
    const waitings = await prisma.waiting.findMany({
      where: { userId, status: "PENDING" },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            address: true,
            mainImage: true,
            star: { select: { stageName: true } },
          },
        },
      },
    });

    return await Promise.all(
      waitings.map(async (waiting) => {
        const waitingAhead = await prisma.waiting.count({
          where: {
            eventId: waiting.eventId,
            status: "PENDING",
            waitingNumber: { lt: waiting.waitingNumber },
          },
        });

        return {
          mode: "WAITING",
          eventId: waiting.eventId,
          userId: waiting.userId,
          mainImage: waiting.event.mainImage,
          stageName: waiting.event.star.stageName,
          title: waiting.event.title,
          address: waiting.event.address,
          waitingNumber: waiting.waitingNumber,
          waitingAhead,
        };
      })
    );
  }

  async deleteWaiting(eventId: number, userId: string): Promise<void> {
    const deleted = await prisma.waiting.deleteMany({
      where: { eventId, userId },
    });

    if (deleted.count === 0) {
      throw new Error("해당 대기가 존재하지 않습니다.");
    }
  }

  async findWaitingTicket(
    eventId: number,
    userId: string
  ): Promise<HeadCountDto> {
    try {
      const waiting = await prisma.waiting.findFirst({
        where: { eventId, userId },
        select: { waitingNumber: true, headCount: true },
      });

      if (!waiting) {
        return { waitingNumber: 0, headCount: 0, waitingAhead: 0 };
      }

      const waitingAhead = await prisma.waiting.count({
        where: {
          eventId,
          status: "PENDING",
          waitingNumber: { lt: waiting.waitingNumber }, // 앞에 있는 사람들만 카운트
        },
      });

      return {
        waitingNumber: waiting.waitingNumber,
        headCount: waiting.headCount,
        waitingAhead,
      };
    } catch (error) {
      console.error("대기 정보 불러오기 오류 발생", error);
      throw new Error("대기 정보 불러오기 오류 발생했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }

  // 이벤트 ID로 대기 명단 조회
  async findAllWaitingsByEventId(eventId: number): Promise<Waiting[]> {
    try {
      return await prisma.waiting.findMany({
        where: { eventId },
      });
    } catch (error) {
      console.error("대기 명단 조회 중 오류 발생:", error);
      throw new Error("대기 명단을 불러오는 중 오류가 발생했습니다.");
    } finally {
      await prisma.$disconnect(); // DB 연결 해제
    }
  }

  // 대기 정보 전송하는 메서드
  async createWaiting(waiting: Waiting): Promise<void> {
    try {
      await prisma.waiting.create({
        data: {
          eventId: waiting.eventId,
          userId: waiting.userId,
          waitingNumber: waiting.waitingNumber,
          headCount: waiting.headCount,
        },
      });
    } finally {
      await prisma.$disconnect();
    }
  }
}
