"use client";

import { useState } from "react";
// 페이지 이동을 위한 도구
import { useRouter } from "next/navigation";

export default function ApplyPage() {
  // 페이지 이동을 위한 router 도구 가져오기
  const router = useRouter();

  // ─── 폼 입력값을 저장하는 상태(state) ───
  const [formData, setFormData] = useState({
    role: "",       // 부모 / 자녀 구분
    age: "",        // 나이
    nickname: "",   // 오픈채팅 닉네임
    email: "",      // 이메일
  });

  // ─── 입력값이 바뀔 때 실행되는 함수 ───
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ─── 부모/자녀 선택 버튼을 눌렀을 때 ───
  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  // ─── 제출 버튼을 눌렀을 때 ───
  // 지금은 DB 저장 없이 다음 페이지(/welcome)로 이동만 합니다.
  // 6단계에서 Supabase 저장으로 교체할 예정이에요.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("제출된 데이터:", formData);

    // 다음 페이지에서 사용하기 위해 역할(부모/자녀)을 임시 저장
    sessionStorage.setItem("role", formData.role);

    // 참여 안내 페이지로 이동
    router.push("/welcome");
  };

  return (
    <main className="min-h-screen bg-[#FFFBF5]">

      {/* ─── 상단 네비게이션 바 ─── */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-5 bg-[#FFFBF5]/90 backdrop-blur-sm sticky top-0 z-50 border-b border-pink-100">
        <a href="/" className="text-2xl font-bold text-pink-500">
          토닥터
        </a>
        <a
          href="/"
          className="text-sm text-gray-500 hover:text-pink-500 transition"
        >
          ← 홈으로
        </a>
      </nav>

      {/* ─── 폼 영역 ─── */}
      <section className="max-w-xl mx-auto px-6 py-14">

        {/* 페이지 헤더 */}
        <div className="text-center mb-10">
          <span className="inline-block bg-pink-100 text-pink-600 text-sm font-medium px-4 py-1.5 rounded-full mb-5">
            🌸 토닥터 신청하기
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
            가족과의 1주일,<br />지금 시작해보세요
          </h1>
          <p className="text-gray-500">
            아래 정보를 입력하시면 오픈채팅 링크를 보내드려요.
          </p>
        </div>

        {/* 실제 폼 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">

          {/* 부모 / 자녀 구분 (버튼 형태로 선택) */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              나는 어느 쪽인가요? <span className="text-pink-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* 부모 버튼 */}
              <button
                type="button"
                onClick={() => handleRoleSelect("부모")}
                className={`py-4 rounded-2xl border-2 font-semibold transition ${
                  formData.role === "부모"
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-pink-300"
                }`}
              >
                👨‍👩‍👧 부모
              </button>
              {/* 자녀 버튼 */}
              <button
                type="button"
                onClick={() => handleRoleSelect("자녀")}
                className={`py-4 rounded-2xl border-2 font-semibold transition ${
                  formData.role === "자녀"
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-pink-300"
                }`}
              >
                🙋 자녀
              </button>
            </div>
          </div>

          {/* 나이 입력 */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              나이 <span className="text-pink-500">*</span>
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="예: 28"
              required
              min="1"
              max="120"
              className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* 닉네임 입력 */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              오픈채팅 닉네임 <span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="예: 사랑하는딸"
              required
              maxLength={20}
              className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <p className="text-xs text-gray-400 mt-1">오픈채팅에서 사용할 이름이에요.</p>
          </div>

          {/* 이메일 입력 */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              이메일 <span className="text-pink-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="예: family@todocter.com"
              required
              className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <p className="text-xs text-gray-400 mt-1">키링 발송 안내 등에 사용돼요.</p>
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={!formData.role}
            className="w-full bg-pink-500 text-white py-5 rounded-2xl font-bold text-lg hover:bg-pink-600 transition shadow-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            오픈채팅 링크 받기 →
          </button>

          {/* 작은 안내 */}
          <p className="text-xs text-center text-gray-400">
            제출하시면 다음 화면에서 오픈채팅 링크와 부모님께 보낼<br />
            메시지를 받을 수 있어요.
          </p>

        </form>
      </section>

    </main>
  );
}