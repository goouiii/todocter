"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// 함께 참여할 가족 구성원 선택지
const FAMILY_OPTIONS = ["엄마", "아빠", "할머니", "할아버지", "형", "누나", "언니", "오빠", "동생", "아들", "딸"];

export default function ApplyPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    role: "",
    age: "",
    nickname: "",
    email: "",
    familyMembers: [], // 다중 선택용 배열
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  // ─── 가족 구성원 토글 함수 (다중 선택) ───
  const handleFamilyToggle = (member) => {
    const current = formData.familyMembers;
    if (current.includes(member)) {
      // 이미 선택돼있으면 빼기
      setFormData({ ...formData, familyMembers: current.filter((m) => m !== member) });
    } else {
      // 안 돼있으면 추가
      setFormData({ ...formData, familyMembers: [...current, member] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 가족 구성원 1명 이상 선택 필수
    if (formData.familyMembers.length === 0) {
      alert("함께 참여할 가족 구성원을 1명 이상 선택해주세요.");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("applications").insert([
      {
        role: formData.role,
        age: parseInt(formData.age, 10),
        nickname: formData.nickname,
        email: formData.email,
        family_members: formData.familyMembers.join(","), // 쉼표로 구분된 문자열로 저장
      },
    ]);

    if (error) {
      alert("신청 중 오류가 발생했어요. 다시 시도해주세요.");
      console.error(error);
      setIsSubmitting(false);
      return;
    }

    // 다음 페이지에서 사용할 정보 저장
    sessionStorage.setItem("role", formData.role);
    sessionStorage.setItem("nickname", formData.nickname); // 닉네임 추가 저장
    sessionStorage.setItem("familyMembers", formData.familyMembers.join(","));

    router.push("/welcome");
  };

  return (
    <main className="min-h-screen bg-[#FFFBF5]">

      {/* ─── 상단 네비게이션 바 ─── */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-5 bg-[#FFFBF5]/90 backdrop-blur-sm sticky top-0 z-50 border-b border-pink-100">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo-icon.png" alt="토닥터 로고" className="h-10 w-10" />
          <span className="text-2xl font-bold text-pink-500">토닥터</span>
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-7">

          {/* 부모 / 자녀 구분 */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              나는 어느 쪽인가요? <span className="text-pink-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
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

          {/* 함께 참여할 가족 구성원 (다중 선택) */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              누구와 함께 참여하시나요? <span className="text-pink-500">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-3">여러 명 선택 가능해요.</p>
            <div className="grid grid-cols-3 gap-2">
              {FAMILY_OPTIONS.map((member) => (
                <button
                  key={member}
                  type="button"
                  onClick={() => handleFamilyToggle(member)}
                  className={`py-3 rounded-xl border-2 text-sm font-semibold transition ${
                    formData.familyMembers.includes(member)
                      ? "bg-pink-500 text-white border-pink-500"
                      : "bg-white text-gray-600 border-gray-200 hover:border-pink-300"
                  }`}
                >
                  {member}
                </button>
              ))}
            </div>
          </div>

          {/* 나이 */}
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

          {/* 닉네임 */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              오픈채팅 닉네임 <span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
                            placeholder="예: 복덩이"
              required
              maxLength={20}
              className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <p className="text-xs text-gray-400 mt-1">
              가족 모두가 이 닉네임을 기준으로 오픈채팅에 입장하게 돼요.
            </p>
          </div>

          {/* 이메일 */}
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
            disabled={!formData.role || isSubmitting}
            className="w-full bg-pink-500 text-white py-5 rounded-2xl font-bold text-lg hover:bg-pink-600 transition shadow-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "제출 중..." : "오픈채팅 링크 받기 →"}
          </button>

          <p className="text-xs text-center text-gray-400">
            제출하시면 다음 화면에서 오픈채팅 링크와 부모님께 보낼<br />
            메시지를 받을 수 있어요.
          </p>

        </form>
      </section>

    </main>
  );
}