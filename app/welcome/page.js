"use client";

import { useState, useEffect } from "react";

// 카카오톡 오픈채팅방 링크
const OPEN_CHAT_URL = "https://open.kakao.com/o/gwu7ZKti";

export default function WelcomePage() {
  // 신청자 역할 (부모/자녀)
  const [role, setRole] = useState("");

  // 페이지 진입 시 sessionStorage에서 역할 정보 읽기
  useEffect(() => {
    const savedRole = sessionStorage.getItem("role");
    setRole(savedRole || "자녀");
  }, []);

  // ─── 부모/자녀에 따라 다른 메시지 ───
  const getMessage = () => {
    if (role === "부모") {
      return `우리 1주일 동안 매일 질문 하나씩 같이 답해보지 않을래?
'토닥터'라는 서비스인데, 가족이 더 가까워질 수 있대.
같이 해주면 정말 좋을 것 같아 ❤️
(둘 다 들어와야 답변을 주고받을 수 있어)`;
    } else {
      return `엄마(아빠), 우리 1주일 동안 매일 질문 하나씩 같이 답해보지 않을래?
'토닥터'라는 서비스인데, 가족이 더 가까워질 수 있대.
같이 해주면 좋을 것 같아 ❤️
(둘 다 들어가야 서로의 답변을 받아볼 수 있대)`;
    }
  };

  // ─── 카카오톡 공유 함수 ───
  const handleKakaoShare = () => {
    // 카카오 SDK가 로드되지 않았으면 안내 후 종료
    if (typeof window === "undefined" || !window.Kakao) {
      alert("카카오톡 공유 기능을 불러오는 중이에요. 잠시 후 다시 시도해주세요.");
      return;
    }

    // 카카오톡 공유 다이얼로그 열기
    window.Kakao.Share.sendDefault({
      objectType: "feed", // 피드 형태로 공유
      content: {
        title: "토닥터 - 가족과의 1주일",
        description: getMessage(),
        imageUrl: "https://todocter.vercel.app/og-image.png", // 미리보기 이미지 (없어도 OK)
        link: {
          mobileWebUrl: OPEN_CHAT_URL,
          webUrl: OPEN_CHAT_URL,
        },
      },
      buttons: [
        {
          title: "오픈채팅 입장하기",
          link: {
            mobileWebUrl: OPEN_CHAT_URL,
            webUrl: OPEN_CHAT_URL,
          },
        },
      ],
    });
  };

  return (
    <main className="min-h-screen bg-[#FFFBF5]">

      {/* ─── 상단 네비게이션 ─── */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-5 bg-[#FFFBF5]/90 backdrop-blur-sm border-b border-pink-100">
        <a href="/" className="text-2xl font-bold text-pink-500">
          토닥터
        </a>
      </nav>

      {/* ─── 메인 컨텐츠 ─── */}
      <section className="max-w-xl mx-auto px-6 py-12">

        {/* 신청 완료 헤더 */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
            신청이 완료되었어요!
          </h1>
          <p className="text-gray-500">
            이제 가족과 함께 토닥터를 시작할 시간이에요.
          </p>
        </div>

        {/* ─── STEP 1: 오픈채팅 입장 ─── */}
        <div className="bg-white rounded-3xl p-7 border border-pink-100 mb-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
              1
            </span>
            <h2 className="text-lg font-bold text-gray-800">
              오픈채팅방에 입장하기
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-5 leading-relaxed">
            아래 버튼을 눌러 토닥터 오픈채팅방에 먼저 들어가주세요.
          </p>
          <a
            href={OPEN_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-yellow-400 text-gray-900 text-center py-4 rounded-2xl font-bold text-base hover:bg-yellow-500 transition"
          >
            💬 카카오톡 오픈채팅방 입장
          </a>
        </div>

        {/* ─── STEP 2: 가족에게 공유 ─── */}
        <div className="bg-white rounded-3xl p-7 border border-pink-100 mb-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
              2
            </span>
            <h2 className="text-lg font-bold text-gray-800">
              {role === "부모" ? "자녀에게" : "부모님께"} 카카오톡으로 보내기
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-5 leading-relaxed">
            아래 버튼을 누르면 카카오톡 공유 창이 열려요.<br />
            {role === "부모" ? "자녀를" : "부모님을"} 선택해서 메시지를 보내주세요.
          </p>

          {/* 미리보기 메시지 */}
          <div className="bg-[#FFFBF5] border border-pink-100 rounded-2xl p-5 mb-4">
            <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
              {getMessage()}
            </p>
          </div>

          {/* 카카오 공유 버튼 */}
          <button
            onClick={handleKakaoShare}
            className="w-full bg-yellow-400 text-gray-900 py-4 rounded-2xl font-bold text-base hover:bg-yellow-500 transition flex items-center justify-center gap-2"
          >
            💬 카카오톡으로 공유하기
          </button>
        </div>

        {/* ─── 안내 박스 ─── */}
        <div className="bg-pink-50 border border-pink-200 rounded-3xl p-6 text-center">
          <p className="text-pink-700 text-sm leading-relaxed">
            ✨ 두 분 모두 입장하시면<br />
            매일 정해진 시간에 질문이 도착해요.<br />
            <strong>1주일 완주 시 키링이 발송됩니다!</strong>
          </p>
        </div>

        {/* 홈으로 돌아가기 */}
        <div className="text-center mt-10">
          <a
            href="/"
            className="text-sm text-gray-400 hover:text-pink-500 transition"
          >
            ← 홈으로 돌아가기
          </a>
        </div>

      </section>
    </main>
  );
}