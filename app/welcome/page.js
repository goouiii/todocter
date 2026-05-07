// 폼 제출 후 보여지는 참여 안내 페이지입니다.
// 오픈채팅 링크, 부모님(또는 자녀)께 보낼 메시지 템플릿을 보여줘요.

"use client";

// useState: 화면 상태를 저장하는 도구 (예: 복사 완료 표시용)
// useEffect: 페이지 로드 시 한 번 실행되는 도구 (역할 정보 읽어오기용)
import { useState, useEffect } from "react";

// 카카오톡 오픈채팅방 링크 (1단계에서 만든 링크)
const OPEN_CHAT_URL = "https://open.kakao.com/o/gwu7ZKti";

export default function WelcomePage() {
  // 신청자가 부모인지 자녀인지 저장 (메시지 템플릿이 다르게 보이도록)
  const [role, setRole] = useState("");
  // 메시지 복사 완료 여부 (버튼 텍스트 바뀌도록)
  const [copied, setCopied] = useState(false);

  // 페이지가 처음 열릴 때 sessionStorage에서 역할 정보를 읽어옴
  useEffect(() => {
    const savedRole = sessionStorage.getItem("role");
    setRole(savedRole || "자녀"); // 값이 없으면 기본값 "자녀"
  }, []);

  // ─── 부모/자녀에 따라 다른 메시지 템플릿 ───
  const getMessageTemplate = () => {
    if (role === "부모") {
      // 부모가 신청한 경우 → 자녀에게 보낼 메시지
      return `우리 1주일 동안 매일 질문 하나씩 같이 답해보지 않을래?
'토닥터'라는 서비스인데, 가족이 더 가까워질 수 있대.
같이 해주면 정말 좋을 것 같아 ❤️

[입장하기]
${OPEN_CHAT_URL}

(둘 다 들어와야 답변을 주고받을 수 있어)`;
    } else {
      // 자녀가 신청한 경우 → 부모에게 보낼 메시지 (기본값)
      return `엄마(아빠), 우리 1주일 동안 매일 질문 하나씩 같이 답해보지 않을래?
'토닥터'라는 서비스인데, 가족이 더 가까워질 수 있대.
같이 해주면 좋을 것 같아 ❤️

[입장하기]
${OPEN_CHAT_URL}

(둘 다 들어가야 서로의 답변을 받아볼 수 있대)`;
    }
  };

  // ─── 메시지 복사 함수 ───
  const handleCopy = async () => {
    try {
      // 브라우저의 클립보드에 메시지 복사
      await navigator.clipboard.writeText(getMessageTemplate());
      setCopied(true);
      // 2초 후 버튼 텍스트를 원래대로 되돌리기
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("복사에 실패했어요. 직접 선택해서 복사해주세요.");
    }
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

        {/* ─── STEP 2: 가족에게 메시지 보내기 ─── */}
        <div className="bg-white rounded-3xl p-7 border border-pink-100 mb-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
              2
            </span>
            <h2 className="text-lg font-bold text-gray-800">
              {role === "부모" ? "자녀에게" : "부모님께"} 메시지 보내기
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-5 leading-relaxed">
            아래 메시지를 복사해서 카카오톡으로 보내주세요. 둘 다 입장해야 서로의 답변을 받아볼 수 있어요.
          </p>

          {/* 메시지 미리보기 박스 */}
          <div className="bg-[#FFFBF5] border border-pink-100 rounded-2xl p-5 mb-4">
            <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
              {getMessageTemplate()}
            </p>
          </div>

          {/* 복사 버튼 */}
          <button
            onClick={handleCopy}
            className={`w-full py-4 rounded-2xl font-bold text-base transition ${
              copied
                ? "bg-green-500 text-white"
                : "bg-pink-500 text-white hover:bg-pink-600"
            }`}
          >
            {copied ? "✓ 복사 완료!" : "📋 메시지 복사하기"}
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