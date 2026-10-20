BMA — company profile (Coal Mining Operations)

Buka index.html langsung di browser, atau lewat Laragon (http://localhost/...). Tidak memerlukan npm, build, atau framework.
Catatan: lewat file:// beberapa browser memblokir preload font (CORS); tampilan tetap berjalan dengan font fallback. Gunakan server lokal untuk hasil identik dengan produksi.

STRUKTUR (multi-page, seluruh teks publik berbahasa Indonesia)
Navbar utama (urutan tetap): Beranda · Tentang Kami · Layanan · Sosial · Berita · Perusahaan Kami · Kontak.
Karir bukan menu/submenu: diakses dari footer (kolom "Layanan & Karir") dan dari menu mobile.

- index.html                 Beranda: hero 3 slide, profil singkat, 3 layanan, 3 berita, Site Operasional (#site-operasional),
                             slider logo perusahaan, footer.
- pages/about.html           Tentang Kami: profil, sejarah ([Tahun] placeholder), visi & misi, nilai, keunggulan.
- pages/services.html        Layanan: 6 layanan sesuai company profile 2026 (#coal-getting, #overburden-removal, #coal-hauling,
                             #equipment-support, #site-operations, #bongkar-muat) + Armada Alat Berat (#alat-berat):
                             ringkasan jumlah per jenis + tabel rincian 47 tipe / 86 unit (dalam <details>, tertutup default).
- pages/sosial.html          Sosial: komitmen, 4 bidang program (contoh), dokumentasi + lightbox, cerita terbaru (ke Berita kategori Sosial).
- pages/news.html            Berita: filter kategori (Korporat, Operasional, K3, Sosial), pencarian, pagination 6/halaman, artikel lengkap (#id).
- pages/companies.html       Perusahaan Kami: direktori 6 perusahaan contoh, filter sektor, pencarian, detail.
- pages/contact.html         Kontak: info kantor, formulir tampilan (belum terhubung backend), peta contoh. Mendukung ?layanan=<nama layanan>.
- pages/karir.html           Karir: TABEL lowongan (No., Posisi, Departemen, Lokasi, Tipe, Batas Lamaran, Status, Aksi) + filter
                             kata kunci/departemen/lokasi/status + pagination. Lowongan Ditutup: tombol Lamar nonaktif.
- pages/lowongan-*.html      Detail lowongan (operator-excavator, hse-officer, logistics-coordinator).
- pages/lamar.html           Formulir lamaran prototipe (?posisi=<id>). Tidak mengirim/menyimpan data.
- css/style.css              Design system: token, tipografi, tombol, navbar, hero, footer ringkas, scroll reveal, formulir lamaran.
- css/components.css         Komponen reusable: kartu layanan & berita, process steps, marquee logo, peta contoh, daftar kontak.
- css/pages.css              Halaman dalam: banner + breadcrumb, timeline, visi-misi, nilai, layanan, galeri, pagination, form,
                             tabel lowongan, detail lowongan, halaman Sosial.
- css/brand-heroes.css       Logo dua warna (navbar transparan & footer gelap).
- js/script.js               Modul navigation, hero, marquee, scrollReveal, directory, BMA.paginate (dipakai Berita & Karir),
                             filter berita, tabel lowongan, form kontak, lightbox galeri, navigasi layanan, formulir lamaran. GSAP lokal.
- tools/layout.mjs           Sumber tunggal navbar, footer, dan ikon untuk SEMUA halaman.
- tools/audit-paths.mjs      Pemeriksa path lokal.

HERO BERANDA
Foto layar penuh, judul besar "BERKAT MARITIM ABADI" di atas (satu baris selebar layar di desktop,
putih tembus pandang), CTA + deskripsi + kartu pratinjau slide berikutnya di bawah. Navbar tidak diubah.
Foto hero: assets/images/FotoBMA/hero-{1,2,3}-*.webp (WebP 800px & ±1480px). Foto yang sama dipakai banner halaman dalam (kecuali Sosial).
Slide pertama juga dirujuk di index.html (preload, og:image, <picture> statis) — ganti bersamaan.
Semua diatur dari js/script.js → window.BMA_HERO (tanpa mengubah HTML/CSS):
- title            : judul utama; ukuran otomatis menyesuaikan lebar layar.
- overlayOpacity   : kegelapan overlay 0 (terang) – 0.8 (gelap). Bisa juga per slide (slides[i].overlayOpacity).
- interval         : jeda autoplay dalam ms.
- slides[]         : desktopImage, mobileImage (≤ 680px, opsional), position & mobilePosition (nilai CSS
                     object-position, mis. "center 60%"), eyebrow, description, alt (opsional).
                     Satu slide saja = tanpa autoplay dan tanpa kontrol slide.
- slides[].foregroundImage (opsional) : PNG/WebP objek yang sudah dipotong (latar transparan) dari foto
                     yang SAMA dan berukuran SAMA (mis. excavator). Objek tampil di depan judul
                     (efek "tulisan di belakang objek"). foregroundMobileImage untuk versi mobile.
Slide pertama juga ditulis di index.html (agar langsung tampil & tetap tampil tanpa JavaScript); bila foto slide
pertama diganti, samakan src di <picture class="hero__photo"> dan <link rel="preload"> di <head>.
Warna aksen hero: variabel --hero-accent (#FC7108) di css/style.css, blok "Hero".

SITE OPERASIONAL (Beranda, setelah Berita)
Satu peta gabungan menampilkan Kalimantan Tengah (Kelanis, Benao) dan Kalimantan Selatan (Banjarmasin) sekaligus.
Peta yang ditampilkan: assets/images/Kalimantan-Site-Gabungan.svg (800 × 533).
Peta gabungan (assets/images/Kalimantan-Site-Gabungan.svg) bersumber dari paintmaps.com; SVG per provinsi sudah dihapus (masih ada di riwayat git).
Kredit "Created with paintmaps.com" tetap terlihat pada peta gabungan dan di bawahnya.
Posisi marker (%) dihitung terhadap peta gabungan; posisi tersebut ilustratif.
Data di js/script.js:
- window.BMA_SITE_MAPS : nama provinsi untuk pengelompokan site.
- window.BMA_SITES     : tiap site punya map (kalteng/kalsel), deskripsi, link, posisi marker (% terhadap peta gabungan), galeri.
- window.BMA_SITE_DEFAULT : site aktif awal ("kelanis").
Menambah site pada provinsi yang ada cukup dengan menambah entri data; penanda dan tombol dibuat otomatis.
Menambah provinsi memerlukan pembaruan peta gabungan dan data provinsi.
Posisi Banjarmasin mengikuti wilayah kota pada peta; posisi Kelanis dan Benao masih perkiraan.
Galeri Kelanis memakai foto asli (assets/images/FotoBMA/site-kelanis-{1,2,3}-*.webp); Banjarmasin & Benao masih foto ilustrasi.
Foto asli diberi properti alt di BMA_SITES; label galeri otomatis berubah menjadi "Dokumentasi site".
Tombol "Lebih Lanjut" sementara menuju pages/services.html.

MENAMBAH LOWONGAN
1) Tambah baris <tr> di pages/karir.html (data-department, data-location, data-status = Dibuka/Ditutup).
2) Untuk lowongan Dibuka: tambahkan id ke array jobs di js/script.js (bagian formulir lamaran) dan <option> di pages/lamar.html.
3) Opsional: buat halaman detail pages/lowongan-<id>.html dengan menyalin salah satu yang ada.

MENGUBAH NAVBAR / FOOTER / IKON
Edit tools/layout.mjs lalu jalankan:  node tools/layout.mjs
Skrip mengganti <header class="site-header">, <footer class="footer"> dan blok <!-- icons:start --> di semua halaman; konten lain tidak disentuh.
Ikon dipakai dengan: <svg class="icon" aria-hidden="true"><use href="#i-nama"/></svg>

PALET
Charcoal #171C20 · Coal Gray #303941 · Industrial Gold #D6A646 · White #FFFFFF · Light #F4F5F6 · Text #252B30
Teks emas di atas putih memakai --gold-dark #8A6A1F (kontras AA). Logo asli (oranye) tidak diubah.

MIGRASI KE LARAVEL BLADE
- layouts/app.blade.php  : <head>, @include('partials.icons'), header, @yield('content'), footer, <script>.
- partials/header|footer|icons.blade.php : isi dari fungsi header()/footer()/iconSprite() di tools/layout.mjs
  (ganti href statis dengan route()/url() dan status aktif dengan request()->routeIs()).
- Setiap halaman di pages/ menjadi view sendiri (about.blade.php, services.blade.php, …); page banner menjadi komponen <x-page-banner>.
- Data yang berulang sudah berbentuk atribut/array sehingga mudah di-@foreach:
  logo perusahaan (data-name, data-field, data-description, data-href, data-icon), window.BMA_SITES di script.js, kartu layanan dan berita.

KONTEN PLACEHOLDER — WAJIB DIGANTI SEBELUM PUBLIKASI
Profil, sejarah ([Tahun]), visi, misi, layanan, berita, lowongan karir, program sosial, anak perusahaan, alamat/email/telepon, dan tautan media sosial
adalah contoh. Tidak ada klaim sertifikasi atau angka perusahaan. Formulir kontak dan lamaran masih simulasi frontend.
Section Operational Highlights, Health Safety & Environment, dan peta Coverage telah dihapus dari rancangan.

Animasi menghormati prefers-reduced-motion dan seluruh konten tetap terlihat tanpa JavaScript.
