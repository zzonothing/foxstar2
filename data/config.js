// ─────────────────────────────────────────────────────────────────────────────
//  data/config.js
//  유니온 기본 설정
// ─────────────────────────────────────────────────────────────────────────────

const CONFIG = {
  // 유니온 이름 & 카카오 오픈채팅 링크
  unionName: "여우별 유니온",
  kakaoUrl:  "https://open.kakao.com/o/gBwHo1tg",  // 가입 문의 오픈톡방 링크

  // 일정 설정
  // 확정 전: null → "미정" 으로 표시
  // 확정 후: { start: "YYYY-MM-DD", end: "YYYY-MM-DD" } 로 입력
  schedule: {
    unionRaid: { start: "2026-04-10", end: "2026-04-11" },
    // 예시: unionRaid: { start: "2026-04-11", end: "2026-04-12" },
    soloRaid:  null,
    // 예시: soloRaid:  { start: "2026-04-15", end: "2026-04-21" },
  },
};
