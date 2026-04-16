const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');

const ALLOWED = new Set(['member.js', 'raid.js', 'character.js']);

// 데이터 파일 위치: api/_data/ (Vercel이 정적으로 서빙하지 않는 경로)
const DATA_DIR = path.join(process.cwd(), 'api', '_data');

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

  if (!verifyToken(req.headers.cookie, process.env.ACCESS_KEY)) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).send('window.__AUTH_REQUIRED=true;');
  }

  // 인증된 사용자: 캐시 금지. 과거 인증 시기의 응답이 세션 만료 후에도
  // 캐시에서 재사용되면 __AUTH_REQUIRED sentinel 이 설정되지 않아 리다
  // 이렉트가 동작하지 않는 문제 발생. 매 요청 서버에서 세션 재검증.
  res.setHeader('Cache-Control', 'no-store');

  try {
    const content = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
    return res.status(200).send(content);
  } catch {
    return res.status(404).end();
  }
};
