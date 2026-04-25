// ═══════════════════════════════════════════════
// sw.js — Service Worker for Thoonai AI
// Handles: PWA caching + Daily Notifications
// ═══════════════════════════════════════════════

const CACHE_NAME = 'thoonai-v3';
const STATIC_ASSETS = [
  '/Thoonai-ai/',
  '/Thoonai-ai/index.html',
  '/Thoonai-ai/current-affairs.html',
  '/Thoonai-ai/gk-library.html',
  '/Thoonai-ai/search.html',
  '/Thoonai-ai/quiz.html',
  '/Thoonai-ai/bookmarks.html',
  '/Thoonai-ai/css/style.css',
  '/Thoonai-ai/js/common.js',
  '/Thoonai-ai/js/ai.js',
  '/Thoonai-ai/js/gkdata.js',
  '/Thoonai-ai/manifest.json'
];

// Install — cache static assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS.map(url => {
        return new Request(url, { cache: 'reload' });
      })).catch(() => {});
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — serve from cache, fallback to network
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('api.groq.com')) return;
  if (e.request.url.includes('googletagmanager')) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      const networkFetch = fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || networkFetch;
    })
  );
});

// Push Notifications
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  const title = data.title || '📰 Thoonai AI';
  const options = {
    body: data.body || 'Today\'s current affairs are ready! Tap to read.',
    icon: '/Thoonai-ai/icon-192.png',
    badge: '/Thoonai-ai/icon-192.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/Thoonai-ai/current-affairs.html' },
    actions: [
      { action: 'read', title: '📰 Read Now' },
      { action: 'quiz', title: '📝 Take Quiz' }
    ]
  };
  e.waitUntil(self.registration.showNotification(title, options));
});

// Notification click handler
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = e.action === 'quiz'
    ? '/Thoonai-ai/quiz.html'
    : (e.notification.data?.url || '/Thoonai-ai/current-affairs.html');

  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('Thoonai-ai') && 'focus' in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

// Daily notification scheduler using sync
self.addEventListener('periodicsync', e => {
  if (e.tag === 'daily-news') {
    e.waitUntil(sendDailyNotification());
  }
});

async function sendDailyNotification() {
  await self.registration.showNotification('📰 Thoonai AI — Daily Update', {
    body: 'Today\'s Current Affairs are ready! Tap to study now 🎯',
    icon: '/Thoonai-ai/icon-192.png',
    vibrate: [100, 50, 100],
    data: { url: '/Thoonai-ai/current-affairs.html' }
  });
}
