import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "토닥터 - 가족과의 마음을 잇는 1주일",
  description: "매일 한 가지 질문으로 부모-자녀의 거리를 좁혀보세요. 1주일 완주 시 키링 선물을 드려요.",
};

const GA_ID = "G-9L7MSGGYDE";
const KAKAO_KEY = "99300db50bf71ee73b0fd1ae791fd888";

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

        {/* ─── Kakao SDK 불러오기 ─── */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
          integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* ─── Kakao SDK 초기화 ─── */}
        {/* 위 SDK가 로드되면 자동으로 JavaScript 키로 초기화합니다. */}
        <Script id="kakao-init" strategy="afterInteractive">
          {`
            (function() {
              var tryInit = function() {
                if (window.Kakao) {
                  if (!window.Kakao.isInitialized()) {
                    window.Kakao.init('${KAKAO_KEY}');
                  }
                } else {
                  setTimeout(tryInit, 100);
                }
              };
              tryInit();
            })();
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}