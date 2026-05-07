// 이 파일이 토닥터 웹사이트의 첫 화면(랜딩 페이지)입니다.
// 핑크 + 아이보리 색감으로 따뜻한 분위기를 만들었어요.

export default function Home() {
  return (
    // 전체 페이지 배경: 아이보리 톤
    <main className="min-h-screen bg-[#FFFBF5]">

      {/* ─── 상단 네비게이션 바 ─── */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-5 bg-[#FFFBF5]/90 backdrop-blur-sm sticky top-0 z-50 border-b border-pink-100">
                {/* 로고 (아이콘 + 텍스트) */}
        <a href="/" className="flex items-center gap-2">
          <img src="/logo-icon.png" alt="토닥터 로고" className="h-10 w-10" />
          <span className="text-2xl font-bold text-pink-500">토닥터</span>
        </a>

        {/* 신청하기 버튼 (상단 CTA) */}
        <a
          href="#apply"
          className="bg-pink-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-600 transition shadow-md"
        >
          신청하기
        </a>
      </nav>

      {/* ─── 히어로 섹션: 첫인상을 결정하는 핵심 영역 ─── */}
      <section className="px-6 md:px-12 py-24 md:py-32 text-center max-w-4xl mx-auto">

        {/* 작은 태그 */}
        <span className="inline-block bg-pink-100 text-pink-600 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          🌸 부모와 자녀를 위한 마음 잇기 서비스
        </span>

        {/* 메인 제목 */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
          매일 한 가지 질문으로,<br />
          <span className="text-pink-500">우리 가족이 더 가까워져요</span>
        </h1>

        {/* 부제 */}
        <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-10">
          평소엔 꺼내기 어려운 이야기,<br />
          하루 한 번의 질문으로 자연스럽게 시작해보세요.
        </p>

        {/* 메인 CTA 버튼 */}
        <a
          href="#apply"
          className="inline-block bg-pink-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-pink-600 transition shadow-lg"
        >
          1주일 동안 함께해보기 →
        </a>

        {/* 작은 안내 */}
        <p className="text-sm text-gray-400 mt-4">
          ✨ 무료 / 1주일 회차제 / 완주 시 키링 선물
        </p>
      </section>

      {/* ─── 서비스 핵심 기능 소개 ─── */}
      <section className="px-6 md:px-12 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            토닥터는 이렇게 작동해요
          </h2>
          <p className="text-center text-gray-500 mb-16">
            복잡한 앱 설치 없이, 카카오톡 오픈채팅으로 바로 시작할 수 있어요.
          </p>

          {/* 3단계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* 카드 1 */}
            <div className="bg-[#FFFBF5] rounded-3xl p-8 text-center border border-pink-100">
              <div className="text-5xl mb-4">💌</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                매일 1개의 질문
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                매일 토닥터가 가족이 함께 답할 수 있는<br />
                질문 하나를 보내드려요.
              </p>
            </div>

            {/* 카드 2 */}
            <div className="bg-[#FFFBF5] rounded-3xl p-8 text-center border border-pink-100">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                각자의 답변
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                부모님과 자녀가 각자<br />
                마음 속 이야기를 적어주세요.
              </p>
            </div>

            {/* 카드 3 */}
            <div className="bg-[#FFFBF5] rounded-3xl p-8 text-center border border-pink-100">
              <div className="text-5xl mb-4">🤍</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                서로의 답을 확인
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                평소엔 몰랐던<br />
                서로의 진짜 마음을 만나보세요.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── MVP 진행 방식 섹션 ─── */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            1주일이면 충분해요
          </h2>
          <p className="text-center text-gray-500 mb-16">
            부담 없이 시작하고, 함께 완주하면 작은 선물이 기다리고 있어요.
          </p>

          {/* 단계별 진행 안내 */}
          <div className="space-y-6">

            {/* 단계 1 */}
            <div className="flex items-start gap-5 bg-white rounded-2xl p-6 border border-pink-100">
              <div className="bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">신청서 작성</h3>
                <p className="text-gray-500 text-sm">
                  나이, 닉네임, 이메일 등 간단한 정보만 입력하면 끝.
                </p>
              </div>
            </div>

            {/* 단계 2 */}
            <div className="flex items-start gap-5 bg-white rounded-2xl p-6 border border-pink-100">
              <div className="bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">부모님과 함께 오픈채팅 입장</h3>
                <p className="text-gray-500 text-sm">
                  카카오톡 오픈채팅 링크를 받아 부모님께 공유하고 함께 입장해주세요.
                </p>
              </div>
            </div>

            {/* 단계 3 */}
            <div className="flex items-start gap-5 bg-white rounded-2xl p-6 border border-pink-100">
              <div className="bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">매일 1개의 질문 수신</h3>
                <p className="text-gray-500 text-sm">
                  매일 정해진 시간에 가족이 함께 답할 수 있는 질문이 도착해요.
                </p>
              </div>
            </div>

            {/* 단계 4 */}
            <div className="flex items-start gap-5 bg-white rounded-2xl p-6 border border-pink-100">
              <div className="bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">서로의 답변을 확인</h3>
                <p className="text-gray-500 text-sm">
                  1:1 채팅으로 답변을 주고받으며 서로의 마음을 확인해보세요.
                </p>
              </div>
            </div>

            {/* 단계 5 - 보상 강조 */}
            <div className="flex items-start gap-5 bg-pink-50 rounded-2xl p-6 border-2 border-pink-300">
              <div className="bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                🎁
              </div>
              <div>
                <h3 className="font-bold text-pink-700 mb-1">1회차 완주 시 키링 선물</h3>
                <p className="text-pink-600 text-sm">
                  7일간 함께 완주하면, 토닥터가 정성스럽게 준비한 키링을 보내드려요.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 하단 CTA 섹션 ─── */}
      <section
        id="apply"
        className="px-6 md:px-12 py-24 bg-gradient-to-br from-pink-100 to-pink-50"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-6">
            오늘, 가족과 다시<br />
            가까워질 첫 발을 내디뎌볼까요?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            1주일이라는 짧은 시간이,<br />
            평생의 추억으로 남을 수 있어요.
          </p>

          {/* 하단 메인 CTA 버튼 */}
          <a
            href="/apply"
            className="inline-block bg-pink-500 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-pink-600 transition shadow-xl"
          >
            지금 바로 신청하기
          </a>

          <p className="text-sm text-gray-500 mt-6">
            🎁 1회차 완주하면 키링이 도착해요
          </p>
        </div>
      </section>

      {/* ─── 푸터 ─── */}
      <footer className="text-center py-10 text-gray-400 text-sm bg-[#FFFBF5] border-t border-pink-100">
        © 2026 토닥터. 가족의 마음을 잇습니다.
      </footer>

    </main>
  );
}