const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');

const ALLOWED = new Set(['member.js', 'raid.js', 'character.js']);

// 데이터 파일 위치: api/_data/ (Vercel이 정적으로 서빙하지 않는 경로)
const DATA_DIR = path.join(process.cwd(), 'api', '_data');

// 모듈 로드 시 각 데이터 파일의 콘텐츠 + 콘텐츠 해시(=ETag) 미리 계산.
// Vercel 은 배포마다 서버리스 함수 인스턴스를 새로 만들기 때문에 데이터
// 변경은 자동으로 반영됨. 인증 검증은 매 요청 서버에서 수행하면서, 인증된
// 응답의 본문만 ETag 로 조건부 전송하여 페이지 전환 속도 향상 (304).
const ETAGS    = {};
const CONTENTS = {};
for (const file of ALLOWED) {
  try {
    const buf = fs.readFileSync(path.join(DATA_DIR, file));
    CONTENTS[file] = buf;
    ETAGS[file]    = '"' + crypto.createHash('sha1').update(buf).digest('hex') + '"';
  } catch (e) {
    // 파일이 아직 없을 수 있음 — handler 가 404 처리
  }
}

function parseCookies(header) {
  const out = {};
  if (!header) return out;
  header.split(';').forEach(part => {
    const idx = part.indexOf('=');
    if (idx < 0) return;
    out[part.slice(0, idx).trim()] = part.slice(idx + 1).trim();
  });
  return out;
}

function verifyToken(cookieHeader, secret) {
  const raw = parseCookies(cookieHeader)['fstar_session'];
  if (!raw) return false;
  const dot = raw.indexOf('.');
  if (dot < 0) return false;
  const ts  = raw.slice(0, dot);
  const sig = raw.slice(dot + 1);

  const issued = parseInt(ts, 10);
  if (isNaN(issued)) return false;

  // 만료 검증 (1일)
  const age = Date.now() - issued;
  if (age < 0 || age > 24 * 60 * 60 * 1000) return false;

  // SESSION_EPOCH 이전 발급 토큰 거부
  const epoch = parseInt(process.env.SESSION_EPOCH || '0', 10);
  if (issued < epoch) return false;

  // HMAC 서명 검증
  const secret_ = process.env.SESSION_SECRET || secret;
  const expected = crypto.createHmac('sha256', secret_).update(ts).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

module.exports = function handler(req, res) {
  const file = req.query.file;
  if (!file || !ALLOWED.has(file)) return res.status(404).end();

  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');

  // 미인증: __AUTH_REQUIRED sentinel 반환. 절대 캐시 금지 — 캐시되면 추후
  // 인증된 요청이 stale sentinel 을 받아 무한 리다이렉트 루프 발생 가능.
  if (!verifyToken(req.headers.cookie, process.env.ACCESS_KEY)) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).send('window.__AUTH_REQUIRED=true;');
  }

  // 인증된 사용자: ETag 로 조건부 응답.
  // - `no-cache` (NOT no-store): 브라우저는 캐시는 하되 매 요청 서버에 검증.
  // - 인증 검증은 매 요청 server-side 수행 (PR #14 의 보안 속성 유지).
  // - 콘텐츠 미변경 시 304 로 본문 전송 생략 → 페이지 전환 시 데이터 fetch
  //   라운드트립을 헤더만으로 끝냄.
  const etag    = ETAGS[file];
  const content = CONTENTS[file];
  if (!etag || !content) return res.status(404).end();

  res.setHeader('ETag', etag);
  res.setHeader('Cache-Control', 'private, no-cache');

  if (req.headers['if-none-match'] === etag) {
    return res.status(304).end();
  }

  return res.status(200).send(content);
};
