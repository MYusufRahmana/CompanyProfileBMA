# Template Company Profile — PT Berkat Maritim Abadi

Website company profile **statis** (HTML, CSS, JavaScript murni — tanpa framework) yang siap dipakai ulang
sebagai template untuk perusahaan lain. Seluruh teks publik berbahasa Indonesia.

- Buka `index.html` lewat server lokal (Laragon, `npx serve`, dsb.). Lewat `file://` beberapa browser memblokir font.
- **Node.js 18+ hanya dibutuhkan untuk `npm run build`** (membuat ulang navbar/footer & halaman berita). Situs tidak memerlukan build untuk dijalankan.

## Perintah

| Perintah | Fungsi |
| --- | --- |
| `npm run build` | Membuat halaman detail berita dari `content/news.mjs`, lalu menyinkronkan navbar, footer, dan ikon di **semua** halaman dari `content/site.mjs`. |
| `npm run check` | Memeriksa semua path lokal (gambar, CSS, JS, tautan antarhalaman) — harus `0 broken`. |

Jalankan `npm run build` lalu `npm run check` setiap kali mengubah file di `content/` atau `tools/`.

## Struktur folder

```
├─ index.html              Beranda
├─ pages/                  Halaman dalam
│  ├─ about.html           Tentang Kami
│  ├─ services.html        Layanan
│  ├─ news.html            Berita (daftar, filter, pencarian)
│  ├─ berita-*.html        Detail berita  ← DIBUAT OTOMATIS, jangan edit manual
│  ├─ karir.html           Karir (tabel lowongan dibuka)
│  ├─ lowongan-*.html      Detail lowongan
│  ├─ lamar.html           Formulir lamaran (simulasi frontend)
│  └─ contact.html         Kontak
├─ content/                ★ DATA yang paling sering diubah
│  ├─ site.mjs             Identitas, menu, footer, kontak, media sosial
│  └─ news.mjs             Isi semua berita
├─ js/
│  ├─ site-data.js         ★ Data Beranda: slide hero + site operasional (peta & galeri)
│  └─ script.js            Perilaku situs (navbar, hero, peta, filter, formulir)
├─ css/
│  ├─ style.css            Token desain (warna, font, ukuran), tombol, navbar, hero, footer, karir
│  ├─ brand-heroes.css     Header transparan di atas foto + logo navbar putih/berwarna
│  ├─ components.css       Komponen Beranda & yang dipakai ulang (kartu, peta site, pop-up foto)
│  └─ pages.css            Halaman dalam (banner, tentang, layanan, berita, karir, kontak)
├─ assets/
│  ├─ logo/                Logo web (versi putih, berwarna, footer)
│  ├─ icons/               Favicon & apple-touch-icon
│  ├─ fonts/               Inter & Manrope (WOFF2) + lisensi OFL — wajib tetap ada
│  ├─ images/
│  │  ├─ company/          Foto asli perusahaan (hero, galeri site)
│  │  ├─ about/            Foto ilustrasi halaman Tentang Kami
│  │  ├─ mining/           Foto ilustrasi pertambangan
│  │  ├─ logistics/        Foto ilustrasi logistik/pelayaran
│  │  ├─ social/           Foto ilustrasi berita kategori Sosial
│  │  └─ maps/             Peta site (SVG)
│  └─ README.md            Sumber & lisensi setiap foto
├─ tools/                  Skrip Node (tanpa dependensi)
│  ├─ layout.mjs           Navbar, footer, sprite ikon → semua halaman
│  ├─ news.mjs             Generator halaman detail berita
│  └─ audit-paths.mjs      Pemeriksa path
├─ _source/                File asli resolusi tinggi (logo master, foto asli, PDF) — tidak diunggah
└─ package.json            Perintah build & check
```

## Memakai sebagai template — urutan kerja

1. **Identitas & kontak** — ubah `content/site.mjs`: nama perusahaan, logo, menu, deskripsi footer,
   alamat, email, telepon, email rekrutmen, media sosial. Lalu `npm run build`.
2. **Logo & favicon** — ganti file di `assets/logo/` (WebP, latar transparan; versi putih untuk di atas foto,
   versi berwarna untuk latar putih, versi footer) dan `assets/icons/` (32×32, 192×192, 180×180).
   Bila ukuran berbeda, sesuaikan `width/height` di `content/site.mjs`. Simpan file asli di `_source/`.
3. **Warna & font** — `css/style.css`, blok `:root`:
   `--gold` (warna aksen), `--gold-light` (aksen di latar gelap), `--gold-dark` (aksen untuk teks di latar putih,
   jaga kontras ≥ 4,5:1), `--charcoal`, `--text`, dll. Warna aksen hero: `--hero-accent`.
