"use client";

import { usePathname } from "next/navigation";
import MainHeader from "@/components/Header/MainHeader/MainHeader";
import BackHeader from "@/components/Header/BackHeader/BackHeader";
import DetailHeader from "@/components/Header/DetailHeader/DetailHeader";
import { headerConfig } from "@/config/headerConfig";
import "./globals.scss";
import Script from "next/script";
import { useHeaderStore } from "@/store/HeaderStore";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const dynamicTitle = useHeaderStore((state) => state.title); // Zustand에서 title 가져오기

  // 현재 경로와 일치하는 헤더 설정 찾기
  const headerInfo = headerConfig.find(({ pattern }) =>
    pattern.test(pathname as string)
  )?.config;

  let HeaderComponent;
  if (headerInfo?.type === "back") {
    HeaderComponent = <BackHeader title={headerInfo.title!} />;
  } else if (headerInfo?.type === "detail") {
    HeaderComponent = <DetailHeader />;
  } else if (headerInfo?.type === "dynamic") {
    HeaderComponent = <BackHeader title={dynamicTitle} />; // Zustand에서 가져온 title 사용
  } else {
    HeaderComponent = <MainHeader />;
  }

  return (
    <html lang="ko">
      <head>
        <title>Dear day</title>
        <meta
          name="description"
          content="원하는 생일카페를 쉽게 찾고 주최해보세요!"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon512_rounded.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>

      <body>
        <div id="root">
          {HeaderComponent} {/* 동적으로 선택된 헤더 렌더링 */}
          {children}
        </div>
        <Script
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
