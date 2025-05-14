import { NextResponse } from "next/server";

interface NaverSearchItem {
  title: string;
  roadAddress: string;
  address: string;
}

interface Place {
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
}

export async function POST(req: Request) {
  const { placeName } = await req.json();
  if (!placeName || typeof placeName !== "string") {
    return NextResponse.json(
      { error: "검색어를 입력해주세요." },
      { status: 400 }
    );
  }

  const searchUrl = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(placeName)}&display=5`;

  try {
    // 🔹 네이버 로컬 검색 API 호출
    const response = await fetch(searchUrl, {
      method: "GET",
      headers: {
        "X-Naver-Client-Id": process.env.NAVER_SEARCH_CLIENT_ID!,
        "X-Naver-Client-Secret": process.env.NAVER_SEARCH_CLIENT_SECRET!,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 API 요청 처리 중 오류 발생:", errorText);
      }
      return NextResponse.json(
        { error: `HTTP error! status: ${response.status}, body: ${errorText}` },
        { status: response.status }
      );
    }

    const searchData: { items: NaverSearchItem[] } = await response.json();

    // 🔹 검색 결과에서 첫 번째 아이템의 주소를 이용하여 좌표 변환
    const places: Place[] = await Promise.all(
      searchData.items.map(async (place: NaverSearchItem) => {
        const address = place.roadAddress || place.address;

        // 🔹 Geocoding API 호출
        const geocodeUrl = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`;

        const geocodeResponse = await fetch(geocodeUrl, {
          method: "GET",
          headers: {
            "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!,
            "X-NCP-APIGW-API-KEY": process.env.NAVER_CLIENT_SECRET!,
            "Content-Type": "application/json",
          },
        });

        const geocodeData: { addresses: { x: string; y: string }[] } =
          await geocodeResponse.json();

        // 🔹 변환된 좌표가 있으면 사용, 없으면 기본값(0,0)
        const latitude =
          geocodeData.addresses.length > 0
            ? parseFloat(geocodeData.addresses[0].y)
            : 0;
        const longitude =
          geocodeData.addresses.length > 0
            ? parseFloat(geocodeData.addresses[0].x)
            : 0;

        return {
          placeName: place.title.replace(/<[^>]+>/g, ""),
          address,
          latitude,
          longitude,
        };
      })
    );

    return NextResponse.json({ places }, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 네이버 검색 중 오류 발생:", error);
    }
    return NextResponse.json(
      { error: "네이버 API 요청 실패" },
      { status: 500 }
    );
  }
}
