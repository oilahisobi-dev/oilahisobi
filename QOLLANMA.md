# Hisob — o'rnatish qo'llanmasi (shaxsiy nusxa)

Bu paketda 4 ta fayl bor: `index.html`, `sw.js`, `manifest.webmanifest`, `QOLLANMA.md`.
Ilova to'liq mustaqil — barcha ma'lumot **faqat sizning qurilmangizda** (va xohlasangiz, **sizning shaxsiy** Firebase'ingizda) saqlanadi. Hech kim, hatto dasturchi ham ko'ra olmaydi.

---

## A) GitHub Pages'ga joylash (bepul sayt, ~5 daqiqa)

1. **github.com** da akkaunt oching (bor bo'lsa — kiring).
2. O'ng yuqorida **＋ → New repository** → nom bering (masalan `hisob`) → **Public** → **Create repository**.
3. Ochilgan sahifada **"uploading an existing file"** havolasini bosing → shu paketdagi `index.html`, `sw.js`, `manifest.webmanifest` fayllarini sudrab tashlang → pastda **Commit changes**.
4. Repo ichida **Settings → Pages** bo'limiga o'ting.
5. **Source: Deploy from a branch** → Branch: **main**, papka: **/(root)** → **Save**.
6. 1–2 daqiqadan so'ng sahifa tepasida manzil chiqadi:
   `https://SIZNING-LOGIN.github.io/hisob/` — ilovangiz tayyor! 🎉

## B) Telefonga ilova sifatida o'rnatish

Manzilni telefonda oching:
- **Android (Chrome):** menyu ⋮ → **"Ilovani o'rnatish"** (yoki sayt taklif qiladi).
- **iPhone (Safari):** Ulashish ⬆︎ → **"Bosh ekranga qo'shish"**.

Shundan keyin oddiy ilova kabi ochiladi, **internetsiz ham ishlaydi**.

## C) Firebase — shaxsiy bulutli sinxron (ixtiyoriy, ~10 daqiqa)

Telefon + kompyuterda bitta hisobni ko'rish uchun. Hammasi **sizning shaxsiy, bepul** Firebase loyihangizda bo'ladi.

1. **console.firebase.google.com** → **Add project** → nom (masalan `hisob`) → yarating (Analytics shart emas).
2. Chap menyu: **Build → Realtime Database → Create Database** → joylashuvni tanlang → **Start in locked mode**.
3. **Build → Authentication → Get started → Email/Password → Enable**.
4. ⚙ **Project settings → Your apps → Web `</>`** → ilova qo'shing → ko'rsatilgan **firebaseConfig** obyektining `{ … }` qismini nusxalang.
5. Hisob ilovasida: **Sozlamalar → Bulutli sinxron** → configni katta maydonga joylang. Config ichida `databaseURL` bo'lmasa — Realtime Database sahifasi tepasidagi `https://…firebasedatabase.app` manzilini pastki maydonga joylang → **Saqlash**.
6. Email va parol bilan **Ro'yxatdan o'tish**. Ikkinchi qurilmada xuddi shu config + shu email bilan **Kirish** — ma'lumot avtomatik birlashadi.
7. Xavfsizlik (majburiy): Realtime Database → **Rules** → quyidagini joylab **Publish**:

```json
{
  "rules": {
    "users": {
      "$u": { ".read": "$u === auth.uid", ".write": "$u === auth.uid" }
    }
  }
}
```

> Xuddi shu qo'llanma ilova ichida ham bor: Sozlamalar → Bulutli sinxron → «Qanday ulanadi?».

## D) AI yordamchi

- **Kalit shart emas** — birinchi AI so'rovida bepul **Puter** kirish oynasi bir marta chiqadi, tasdiqlaysiz va ishlayveradi.
- «Yozib kiritish» (masalan: *«bozor 250 ming, taksi 15 ming»*) ko'p hollarda umuman **internetsiz**, telefonning o'zida tahlil qilinadi ⚡
- Xohlasangiz o'z Anthropic kalitingizni kiritasiz (Sozlamalar → AI yordamchi) — to'g'ridan-to'g'ri va tezroq.

## E) Xavfsizlik maslahatlari

- **PIN kod:** Sozlamalar → Xavfsizlik.
- **Shifrlash (AES):** yoqishdan oldin **JSON zaxira oling** — PIN unutilsa, shifrlangan ma'lumot **tiklanmaydi**!
- Oyiga bir marta **Sozlamalar → JSON zaxira yuklash** odat qiling.

## F) Yangilash

Yangi versiya berilsa: repoda faqat `index.html` va `sw.js` ni almashtirasiz → saytni **Ctrl+Shift+R** (telefonda ilovani yopib-ochish). Ma'lumotlaringiz joyida qoladi — ular faylda emas, qurilma xotirasida va Firebase'da.

---

Savol bo'lsa — beraverasiz. Xayrli hisob-kitob! 🕌✨
