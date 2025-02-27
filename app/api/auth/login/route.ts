import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// 임시 유저 데이터 (실제 DB 사용 시 교체 필요)
const users = [
  {
    id: "1687342937773762",
    email: "test123@naver.com",
    password: "test123",
  },
];

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  // ✅ 토큰 발급 (id 포함)
  const token = jwt.sign({ id: user.id }, "SECRET_KEY", { expiresIn: "1h" });

  // ✅ HTTP-Only 쿠키에 토큰 저장
  const response = NextResponse.json({ id: user.id });
  response.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // ✅ 프로덕션에서는 HTTPS 적용
    sameSite: "strict",
    maxAge: 60 * 60 * 1000, // 1시간 후 만료
  });

  return response;
}
