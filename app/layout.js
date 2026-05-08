import "./globals.css";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://todocter.vercel.app"),
  title: "토닥터 - 가족과의 마음을 잇는 1주일",
  description: "매일 한 가지 질문으로 부모-자녀의 거리를 좁혀보세요. 1주일 완주 시 키링 선물을 드려요.",
  icons: {
    icon: "/logo-icon.png",
  },
  openGraph: {
    title: "토닥터 - 가족과의 마음을 잇는 1주일",
    description: "매일 한 가지 질문으로 부모-자녀의 거리를 좁혀보세요.",
    images: [
      {
        url: "https://todocter.vercel.app/logo-icon.png",
        width: 800,
        height: 800,
        alt: "토닥터",
      },
    ],
  },
};

const GA_ID = "G-9L7MSGGYDE";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* ─── Google Analytics 4 ─── */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}