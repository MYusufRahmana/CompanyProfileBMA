## Logo (`logo/`)

Dibuat dari `images/FINAL LOGO BMA BLACK.png` (file sumber, simpan untuk membuat ulang):

- `bma-logo-color.*` — simbol oranye + teks abu gelap, untuk latar terang (navbar setelah scroll, menu mobile, og:image).
- `bma-logo-white.*` — simbol oranye + teks putih, untuk latar gelap/foto (navbar di atas foto).
- `bma-logo-footer.*` — versi putih + garis + "MEMBER OF GROWIN GROUP" (footer).
- `../favicon-32.png`, `../favicon-192.png`, `../apple-touch-icon.png` — dari simbol logo yang sama.

## Foto perusahaan (`images/FotoBMA/`)

Foto asli BMA, dikonversi ke WebP:

- `hero-{1,2,3}-*` — slide hero Beranda dan banner halaman dalam.
- `site-kelanis-{1,2,3}-*` — galeri Site Kelanis.

## Foto ilustrasi

Bukan dokumentasi BMA; ganti dengan foto perusahaan sebelum publikasi.

- `images/mining/` — foto tambang dari Unsplash (Unsplash License), WebP 640–1600px:

| File | Unsplash photo |
| --- | --- |
| hero-coal-getting-* | https://unsplash.com/photos/RzwixD6C67s |
| hero-hauling-* | https://unsplash.com/photos/1HEDPbH6HIE |
| coal-loading-* | https://unsplash.com/photos/7QAbQrQ2Iog |
| coal-extraction-* | https://unsplash.com/photos/mzEAjV141Ds |
| overburden-removal-* | https://unsplash.com/photos/NWByxwVN-J0 |
| haul-truck-* | https://unsplash.com/photos/Evss0Whf5OI |
| equipment-support-* | https://unsplash.com/photos/Mx6Xmf_nbRk |
| mine-site-aerial-* | https://unsplash.com/photos/EN1tF2EG-50 |
| hauling-fleet-* | https://unsplash.com/photos/ed9HcUgZORI |
| pit-benches-* | https://unsplash.com/photos/1O_HNWeY0O4 |
| hse-inspection-* | https://unsplash.com/photos/lHI9NA4U7hg |

- `images/photo-1524522173746-f628baad3644*` — kapal kargo (layanan Bongkar Muat), Unsplash: https://images.unsplash.com/photo-1524522173746-f628baad3644
- `images/social/social-{education,health,environment}-640.webp` — foto artikel kategori Sosial di Berita (Unsplash License): TmdrCRVDOnQ, k2nXCVm-SUg, FyCjvyPG9Pg (https://unsplash.com/photos/<id>)
- `images/about/about-team-portrait-*` — dua pekerja ber-APD ("Sekilas Tentang Kami"), Pexels License: https://www.pexels.com/photo/a-man-and-a-woman-wearing-hard-hats-talking-at-the-construction-site-8961030/

## Peta (`images/Kalimantan-Site-Gabungan.svg`)

Peta gabungan Kalimantan Tengah & Selatan dibuat dengan paintmaps.com; kredit "Created with paintmaps.com" di dalam peta dipertahankan.

## Font & ikon

Inter dan Manrope dibundel sebagai WOFF2 variabel (Latin) dari Google Fonts; file lisensi SIL Open Font License (`fonts/*-OFL.txt`) wajib tetap ada di samping file font. GSAP 3.12.5 dan ScrollTrigger dibundel di akhir `js/script.js` dengan header lisensi aslinya.

Sprite ikon SVG inline (dibuat oleh `tools/layout.mjs`) memakai ikon garis buatan sendiri dan beberapa path yang diadaptasi dari Feather Icons (MIT) dan Lucide (ISC).
