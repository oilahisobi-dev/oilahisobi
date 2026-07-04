/* Hisob — service worker (v11)
   HTML (sahifa) — NETWORK-FIRST: har ochilishda avval internetdan yangisi olinadi,
   internet bo'lmasa keshdagi ishlaydi. Shu tufayli yangilanish darhol yetib boradi.
   Boshqa same-origin fayllar — keshdan + fonda yangilash.
   Tashqi domenlar (Firebase, Anthropic, Puter, CBU...) — keshsiz, to'g'ridan-to'g'ri. */
const CACHE = "hisob-2026-v12";
const CORE = ["./", "./index.html", "./manifest.webmanifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      Promise.all(CORE.map((u) =>
        fetch(u, { cache: "reload" })
          .then((r) => { if (r && r.ok) return c.put(u, r); })
          .catch(() => {})
      ))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  if (url.origin !== self.location.origin) return;

  const isPage = req.mode === "navigate" || url.pathname.endsWith("/index.html") || url.pathname.endsWith("/");

  if (isPage) {
    // NETWORK-FIRST: yangisi bo'lsa — darhol; bo'lmasa — kesh (offline).
    e.respondWith(
      fetch(req, { cache: "no-cache" })
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => { c.put(req, copy); c.put("./index.html", res.clone()); }).catch(() => {});
          }
          return res;
        })
        .catch(() =>
          caches.match(req).then((m) => m || caches.match("./index.html"))
        )
    );
    return;
  }

  // Boshqa same-origin: keshdan tez, fonda yangilab qo'yish.
  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req, { cache: "no-cache" })
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
