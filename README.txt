BMA — company profile (Coal Mining Operations)

Buka index.html langsung di browser, atau lewat Laragon (http://localhost/...). Tidak memerlukan npm, build, atau framework.
Catatan: lewat file:// beberapa browser memblokir preload font (CORS); tampilan tetap berjalan dengan font fallback. Gunakan server lokal untuk hasil identik dengan produksi.

STRUKTUR (multi-page, seluruh teks publik berbahasa Indonesia)
Navbar utama (urutan tetap): Beranda · Tentang Kami · Layanan · Sosial · Berita · Perusahaan Kami · Kontak.
Karir bukan menu/submenu: diakses dari footer (kolom "Layanan & Karir") dan dari menu mobile.

- index.html                 Beranda: hero 3 slide, profil singkat, 3 layanan, 3 berita, slider logo perusahaan, footer.
- pages/about.html           Tentang Kami: profil, sejarah ([Tahun] placeholder), visi & misi, nilai, keunggulan.
- pages/services.html        Layanan: 5 layanan contoh (#coal-getting, #overburden-removal, #coal-hauling, #equipment-support, #site-operations).
- pages/operations.html      Operasional Tambang (bagian dari Layanan; menu aktif = Layanan): proses, pemuatan, pengangkutan, galeri.
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
