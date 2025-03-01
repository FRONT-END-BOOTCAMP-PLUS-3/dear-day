import { Star } from "@prisma/client";

export interface StarRepository {
  createStar(star: Star): Promise<void>;
}
