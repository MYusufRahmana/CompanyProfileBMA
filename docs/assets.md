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

## Hero Berita, Karir, dan Kontak (26 Oktober 2026)

Pengguna meminta foto operasional yang disediakan perusahaan, tanpa menampilkan ilustrasi orang sebagai pekerja BMA.

| Halaman | Aset aktif | Sumber |
| --- | --- | --- |
| Berita | `assets/images/company/news-operations-{800,1475}.webp` | `D:/GrowinGroup/FotoBMA/FotoHero2.png`, 1475 × 1066 px |
| Karir | `assets/images/company/careers-operations-{800,1466}.webp` | `D:/GrowinGroup/FotoBMA/FotoHero3.png`, 1466 × 1073 px |
| Kontak | `assets/images/company/contact-company-profile-{800,2042}.webp` | Gambar `X4.jpg`, diekstrak langsung dari slide 12 `_source/company-profile-2026.pdf`, 2042 × 1362 px |

Master yang dipakai disalin ke `_source/hero-operasional/`. Varian WebP berkualitas 92 memakai resolusi sumber penuh dan versi 800 px untuk layar kecil. Tidak ada pembesaran generatif, penggantian wajah, penambahan objek, atau perubahan isi foto. Potongan yang terlihat diatur melalui CSS `object-fit: cover` dan `--banner-focus`; file sumber tetap utuh. Resolusi tidak diklaim melebihi detail asli sumber. Foto udara utama di slide 12 hanya 768 × 576 px, sehingga tidak dipilih untuk banner desktop.

## Video profil beranda

- `assets/videos/bma-profil-960.mp4` — video di bingkai Profil Perusahaan (12 detik, 960×540, tanpa audio, ±2,4 MB), dikompresi dari `assets/videos/BmaVidio.mp4`. Poster: `assets/images/company/profil-video-poster-960.webp` (bingkai detik ke-6). Video dimuat saat bingkai terlihat; tidak diputar otomatis bila gerak dikurangi/penghemat data aktif.

## Foto ilustrasi

- `assets/images/company/foto-layanan-armada-{800,1600}.webp` — ilustrasi barisan dump truck dan truk tangki. Dipakai pada layanan Alat Berat & Tenaga Kerja, berita Pelatihan (foto utama), dan berita Keselamatan (foto tengah). Master: `_source/generated-photos/foto-layanan-armada-v1.png`.

- `assets/images/company/home-team-hero-{800,1600}.webp` — ilustrasi generatif AI pekerja BMA untuk hero beranda, dengan area kosong di kiri untuk teks. Bukan dokumentasi karyawan asli. Master: `_source/generated-heroes/home-team-hero-v1.png`.

- `assets/images/company/services-hero-bma-{800,1600}.webp` — ilustrasi generatif AI untuk hero Layanan (pemuatan hasil tambang). Bukan dokumentasi operasional asli. Sumber resolusi penuh tersimpan di `_source/generated-heroes/`.
- Varian ilustrasi lama `news-hero-bma-*`, `careers-hero-bma-*`, dan `contact-hero-bma-*` tidak lagi dipakai pada Hero Berita, Karir, dan Kontak sejak revisi 26 Oktober 2026.

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
| mine-site-aerial-* | https://unsplash.com/photos/EN1tF2EG-50 |
| hauling-fleet-* | https://unsplash.com/photos/ed9HcUgZORI |
| pit-benches-* | https://unsplash.com/photos/1O_HNWeY0O4 |
| hse-inspection-* | https://unsplash.com/photos/lHI9NA4U7hg |

