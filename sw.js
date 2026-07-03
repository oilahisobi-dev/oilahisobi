/* Hisob 2026 — service worker
   Offline qo'llab-quvvatlash. Faqat shu sayt (same-origin) fayllarini keshlaydi;
   Firebase va boshqa tashqi (cross-origin) so'rovlarga tegmaydi — ular doim
   to'g'ridan-to'g'ri internetga ketadi, shunda sinxron buzilmaydi. */
const CACHE = "hisob-2026-v8";
const CORE = ["./", "./index.html", "./manifest.webmanifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  let url;
  try { url = new URL(req.url); } catch (_) { return; }

  // Tashqi domenlar (Firebase, gstatic, googleapis ...) — keshsiz, to'g'ri internetga.
  if (url.origin !== self.location.origin) return;

  // Same-origin: avval keshdan ber, fonda yangilab qo'y (stale-while-revalidate).
  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
