"use client";

import { useState, useEffect } from "react";

const OPEN_CHAT_URL = "https://open.kakao.com/o/gwu7ZKti";

export default function WelcomePage() {
  const [role, setRole] = useState("");
  const [nickname, setNickname] = useState("");
  const [familyMembers, setFamilyMembers] = useState([]);

  useEffect(() => {
    setRole(sessionStorage.getItem("role") || "자녀");
    setNickname(sessionStorage.getItem("nickname") || "본인");
    const members = sessionStorage.getItem("familyMembers") || "";
    setFamilyMembers(members ? members.split(",") : []);
  }, []);

  const getMessage = () => {
    if (role === "부모") {
      return `우리 1주일 동안 매일 질문 하나씩 같이 답해보지 않을래?
'토닥터'라는 서비스인데, 가족이 더 가까워질 수 있대.
같이 해주면 정말 좋을 것 같아 ❤️

▶ 오픈채팅 입장: ${OPEN_CHAT_URL}

(둘 다 들어와야 답변을 주고받을 수 있어)`;
    } else {
      return `엄마(아빠), 우리 1주일 동안 매일 질문 하나씩 같이 답해보지 않을래?
'토닥터'라는 서비스인데, 가족이 더 가까워질 수 있대.
같이 해주면 좋을 것 같아 ❤️

▶ 오픈채팅 입장: ${OPEN_CHAT_URL}

(둘 다 들어가야 서로의 답변을 받아볼 수 있대)`;
    }
  };

  const handleKakaoShare = () => {
    if (typeof window === "undefined" || !window.Kakao) {
      alert("카카오톡 공유 기능을 불러오는 중이에요. 잠시 후 다시 시도해주세요.");
      return;
    }

    // text 타입으로 변경: 버튼 없이 메시지 본문에 URL 포함
    window.Kakao.Share.sendDefault({
      objectType: "text",
      text: getMessage(),
      link: {
        mobileWebUrl: OPEN_CHAT_URL,
        webUrl: OPEN_CHAT_URL,
      },
      buttonTitle: "오픈채팅 입장하기",
    });
  };

  return (
    <main className="min-h-screen bg-[#FFFBF5]">

      {/* ─── 상단 네비게이션 ─── */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-5 bg-[#FFFBF5]/90 backdrop-blur-sm border-b border-pink-100">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo-icon.png" alt="토닥터 로고" className="h-10 w-10" />
          <span className="text-2xl font-bold text-pink-500">토닥터</span>
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

        {/* ─── STEP 2: 닉네임 설정 매뉴얼 ─── */}
        <div className="bg-white rounded-3xl p-7 border border-pink-100 mb-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
              2
            </span>
            <h2 className="text-lg font-bold text-gray-800">
              가족 닉네임 설정 안내
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-5 leading-relaxed">
            오픈채팅 입장 시, 가족 모두가 <strong className="text-pink-500">닉네임 + 관계</strong> 형태로 설정해주세요.
            서로의 답변이 헷갈리지 않도록 도와줘요.
          </p>

          <div className="bg-pink-50 rounded-2xl p-5 mb-4">
            <p className="text-xs text-pink-500 font-semibold mb-1">내 닉네임</p>
            <p className="text-2xl font-bold text-gray-800">{nickname}</p>
          </div>

          {familyMembers.length > 0 && (
            <div className="bg-[#FFFBF5] rounded-2xl p-5 mb-4 border border-pink-100">
              <p className="text-xs text-pink-500 font-semibold mb-3">함께하는 가족이 입장할 때</p>
              <ul className="space-y-2">
                {familyMembers.map((member) => (
                  <li key={member} className="flex items-center gap-2 text-sm">
                    <span className="text-pink-500">▸</span>
                    <span className="text-gray-500">{member}는</span>
                    <span className="bg-white border border-pink-200 rounded-lg px-3 py-1 font-semibold text-pink-600">
                      {nickname} {member}
                    </span>
                    <span className="text-gray-500">로</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-xs text-gray-400 leading-relaxed">
            💡 카카오톡 오픈채팅방 입장 시 닉네임 변경 화면이 나와요. 위 형식대로 입력하면 끝!
          </p>
        </div>

        {/* ─── STEP 3: 가족에게 공유 ─── */}
        <div className="bg-white rounded-3xl p-7 border border-pink-100 mb-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
              3
            </span>
            <h2 className="text-lg font-bold text-gray-800">
              {role === "부모" ? "자녀에게" : "부모님께"} 카카오톡으로 보내기
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-5 leading-relaxed">
            아래 버튼을 누르면 카카오톡 공유 창이 열려요.<br />
            {role === "부모" ? "자녀를" : "부모님을"} 선택해서 메시지를 보내주세요.
          </p>

          <div className="bg-[#FFFBF5] border border-pink-100 rounded-2xl p-5 mb-4">
            <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
              {getMessage()}
            </p>
          </div>

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
            ✨ 모두 입장하시면<br />
            매일 정해진 시간에 질문이 도착해요.<br />
            <strong>1주일 완주 시 키링이 발송됩니다!</strong>
          </p>
        </div>

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