- `assets/images/logistics/cargo-ship-*` — kapal kargo (layanan Bongkar Muat), Unsplash: https://images.unsplash.com/photo-1524522173746-f628baad3644
- `assets/images/social/social-{education,health,environment}-*` — foto artikel kategori Sosial di Berita (Unsplash License): TmdrCRVDOnQ, k2nXCVm-SUg, FyCjvyPG9Pg (https://unsplash.com/photos/<id>)
- `assets/images/about/bma-team-white-helmet-{560,960}.webp` — ilustrasi generatif AI dua pekerja berseragam BMA untuk halaman Tentang Kami. Dibuat menggunakan OpenAI ImageGen; bukan dokumentasi karyawan asli. Sumber resolusi penuh: `_source/generated-photos/bma-team-white-helmet.png` (helm pekerja perempuan berwarna putih).

## Pelat kode unit pada ilustrasi excavator (28 Oktober 2026)

Tulisan kode unit yang dicat langsung pada bodi excavator (mis. `BMA-EX-75-01`) diganti dengan pelat biru dua baris: **BMA** / **EX-75-0N**, berbingkai putih seperti pelat nomor aset. Nomor unit mengikuti gambar: unit 01 (SANY), unit 02 dan 03 (LiuGong).

| Aset web | Master baru (`_source/generated-heroes/`) |
| --- | --- |
| `hero-1-bma-unit-01-{800,1480}.webp` | `hero-1-unit-01-v3.png` (EX-75-01, ditambah EX-75-02 di latar) |
| `hero-2-bma-unit-02-{800,1480}.webp` | `hero-2-unit-02-v3.png` (EX-75-02) |
| `hero-3-bma-unit-03-{800,1460}.webp` | `hero-3-unit-03-v3.png` (EX-75-03, ditambah EX-75-02 pada boom di latar) |
| `about-mining-bma-unit-01-{800,1600}.webp` | `about-hero-unit-01-v3.png` (EX-75-01) |
| `services-hero-bma-unit-02-{800,1600}.webp` | `services-hero-unit-02-v3.png` (EX-75-02) |

Teks lama dihapus dan diisi warna serta tekstur cat di sekitarnya; pelat dipasang mengikuti kemiringan bodi dan pencahayaan foto. Revisi 28 Oktober: ukuran pelat diperkecil menjadi ±70% dan dibuat lebih realistis (biru sedikit pudar `#16428E`, putih cat, tekstur dan debu tipis, bayangan tepi, butiran foto). Bagian lain gambar tidak diubah. Master `-v2.png` tetap disimpan sebagai versi sebelum pelat. Font FreeSans Bold. Ekspor WebP kualitas 88, ukuran sama dengan file sebelumnya.

## Hero beranda: motion (28 Oktober 2026)

Hero memakai rangkaian gambar HD yang bergerak pelan (zoom + geser, *Ken Burns*) dan berganti dengan *crossfade* setiap 6,5 detik, menggantikan video. Diatur di `assets/js/site-data.js` (`slides`, `interval`); slide pertama juga ditulis di `index.html`.

| Slide | File | Master (`_source/generated-heroes/`) | Ponsel |
| --- | --- | --- | --- |
| 1 | `hero-motion-1-1475.webp` (1475 × 1067) | `hero-2-unit-02-v3.png` (LiuGong EX-75-02) | ya |
| 2 | `hero-motion-2-1920.webp` (1920 × 720) | `about-hero-unit-01-v3.png` (SANY EX-75-01) | tidak (panorama) |
| 3 | `hero-motion-3-1466.webp` (1466 × 1073) | `hero-3-unit-03-v3.png` (LiuGong EX-75-03) | ya |
| 4 | `hero-motion-4-1920.webp` (1920 × 640) | `services-hero-unit-02-v3.png` (LiuGong EX-75-02) | tidak (panorama) |

Semua gambar adalah ilustrasi generatif AI (lihat bagian Foto ilustrasi). WebP kualitas 86, total ±1,6 MB. Animasi berhenti saat hero di luar layar atau tab tidak aktif, bisa dijeda dengan tombol, dan diganti gambar diam bila pengguna memilih "kurangi animasi".

Video sebelumnya (`assets/videos/*.mp4`) dan poster `home-hero-*-poster*` tidak lagi dipakai; sumber video tetap di `_source/BmaVidio.MP4`.

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
