BMA — company profile (Coal Mining Operations)

Buka index.html langsung di browser, atau lewat Laragon (http://localhost/...). Tidak memerlukan npm, build, atau framework.
Catatan: lewat file:// beberapa browser memblokir preload font (CORS); tampilan tetap berjalan dengan font fallback. Gunakan server lokal untuk hasil identik dengan produksi.

STRUKTUR (multi-page — setiap menu navbar adalah halaman sendiri)
- index.html               Home: hero slider, About preview, 3 layanan utama, 3 berita terbaru, marquee logo perusahaan.
- pages/about.html         About Us: overview, history (placeholder), visi & misi, corporate values, company strengths.
- pages/services.html      Our Services: 5 layanan placeholder (#coal-getting, #overburden-removal, #coal-hauling, #equipment-support, #site-operations).
- pages/operations.html    Operations: overview, coal getting process, excavator loading, coal hauling, galeri + lightbox.
- pages/news.html          News: filter kategori, pencarian, pagination (6/halaman), artikel lengkap di "Reading Room" (#id artikel).
- pages/companies.html     Our Companies: direktori 6 perusahaan dengan filter sektor, pencarian, dan detail (#mining, #marine, …).
- pages/contact.html       Contact: info kantor, form UI (belum terhubung backend), maps placeholder. Mendukung ?layanan=<nama layanan>.
- pages/karir.html, lamar.html, lowongan-*.html   Halaman karir (diakses dari dropdown About Us → Careers).
- css/style.css            Design system bersama: token, tipografi, tombol, navbar + dropdown, hero, footer, scroll reveal, gaya karir.
- css/components.css       Komponen reusable: kartu layanan & berita, process steps, marquee logo, peta placeholder, daftar kontak.
- css/pages.css            Layout halaman dalam: page banner + breadcrumb, timeline, visi-misi, values, service rows, galeri, pagination, form.
- css/brand-heroes.css     Logo dua warna di navbar/footer + hero halaman karir.  css/careers.css: tambahan halaman karir.
- js/script.js             Modul navigation, hero, marquee, scrollReveal, directory + interaksi berita (filter/pagination), form kontak,
                           galeri lightbox, navigasi layanan, karir & lamaran. Berisi salinan lokal GSAP 3.12.5 + ScrollTrigger.
- tools/layout.mjs         Sumber tunggal header, footer, dan sprite ikon untuk SEMUA halaman.
- tools/audit-paths.mjs    Memeriksa semua path lokal: node tools/audit-paths.mjs

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
Profil, sejarah ([Tahun]), visi, misi, layanan, berita, anak perusahaan, alamat/email/telepon, dan tautan media sosial
adalah contoh. Tidak ada klaim sertifikasi atau angka perusahaan. Formulir kontak dan lamaran masih simulasi frontend.
Halaman karir (karir, lowongan-*, lamar) masih memuat isi lowongan lama bertema maritim/logistik dan perlu diselaraskan.
Section Operational Highlights, Health Safety & Environment, dan peta Coverage telah dihapus dari rancangan.

Animasi menghormati prefers-reduced-motion dan seluruh konten tetap terlihat tanpa JavaScript.
