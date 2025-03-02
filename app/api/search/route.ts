import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { placeName } = await req.json();

  console.log("🔍 API 요청 placeName:", placeName);
  console.log("🚀 Client ID:", process.env.NEXT_PUBLIC_NAVER_CLIENT_ID);
  console.log("🚀 Client Secret:", process.env.NAVER_CLIENT_SECRET);

  if (!placeName || typeof placeName !== "string") {
    return NextResponse.json(
      { error: "검색어를 입력해주세요." },
      { status: 400 }
    );
  }

  const url = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(placeName)}&display=5`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!,
        "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET!,
        "Content-Type": "application/json",
      },
    });

    console.log("📡 네이버 API 응답 상태 코드:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ 네이버 API 요청 실패:", errorText);
      return NextResponse.json(
        { error: `HTTP error! status: ${response.status}, body: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ places: data.items }, { status: 200 });
  } catch (error) {
    console.error("❌ 네이버 API 요청 실패:", error);
    return NextResponse.json(
      { error: "네이버 API 요청 실패" },
      { status: 500 }
    );
  }
}
