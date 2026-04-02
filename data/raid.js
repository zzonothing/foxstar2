// ─────────────────────────────────────────────────────────────────────────────
//  data/raid.js
//
//  BOSS  : 시즌별 보스 목록 (1-based index → boss: 1 = BOSS[시즌][0])
//    core  : 0 = X, 1 = O, 2 = △
//
//  RAID  : 시즌별 멤버 레이드 데이터
//    hit.boss  : 해당 시즌 BOSS 배열의 번호 (1부터 시작)
//    hit.level : 보스 레벨 (숫자)
//    hit.lastHit : 0 = 막타 없음, 1 = 막타
//
//  ※ 새 시즌은 객체에 키를 추가하세요. (숫자 키, 마지막 키가 최신 시즌)
// ─────────────────────────────────────────────────────────────────────────────

const BOSS = {
  39: [
    { name: "포터",          weakness: "철갑", core: 1, memo: "특이사항이 있으면 메모에 적는다." },
    { name: "플레이트",      weakness: "수냉", core: 1, memo: "" },
    { name: "랜드이터",      weakness: "전격", core: 2, memo: "" },
    { name: "리빌드 핑거즈", weakness: "작열", core: 1, memo: "" },
    { name: "마테리얼H",     weakness: "풍압", core: 1, memo: "" },
  ],
};

const RAID = {
  39: [
    {
      name: "HAKU",
      syncroLevel: 801,
      hit: [
        { boss: 4, level: 3, deck: ["라피", "클리드", "미하라", "클디젤", "레드후드"],     damage: 41292413427, expectedDamage: 41000000000, lastHit: 0 },
        { boss: 2, level: 3, deck: ["리타", "크라운", "수화", "헬름", "수레그"],           damage: 43549752462, expectedDamage: 44000000000, lastHit: 0 },
        { boss: 5, level: 3, deck: ["나유타", "흑영", "리버렐리오", "세이렌", "메스트"],   damage: 61180207491, expectedDamage: 60000000000, lastHit: 0 },
      ],
    },
    {
      name: "팡팡",
      syncroLevel: 781,
      hit: [
        { boss: 4, level: 3, deck: ["라피", "클리드", "미하라", "클디젤", "레드후드"],     damage: 42100257391, expectedDamage: 41000000000, lastHit: 0 },
        { boss: 2, level: 3, deck: ["리타", "크라운", "수화", "헬름", "수레그"],           damage: 42657646736, expectedDamage: 42000000000, lastHit: 0 },
        { boss: 5, level: 3, deck: ["나유타", "흑영", "리버렐리오", "세이렌", "벨벳"],     damage: 57596351355, expectedDamage: 55000000000, lastHit: 0 },
      ],
    },
  ],
};
