const crypto = require('crypto');

function generateToken(secret) {
  const ts = Date.now().toString();
  const sig = crypto.createHmac('sha256', secret).update(ts).digest('hex');
  return ts + '.' + sig;
}

module.exports = function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  const { password } = body;
  if (password && password === process.env.ACCESS_KEY) {
    const token = generateToken(process.env.ACCESS_KEY);
    const maxAge = 24 * 60 * 60; // 1일
    res.setHeader('Set-Cookie',
      'fstar_session=' + token +
      '; Path=/; HttpOnly; SameSite=Strict; Max-Age=' + maxAge
    );
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ error: 'Unauthorized' });
};
