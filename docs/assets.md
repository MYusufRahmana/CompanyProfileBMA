# Sumber aset dan lisensi

Path dalam dokumen ini dihitung dari root proyek. Aset browser berada di `assets/`; file master berada di `_source/`.

## Logo (`assets/logo/`)

Dibuat dari `_source/logo/bma-logo-master.png` (file sumber, simpan untuk membuat ulang):

- `bma-logo-color.*` — simbol oranye + teks abu gelap, untuk latar terang (navbar setelah scroll, menu mobile, og:image).
- `bma-logo-white.webp` — simbol oranye + teks putih, untuk latar gelap/foto (navbar di atas foto).
- `bma-logo-footer.webp` — versi putih + garis + "MEMBER OF GROWIN GROUP" (footer).
- `assets/icons/favicon-32.png`, `assets/icons/favicon-192.png`, `assets/icons/apple-touch-icon.png` — dari simbol logo yang sama.

## Foto perusahaan (`assets/images/company/`)

Foto asli BMA, dikonversi ke WebP:

- `hero-{1,2,3}-*` — foto profil beranda dan banner halaman dalam.

## Foto ilustrasi

- `assets/images/company/home-team-hero-{800,1600}.webp` — ilustrasi generatif AI pekerja BMA untuk hero beranda, dengan area kosong di kiri untuk teks. Bukan dokumentasi karyawan asli. Master: `_source/generated-heroes/home-team-hero-v1.png`.

- `assets/images/company/{services,news,careers,contact}-hero-bma-{800,1600}.webp` — empat ilustrasi generatif AI untuk hero Layanan (pemuatan hasil tambang), Berita (pencatatan kegiatan lapangan), Karir (kolaborasi rekan kerja), dan Kontak (diskusi kebutuhan proyek). Dibuat menggunakan OpenAI ImageGen; bukan dokumentasi karyawan, kantor, atau kegiatan asli BMA. Sumber resolusi penuh tersimpan di `_source/generated-heroes/`.

- `assets/images/company/about-mining-bma-{800,1600}.webp` — ilustrasi generatif AI excavator dan truk berlabel Berkat Maritim Abadi, untuk hero Tentang Kami. Dibuat menggunakan OpenAI ImageGen; bukan dokumentasi operasional asli. Sumber resolusi penuh: `_source/generated-heroes/about-hero-v1.png`.

Bukan dokumentasi BMA; ganti dengan foto perusahaan sebelum publikasi.

- `assets/images/mining/` — foto tambang dari Unsplash (Unsplash License), WebP 640–1600px:

| File | Unsplash photo |
| --- | --- |
| hero-coal-getting-* | https://unsplash.com/photos/RzwixD6C67s |
| coal-loading-* | https://unsplash.com/photos/7QAbQrQ2Iog |
| coal-extraction-* | https://unsplash.com/photos/mzEAjV141Ds |
| overburden-removal-* | https://unsplash.com/photos/NWByxwVN-J0 |
| haul-truck-* | https://unsplash.com/photos/Evss0Whf5OI |
| equipment-support-* | https://unsplash.com/photos/Mx6Xmf_nbRk |
| mine-site-aerial-* | https://unsplash.com/photos/EN1tF2EG-50 |
| hauling-fleet-* | https://unsplash.com/photos/ed9HcUgZORI |
| pit-benches-* | https://unsplash.com/photos/1O_HNWeY0O4 |
| hse-inspection-* | https://unsplash.com/photos/lHI9NA4U7hg |

- `assets/images/logistics/cargo-ship-*` — kapal kargo (layanan Bongkar Muat), Unsplash: https://images.unsplash.com/photo-1524522173746-f628baad3644
- `assets/images/social/social-{education,health,environment}-*` — foto artikel kategori Sosial di Berita (Unsplash License): TmdrCRVDOnQ, k2nXCVm-SUg, FyCjvyPG9Pg (https://unsplash.com/photos/<id>)
- `assets/images/about/bma-team-white-helmet-{560,960}.webp` — ilustrasi generatif AI dua pekerja berseragam BMA untuk halaman Tentang Kami. Dibuat menggunakan OpenAI ImageGen; bukan dokumentasi karyawan asli. Sumber resolusi penuh: `_source/generated-photos/bma-team-white-helmet.png` (helm pekerja perempuan berwarna putih).

## Font & ikon

Inter dan Manrope dibundel sebagai WOFF2 variabel (Latin) dari Google Fonts; file lisensi SIL Open Font License (`assets/fonts/*-OFL.txt`) wajib tetap ada di samping file font.

Sprite ikon SVG inline (dibuat oleh `tools/layout.mjs`) memakai ikon garis buatan sendiri dan beberapa path yang diadaptasi dari Feather Icons (MIT) dan Lucide (ISC).

## Merek armada (`assets/logo/equipment/`)

Deretan merek pada beranda mengacu pada daftar alat berat halaman 8–9 profil perusahaan. Logo menunjukkan merek peralatan yang digunakan, bukan daftar mitra atau sponsor. Jumlah unit, model, dan tahun tidak ditampilkan. SVG disimpan dari aset produsen; PNG dipangkas hanya pada ruang transparan. Tampilan monokrom diatur melalui CSS. Area tampilan SVG LiuGong dibatasi ke logo agar slogan di sebelah kanan tidak mengecilkan mereknya.

| Aset | Sumber produsen |
| --- | --- |
| komatsu.svg | https://www.komatsu.jp/assets/images/logo.svg |
| hitachi.svg | SVG logo inline di https://hitachicm.com.au/ |
| liugong.svg | https://www.liugong.com/storage/upload/2025-12-19/RixySEpRfn.svg |
| sany.svg | https://www.sanyglobal.com/static/new/img/logo.svg |
| howo.png | https://en.sinotruk.com/uiFramework/commonResource/image/2023110415485850271.png |
| lgmg.png | https://www.lgmg.com.cn/upload/images/2025/11/17/2d78da88ed8e4602a6c3d860fd16697a.png |
