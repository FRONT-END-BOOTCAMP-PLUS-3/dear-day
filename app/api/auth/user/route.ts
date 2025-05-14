import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded !== "string" && "id" in decoded) {
      return NextResponse.json({ id: decoded.id });
    } else {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 서버 오류 발생:", err);
    }
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
