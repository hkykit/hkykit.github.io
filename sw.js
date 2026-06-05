const CACHE = 'japan-v2';
const PRECACHE = ['./japan.html', './manifest.json', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(PRECACHE).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fromNetwork = fetch(e.request).then(res => {
        if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }).catch(() => cached);
      return cached || fromNetwork;
    })
  );
});

self.addEventListener('push', e => {
  const d = e.data?.json() ?? {};
  e.waitUntil(
    self.registration.showNotification(d.title || '⏰ 四國之旅提醒', {
      body: d.body || d.note || '',
      icon: './icon.svg',
      badge: './icon.svg',
      tag: d.tag || 'reminder',
      requireInteraction: true
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
      const win = cs.find(c => c.url.includes('japan'));
      return win ? win.focus() : clients.openWindow('./japan.html');
    })
  );
});

// Local scheduling — fires timers for reminders within 7 days
const timers = new Map();
self.addEventListener('message', e => {
  if (e.data?.type !== 'SCHEDULE') return;
  timers.forEach(t => clearTimeout(t));
  timers.clear();
  const now = Date.now();
  (e.data.reminders || []).forEach(r => {
    if (r.sent && r.repeat === 'none') return;
    const delay = new Date(r.datetime).getTime() - now;
    if (delay > 0 && delay < 7 * 86400000) {
      timers.set(r.id, setTimeout(() => {
        self.registration.showNotification('⏰ 四國之旅提醒', {
          body: r.note,
          icon: './icon.svg',
          badge: './icon.svg',
          tag: 'r-' + r.id,
          requireInteraction: true
        });
      }, delay));
    }
  });
});
