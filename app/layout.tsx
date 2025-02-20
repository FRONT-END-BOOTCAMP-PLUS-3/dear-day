import "./globals.scss";

export const metadata = {
  title: "Dear day",
  description: "원하는 생일카페를 쉽게 찾고 주최해보세요!",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
