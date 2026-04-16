const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');

const ALLOWED = new Set(['member.js', 'raid.js', 'character.js']);

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
  const age = Date.now() - parseInt(ts, 10);
  if (isNaN(age) || age < 0 || age > 7 * 24 * 60 * 60 * 1000) return false;
  const expected = crypto.createHmac('sha256', secret).update(ts).digest('hex');
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
  res.setHeader('Cache-Control', 'no-store');

  if (!verifyToken(req.headers.cookie, process.env.ACCESS_KEY)) {
    return res.status(200).send('window.__AUTH_REQUIRED=true;');
  }

  try {
    const content = fs.readFileSync(path.join(process.cwd(), 'data', file), 'utf8');
    return res.status(200).send(content);
  } catch {
    return res.status(404).end();
  }
};
