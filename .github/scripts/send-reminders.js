const https = require('https');

const APP_ID = process.env.ONESIGNAL_APP_ID;
const REST_KEY = process.env.ONESIGNAL_REST_KEY;

if (!APP_ID || !REST_KEY) {
  console.log('OneSignal credentials not configured — skipping.');
  process.exit(0);
}

function apiCall(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'onesignal.com',
      path: '/api/v1' + path,
      method,
      headers: {
        'Authorization': `Basic ${REST_KEY}`,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    }, res => {
      let buf = '';
      res.on('data', c => buf += c);
      res.on('end', () => {
        try { resolve(JSON.parse(buf)); } catch { resolve(buf); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function main() {
  const result = await apiCall('GET', `/players?app_id=${APP_ID}&limit=200`);
  const players = result.players || [];
  const now = new Date();
  let sent = 0;

  for (const player of players) {
    const tags = player.tags || {};
    const tagUpdates = {};

    for (const [key, val] of Object.entries(tags)) {
      if (!key.startsWith('r_')) continue;
      let r;
      try { r = JSON.parse(val); } catch { continue; }
      if (!r || !r.datetime || r.sent) continue;

      const fireAt = new Date(r.datetime);
      if (fireAt > now) continue;

      await apiCall('POST', '/notifications', {
        app_id: APP_ID,
        include_player_ids: [player.id],
        headings: { en: '⏰ 四國之旅提醒', zh: '⏰ 四國之旅提醒' },
        contents: { en: r.note, zh: r.note },
        chrome_web_icon: 'https://hkykit.github.io/icon.svg'
      });
      sent++;

      if (r.repeat === 'none') {
        r.sent = true;
      } else {
        const next = new Date(fireAt);
        if (r.repeat === 'daily') next.setDate(next.getDate() + 1);
        else if (r.repeat === 'weekly') next.setDate(next.getDate() + 7);
        else if (r.repeat === 'monthly') next.setMonth(next.getMonth() + 1);
        r.datetime = next.toISOString().slice(0, 16);
        r.sent = false;
      }
      tagUpdates[key] = JSON.stringify(r);
    }

    if (Object.keys(tagUpdates).length) {
      await apiCall('PUT', `/players/${player.id}`, { app_id: APP_ID, tags: tagUpdates });
    }
  }

  console.log(`Sent ${sent} notification(s).`);
}

main().catch(e => { console.error(e); process.exit(1); });
