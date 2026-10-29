# BMA Company Profile

Prototipe statis PT Berkat Maritim Abadi (BMA), bagian dari Growin Group, sebagai referensi tampilan dan interaksi untuk pengembangan website dinamis. Menggunakan HTML, CSS, dan JavaScript tanpa framework atau dependensi npm.

## Menjalankan contoh

Buka `index.html` melalui server lokal, misalnya Laragon:

`http://localhost/CompanyProfile/BMA_Company_Profile/`

Node.js 18+ digunakan untuk generator dan pemeriksaan, bukan untuk menjalankan situs.

## Struktur direktori

```text
BMA_Company_Profile/
├─ index.html                 Beranda dan titik masuk GitHub Pages
├─ pages/                     Halaman utama, detail berita, dan contoh rekrutmen
├─ assets/
│  ├─ css/                    Stylesheet situs
│  ├─ js/                     Interaksi dan konfigurasi beranda
│  ├─ images/                 Gambar web aktif menurut konteks
│  ├─ fonts/                  Font lokal beserta lisensinya
│  ├─ icons/                  Favicon dan ikon aplikasi
│  └─ logo/                   Logo yang digunakan situs
├─ content/
│  ├─ site.mjs                Identitas, navigasi, footer, dan kontak
│  └─ news.mjs                Data contoh artikel
├─ tools/
│  ├─ layout.mjs              Sinkronisasi header, footer, dan sprite ikon
│  ├─ news.mjs                Generator detail berita
│  └─ audit-paths.mjs         Pemeriksaan referensi file lokal
├─ docs/
│  ├─ assets.md               Sumber gambar dan catatan lisensi
│  └─ dynamic-migration.md    Pemetaan ke website dinamis
├─ _source/                   Arsip master; bukan aset runtime
├─ .gitignore
├─ package.json
└─ README.md
```

## Build dan pemeriksaan

```sh
npm run build
npm run check
```

Jika npm belum tersedia atau instalasinya bermasalah, jalankan skrip yang sama langsung:

```sh
node tools/news.mjs
node tools/layout.mjs
node tools/audit-paths.mjs
```

Build membuat detail berita dari `content/news.mjs` lalu menyinkronkan komponen bersama. Pemeriksaan harus berakhir dengan `0 broken`. Perubahan data atau generator perlu diikuti build.

## Lokasi penyuntingan

| Kebutuhan | Sumber yang disunting |
| --- | --- |
| Identitas, menu, kontak, footer | `content/site.mjs`, lalu build |
| Isi artikel | `content/news.mjs`, lalu build |
| Hero beranda | `assets/js/site-data.js` |
| Profil, layanan, daftar berita, karier, kontak | Bagian `main` pada HTML terkait |
| Tampilan global dan hero beranda | `assets/css/style.css` |
| Header transparan dan variasi logo | `assets/css/brand-heroes.css` |
| Komponen beranda dan komponen bersama | `assets/css/components.css` |
| Halaman dalam dan hero per halaman | `assets/css/pages.css` |
| Interaksi, filter, slider, formulir | `assets/js/script.js` |

Jangan menyunting `pages/berita-*.html` langsung karena dibuat ulang oleh generator. Header, footer, dan sprite ikon pada semua HTML juga dibuat oleh `tools/layout.mjs`.

Hero beranda memakai video kegiatan tambang (`assets/videos/`) sebagai latar dengan teks rata kiri dan dua tombol. Video dipasang oleh JavaScript; poster WebP tampil lebih dulu, saat video gagal dimuat, atau saat pengguna mengurangi animasi/menghemat data. Samakan poster, deskripsi, dan preload di `index.html` dengan konfigurasi `BMA_HERO` saat mengubahnya. Video aktif `assets/videos/bma-hero-fullhd-v2.mp4` diekspor dari master `_source/BMA_Hero_12s_1080p.mp4` (1920×1080, 30 fps, 12 detik, tanpa audio, faststart; sekitar 22,3 MB). Ekspor memakai H.264 CRF 17 dan penajaman ringan agar tidak memakai versi 720p pada layar besar. Poster `home-hero-fullhd-poster-{800,1920}.webp` diambil dari detik ke-8 video aktif. Lapisan hero dipergelap di CSS tanpa mengubah warna berkas video.

Kartu berita pada daftar dan beranda masih ditulis sebagai HTML; build belum menyinkronkan keduanya dari data artikel. Lowongan masih tersebar di tabel `pages/karir.html`, data `jobs`/`jobDetails` pada `assets/js/script.js`, halaman detail, dan pilihan posisi pada `pages/lamar.html`.

## GitHub Pages

`index.html` tetap di root dan seluruh nama HTML di `pages/` dipertahankan. Pembersihan direktori tidak memerlukan pemindahan sumber publikasi ke `public/` atau penggantian alamat halaman. Pertahankan pengaturan GitHub Pages yang digunakan. CSS dan JavaScript kini diakses melalui `assets/css/` dan `assets/js/`.

Tidak ada aturan deployment baru dalam proyek ini. Saat migrasi ke hosting dinamis, pisahkan arsip `_source/`, dokumentasi, data pengembangan, dan tool dari document root server.

## Batasan prototipe

- Artikel, lowongan, dan sebagian gambar merupakan materi contoh.
- Gambar generatif adalah ilustrasi, bukan dokumentasi karyawan atau kantor asli.
- Formulir kontak dan lamaran hanya melakukan validasi/simulasi di browser; belum mengirim atau menyimpan data.
- Tautan media sosial masih contoh, dan pilihan bahasa belum aktif.
- Dokumen profil perusahaan, logo master, dan gambar sumber dipertahankan di `_source/`.
- Lisensi font dan catatan sumber aset harus tetap dipertahankan.

Lihat [sumber aset](docs/assets.md), [arsip master](_source/README.md), dan [panduan migrasi dinamis](docs/dynamic-migration.md).
