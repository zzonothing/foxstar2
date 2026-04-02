// ─────────────────────────────────────────────────────────────────────────────
//  data/announcements.js
//
//  category: "union" | "ingame" | "guide" | "notice"
//  pinned:   true 이면 항상 상단에 고정 표시 (📌 아이콘)
//  url:      없으면 null
//
//  ※ 새 글은 배열 맨 아래에 추가하세요. (최신 글이 맨 아래)
//    최신 글일수록 위에 표시됩니다.
//
//  ※ 한 페이지에 표시할 글 수 (기본 5)
const NOTICES_PER_PAGE = 5;
// ─────────────────────────────────────────────────────────────────────────────

const ANNOUNCEMENTS = [
  {
    id: "a01",
    title: "유니온 가입 조건 안내",
    summary: "가입 조건: 싱크로레벨 500 이상 / 유니온레이드 정기 참여 가능자 우선.",
    category: "union",
    date: "2025-01-10",
    pinned: true,
    url: null,
  },
  {
    id: "a02",
    title: "[인게임] 3월 업데이트 안내",
    summary: "신규 니케 2명 추가 및 이벤트 개편. 픽업 기간 꼭 확인하세요.",
    category: "ingame",
    date: "2025-03-01",
    pinned: false,
    url: "https://nikke-kr.com",
  },
  {
    id: "a03",
    title: "2025 니케 육성 우선순위 가이드",
    summary: "현 메타 기준 키워야 할 니케 목록 및 속성별 추천 픽 정리.",
    category: "guide",
    date: "2025-03-15",
    pinned: false,
    url: null,
  },
  {
    id: "a04",
    title: "4월 픽업 추천 니케 총정리",
    summary: "이번 달 픽업 중 뽑기 우선순위 및 시너지 분석.",
    category: "guide",
    date: "2025-04-01",
    pinned: false,
    url: null,
  },
  {
    id: "a05",
    title: "[인게임] 4월 업데이트 안내",
    summary: "신규 니케 2명 추가 및 이벤트 개편. 픽업 기간 확인하세요.",
    category: "ingame",
    date: "2025-04-03",
    pinned: false,
    url: "https://nikke-kr.com",
  },
  {
    id: "a06",
    title: "솔로레이드 S28 알렉산드라 2억+ 공략",
    summary: "라피 기반 물 속성 덱으로 2억 돌파하는 영상 가이드 공유.",
    category: "guide",
    date: "2025-04-05",
    pinned: false,
    url: "https://youtu.be/example",
  },
  {
    id: "a07",
    title: "시즌 31 유니온레이드 결과 안내",
    summary: "시즌 31 최종 순위 29위 달성! 참여해주신 모든 멤버 수고하셨습니다.",
    category: "union",
    date: "2025-04-10",
    pinned: false,
    url: null,
  },
];
