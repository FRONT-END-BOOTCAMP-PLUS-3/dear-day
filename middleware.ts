import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;

  // 로그인하지 않은 사용자가 /member 경로 접근하면 anon 또는 /login으로 리디렉트
  if (pathname.startsWith("/member") && !token) {
    const anonPath = pathname.replace("/member", ""); // "/member/mypage" → "/mypage"
    const availableAnonPaths = [
      "/",
      "/login",
      "/join",
      "/list",
      "/search_star", // "/search/[star_id]" 대응
      "/event", // "/event/[event_id]" 대응
    ];

    if (
      availableAnonPaths.some(
        (path) => anonPath === path || anonPath.startsWith(path + "/")
      )
    ) {
      return NextResponse.redirect(new URL(anonPath, req.url));
    }

    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 로그인한 사용자가 (anon) 내부 페이지 (/login, /join 등) 접근 시 /member로 이동
  const anonPaths = [
    "/",
    "/login",
    "/join",
    "/list",
    "/search_star", // "/search/[star_id]" 대응
    "/event", // "/event/[event_id]" 대응
  ];
  if (
    token &&
    anonPaths.some(
      (path) => pathname === path || pathname.startsWith(path + "/")
    )
  ) {
    return NextResponse.redirect(new URL(`/member`, req.url));
  }

  return NextResponse.next();
}

// (anon) 폴더의 실제 URL 경로에 적용
export const config = {
  matcher: [
    "/",
    "/member/:path*", // ✅ /member 관련 경로 보호
    "/login", // ✅ 로그인 페이지 보호
    "/join", // ✅ 회원가입 페이지 보호
    "/list", // ✅ 리스트 페이지 보호
    "/search_star/:path*", // ✅ "/search/[star_id]" 대응
    "/event/:path*", // ✅ "/event/[event_id]" 대응
  ],
};
