// ─────────────────────────────────────────────────────────────────────────────
//  data/announcements.js
//
//  [여우별 공지사항]  category: "union" | "notice"
//    - content : 팝업에 표시될 전체 내용 (줄바꿈은 \n 사용)
//    - pinned  : true이면 항상 상단 고정 (📌 아이콘)
//    - url     : 없으면 null
//
//  [정보 & 공략]  category: "guide" | "ingame"
//    - infoTag : "lounge" | "youtube" | "website"
//    - url     : 클릭 시 이동할 링크 (필수)
//
//  ※ 새 글은 배열 맨 아래에 추가하세요. (최신 글이 맨 아래)
//    최신 글일수록 위에 표시됩니다.
//  ※ pinned 필드는 사용하지 않습니다.
//
//  ※ 한 페이지에 표시할 글 수
const NOTICES_PER_PAGE = 5;
const INFO_PER_PAGE    = 10;
// ─────────────────────────────────────────────────────────────────────────────

const ANNOUNCEMENTS = [
  // ── 여우별 공지사항 ────────────────────────────────────────────────────────
  {
    id: "a01",
    title: "유니온 가입 조건 안내",
    summary: "가입 조건: 싱크로레벨 500 이상 / 유니온레이드 정기 참여 가능자 우선.",
    content:
      "안녕하세요, 여우별 유니온입니다.\n\n" +
      "저희 유니온에 관심 가져주셔서 감사합니다.\n" +
      "가입 조건은 아래와 같습니다.\n\n" +
      "▸ 싱크로레벨 500 이상\n" +
      "▸ 유니온레이드 시즌 정기 참여 가능자 우선\n" +
      "▸ 카카오톡 오픈채팅 상시 모니터링 가능자\n\n" +
      "가입 희망 시 상단 '가입 문의' 버튼을 통해 카카오톡 오픈채팅으로 문의해 주세요.\n" +
      "가입 신청 후 운영진 확인까지 1~2일 소요될 수 있습니다.",
    category: "union",
    date: "2025-01-10",
    url: null,
  },
  {
    id: "a07",
    title: "시즌 31 유니온레이드 결과 안내",
    summary: "시즌 31 최종 순위 29위 달성! 참여해주신 모든 멤버 수고하셨습니다.",
    content:
      "시즌 31 유니온레이드가 마무리되었습니다.\n\n" +
      "최종 순위: 29위\n\n" +
      "이번 시즌 참여해주신 모든 멤버분들 정말 수고하셨습니다.\n" +
      "특히 마지막까지 공격 횟수를 채워주신 분들 덕분에 좋은 성적을 거둘 수 있었습니다.\n\n" +
      "다음 시즌 일정은 공지 예정이며,\n" +
      "레이드 시작 전 채팅방에서 속성 배분이 진행될 예정입니다.\n" +
      "모두 다음 시즌에도 활발한 참여 부탁드립니다!",
    category: "union",
    date: "2025-04-10",
    url: null,
  },

  // ── 정보 & 공략 ────────────────────────────────────────────────────────────
  {
    id: "a02",
    title: "[인게임] 3월 업데이트 안내",
    summary: "신규 니케 2명 추가 및 이벤트 개편. 픽업 기간 꼭 확인하세요.",
    category: "ingame",
    infoTag: "website",
    date: "2025-03-01",

    url: "https://nikke-kr.com",
  },
  {
    id: "a03",
    title: "2025 니케 육성 우선순위 가이드",
    summary: "현 메타 기준 키워야 할 니케 목록 및 속성별 추천 픽 정리.",
    category: "guide",
    infoTag: "lounge",
    date: "2025-03-15",

    url: "https://arca.live/b/nikke",
  },
  {
    id: "a04",
    title: "4월 픽업 추천 니케 총정리",
    summary: "이번 달 픽업 중 뽑기 우선순위 및 시너지 분석.",
    category: "guide",
    infoTag: "lounge",
    date: "2025-04-01",

    url: "https://arca.live/b/nikke",
  },
  {
    id: "a05",
    title: "[인게임] 4월 업데이트 안내",
    summary: "신규 니케 2명 추가 및 이벤트 개편. 픽업 기간 확인하세요.",
    category: "ingame",
    infoTag: "website",
    date: "2025-04-03",

    url: "https://nikke-kr.com",
  },
  {
    id: "a06",
    title: "솔로레이드 S28 알렉산드라 2억+ 공략",
    summary: "라피 기반 물 속성 덱으로 2억 돌파하는 영상 가이드 공유.",
    category: "guide",
    infoTag: "youtube",
    date: "2025-04-05",

    url: "https://youtu.be/example",
  },
  {
    id: "b01",
    title: "[인게임] 5월 업데이트 패치노트",
    summary: "신규 니케 3명 추가, 신규 스테이지 개방 및 밸런스 조정.",
    category: "ingame",
    infoTag: "website",
    date: "2025-05-01",

    url: "https://nikke-kr.com",
  },
  {
    id: "b02",
    title: "유니온레이드 S32 보스 속성 공략 정리",
    summary: "S32 보스 전기 속성 확정. 추천 덱 구성 및 스킬 우선순위 안내.",
    category: "guide",
    infoTag: "lounge",
    date: "2025-05-03",

    url: "https://arca.live/b/nikke",
  },
  {
    id: "b03",
    title: "니케 재화 효율 정리 – 젬 사용 우선순위",
    summary: "초보자부터 고인물까지 상황별 젬 소비 가이드.",
    category: "guide",
    infoTag: "lounge",
    date: "2025-05-05",

    url: "https://arca.live/b/nikke",
  },
  {
    id: "b04",
    title: "솔로레이드 S29 베리타스 3억 돌파 영상",
    summary: "불 속성 덱 풀 구성으로 3억 달성. 스킬 순서 상세 설명 포함.",
    category: "guide",
    infoTag: "youtube",
    date: "2025-05-07",

    url: "https://youtu.be/example",
  },
  {
    id: "b05",
    title: "[인게임] 5월 이벤트 일정 총정리",
    summary: "5월 콜라보 이벤트 및 기간 한정 미션 일정 안내.",
    category: "ingame",
    infoTag: "website",
    date: "2025-05-08",

    url: "https://nikke-kr.com",
  },
  {
    id: "b06",
    title: "니케 속성별 최강 덱 구성 가이드 2025",
    summary: "불/물/전기/바람 속성별 현 메타 최적 덱 총정리.",
    category: "guide",
    infoTag: "lounge",
    date: "2025-05-10",

    url: "https://arca.live/b/nikke",
  },
  {
    id: "b07",
    title: "신규 니케 '라임' 성능 분석 및 픽업 추천",
    summary: "라임 스킬 구조와 시너지 조합 분석. 뽑아야 하는 이유 정리.",
    category: "guide",
    infoTag: "youtube",
    date: "2025-05-12",

    url: "https://youtu.be/example",
  },
  {
    id: "b08",
    title: "니케 공식 유튜브 – 5월 신규 PV 공개",
    summary: "신규 스토리 챕터 PV 및 니케 소개 영상 업로드.",
    category: "ingame",
    infoTag: "youtube",
    date: "2025-05-13",

    url: "https://youtu.be/example",
  },
  {
    id: "b09",
    title: "하드 스테이지 공략 – 챕터 25 보스 패턴",
    summary: "챕터 25 보스 페이즈별 패턴 정리 및 파티 구성 팁.",
    category: "guide",
    infoTag: "lounge",
    date: "2025-05-15",

    url: "https://arca.live/b/nikke",
  },
  {
    id: "b10",
    title: "[인게임] 6월 픽업 사전 예고",
    summary: "공식 채널에서 공개된 6월 픽업 니케 실루엣 및 예상 정보.",
    category: "ingame",
    infoTag: "website",
    date: "2025-05-18",

    url: "https://nikke-kr.com",
  },
  {
    id: "b11",
    title: "솔로레이드 S30 공략 영상 – 전기 속성 최적화",
    summary: "전기 속성 조합으로 클리어하는 S30 상세 공략 영상.",
    category: "guide",
    infoTag: "youtube",
    date: "2025-05-20",

    url: "https://youtu.be/example",
  },
  {
    id: "b12",
    title: "니케 나무위키 – 유니온레이드 공략 페이지",
    summary: "역대 시즌별 보스 속성, 추천 덱, 점수 테이블 정리.",
    category: "guide",
    infoTag: "website",
    date: "2025-05-21",

    url: "https://namu.wiki",
  },
  {
    id: "b13",
    title: "아크로스 더 보더 이벤트 공략 가이드",
    summary: "이벤트 스테이지 클리어 조건 및 보상 효율 계산 정리.",
    category: "guide",
    infoTag: "lounge",
    date: "2025-05-23",

    url: "https://arca.live/b/nikke",
  },
  {
    id: "b14",
    title: "[인게임] 6월 업데이트 패치노트",
    summary: "신규 니케 2명 추가, UI 개선 및 버그 수정 사항 안내.",
    category: "ingame",
    infoTag: "website",
    date: "2025-06-01",

    url: "https://nikke-kr.com",
  },
  {
    id: "b15",
    title: "니케 입문 가이드 – 초보자 필수 체크리스트",
    summary: "시작 후 30일 내 해야 할 일 총정리. 재화 수급 루틴 포함.",
    category: "guide",
    infoTag: "lounge",
    date: "2025-06-03",

    url: "https://arca.live/b/nikke",
  },
  {
    id: "b16",
    title: "솔로레이드 S31 2.5억 클리어 덱 영상",
    summary: "바람 속성 혼합 덱으로 S31 고득점 달성. 버프 타이밍 상세 설명.",
    category: "guide",
    infoTag: "youtube",
    date: "2025-06-05",

    url: "https://youtu.be/example",
  },
  {
    id: "b17",
    title: "유니온레이드 S33 보스 정보 사전 유출",
    summary: "커뮤니티 수집 정보 기준 S33 보스 속성 및 패턴 예상.",
    category: "guide",
    infoTag: "lounge",
    date: "2025-06-07",

    url: "https://arca.live/b/nikke",
  },
  {
    id: "b18",
    title: "[인게임] 6월 이벤트 보상 및 교환소 정리",
    summary: "이벤트 재화 교환 우선순위 및 기간 내 수급 가능 보상 안내.",
    category: "ingame",
    infoTag: "website",
    date: "2025-06-09",

    url: "https://nikke-kr.com",
  },
  {
    id: "b19",
    title: "니케 공식 – 1주년 기념 스페셜 방송 하이라이트",
    summary: "1주년 기념 방송에서 공개된 신규 콘텐츠 및 보상 총정리 영상.",
    category: "ingame",
    infoTag: "youtube",
    date: "2025-06-11",

    url: "https://youtu.be/example",
  },
  {
    id: "b20",
    title: "니케 나무위키 – 니케 도감 & 등급별 티어표",
    summary: "전체 니케 등급, 속성, 제조사, 무기 타입 일람 및 현 시즌 티어.",
    category: "guide",
    infoTag: "website",
    date: "2025-06-13",

    url: "https://namu.wiki",
  },
];
