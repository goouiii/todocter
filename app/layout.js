// 이 파일은 모든 페이지에 공통으로 적용되는 레이아웃입니다.
// HTML 구조의 가장 바깥쪽 부분이라고 생각하면 돼요.
// 여기에 GA(구글 애널리틱스)를 심으면 모든 페이지에서 추적이 가능해집니다.

import "./globals.css";
// Next.js의 Script 컴포넌트: 외부 스크립트를 안전하게 불러오는 도구
import Script from "next/script";

// ─── 페이지의 메타 정보 (검색엔진/SNS 공유용) ───
export const metadata = {
  title: "토닥터 - 가족과의 마음을 잇는 1주일",
  description: "매일 한 가지 질문으로 부모-자녀의 거리를 좁혀보세요. 1주일 완주 시 키링 선물을 드려요.",
};

// ─── 구글 애널리틱스 측정 ID ───
// 1단계에서 발급받은 GA ID를 여기에 입력합니다.
const GA_ID = "G-9L7MSGGYDE";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* ─── Google Analytics 4 스크립트 ─── */}
        {/* 첫 번째 스크립트: GA 라이브러리 불러오기 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        {/* 두 번째 스크립트: GA 초기화 */}
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