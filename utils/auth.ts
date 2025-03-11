import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * 쿠키에서 토큰을 가져와 해석하여 userId 반환 (없으면 null)
 */
export async function getUserIdFromToken(): Promise<string | null> {
  try {
    // 1. 쿠키에서 토큰 가져오기
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return null; // 인증 실패
    }

    // 2. 토큰 해석하여 userId 추출
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
        return null; // 유효하지 않은 토큰
      }

      return decoded.id as string; // 정상적인 userId 반환
    } catch (error) {
      console.error(error);
      return null; // 토큰 검증 실패
    }
  } catch (error) {
    console.error("🔥 토큰 해석 중 오류 발생:", error);
    return null;
  }
}