4. **Beranda** — `js/site-data.js`:
   - `window.BMA_HERO`: judul, kegelapan overlay, jeda slide, daftar slide (foto, titik fokus, deskripsi).
     Slide pertama juga tertulis di `index.html` (`<link rel="preload">`, `og:image`, `<picture class="hero__photo">`) — samakan bila diganti.
     Samakan `overlayOpacity` dengan `--hero-overlay` di `css/style.css`.
   - `window.BMA_SITES` / `BMA_SITE_MAPS` / `BMA_SITE_DEFAULT`: site operasional, posisi marker (% terhadap peta), galeri.
     Foto dengan properti `alt` dianggap dokumentasi asli; tanpa `alt` diberi label "Foto ilustrasi".
   - Teks profil singkat, layanan, dan cuplikan berita ada langsung di `index.html`.
5. **Halaman dalam** — edit isi di antara `<main>` dan `</main>` pada `pages/*.html`.
   Jangan edit `<header>`, `<footer>`, atau blok `<!-- icons:start -->` secara manual (ditimpa oleh build).
6. **Berita** — `content/news.mjs` (judul, tanggal, kategori, foto, isi, poin penting) → `npm run build`.
   Untuk menampilkan berita baru di daftar, tambahkan juga kartunya di `pages/news.html` (dan di Beranda bila perlu).
7. **Karir** — lihat bagian *Menambah lowongan* di bawah.
8. **Periksa** — `npm run check`, lalu cek tampilan di desktop & ponsel.

### Menambah halaman baru
1. Salin halaman yang mirip di `pages/` (mis. `services.html`) → ganti `<title>`, meta, banner, dan isi `<main>`.
2. Bila perlu masuk menu: tambahkan ke `pages` dan `menu` di `content/site.mjs`
   (halaman turunan yang menyorot menu induk: `activeParents`).
3. `npm run build` → navbar & footer halaman baru otomatis terisi.

### Menambah lowongan
1. Tambah baris `<tr>` di `pages/karir.html` (`data-department`, `data-location`, `data-status="Dibuka"`). Hanya lowongan dibuka yang ditampilkan.
2. Tambahkan id-nya ke array `jobs` (dan opsional `jobDetails`: tanggung jawab & kualifikasi) di `js/script.js`
   bagian *Formulir lamaran*, serta `<option>` di `pages/lamar.html`.
3. Opsional: halaman detail `pages/lowongan-<id>.html` (salin yang ada).

## Konvensi

- **Gambar**: WebP, dua ukuran (±640–800px untuk ponsel/kartu, ±1200–1600px untuk layar lebar) dengan `srcset`.
  Nama file huruf kecil-tanda-hubung, tanpa spasi. Catat sumber/lisensi foto ilustrasi di `assets/README.md`.
- **Ikon**: sprite SVG dari `tools/layout.mjs` → `<svg class="icon" aria-hidden="true"><use href="#i-nama"/></svg>`.
  Menambah ikon: tambahkan path ke objek `icons` di `tools/layout.mjs`, lalu `npm run build`.
- **Aksesibilitas**: konten tetap terlihat tanpa JavaScript; animasi mengikuti `prefers-reduced-motion`;
  semua kontrol bisa dipakai dengan keyboard.

## Konten contoh — wajib diganti sebelum publikasi

- Berita, lowongan karir, dan foto ilustrasi (lihat `assets/README.md`) adalah contoh.
- Formulir kontak & lamaran masih simulasi frontend (tidak mengirim data).
- Tautan media sosial masih `#` (atur di `content/site.mjs`); tombol bahasa EN | IND belum berfungsi.
- Data perusahaan (profil, visi-misi, layanan, klien, kontak) bersumber dari company profile 2026 (`_source/`).

## Migrasi ke Laravel Blade

- `layouts/app.blade.php`: `<head>`, `@include('partials.icons')`, header, `@yield('content')`, footer, `<script>`.
- `partials/header|footer|icons.blade.php`: hasil `header()`, `footer()`, `iconSprite()` di `tools/layout.mjs`;
  data dari `content/site.mjs` menjadi `config/site.php`.
- `pages/*.html` → view per halaman; `berita-*.html` → satu view `news/show.blade.php` dengan data dari tabel berita
  (struktur field = `content/news.mjs`).
- `js/site-data.js` → data dari database/config yang dirender ke `<script>` atau atribut `data-*`.
