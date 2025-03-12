import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  const isProduction = process.env.NODE_ENV === "production";

  response.headers.set(
    "Set-Cookie",
    `auth_token=; Path=/; HttpOnly; SameSite=Strict; ${
      isProduction ? "Secure;" : ""
    } Expires=${new Date(0).toUTCString()}`
  );

  return response;
}
