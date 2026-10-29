# Background pattern BMA

## Ruang lingkup

Halaman menggunakan HTML, CSS, dan JavaScript statis tanpa framework. Pattern dimuat melalui `assets/css/section-patterns.css`, pada `index.html`, `pages/about.html`, `pages/contact.html`, `pages/karir.html`, dan halaman detail lowongan. Halaman daftar `pages/news.html` juga memuat stylesheet ini. Selector dibatasi ke `.home-page`, `.page-about`, `.page-contact`, `.page-careers`, dan `.page-news`, sehingga halaman lainnya dan backend tidak terpengaruh.

Implementasi mengikuti section yang sudah tersedia. Tidak ada section Statistik, Proyek, atau Karier/CTA baru. Keunggulan tetap berada di Profil Perusahaan; konteks operasional dan logistik diwakili Armada Pendukung.

## Pemetaan visual

| Section | Selector | Corak dan alasan |
| --- | --- | --- |
| Hero | `.hero__stage` | Tanpa corak tambahan sesuai revisi pengguna; foto dan overlay keterbacaan dipertahankan. |
| Profil Perusahaan | `.pattern-topographic` | Kontur topografi di kanan atas untuk konteks eksplorasi dan pertambangan. Warna peach tipis di kiri bawah menghubungkan foto dengan palet BMA. |
| Layanan | `.pattern-blueprint` | Charcoal, grid teknis, serta titik koordinat ringan untuk konteks engineering. Kartu tetap putih; judul dan pengantar memakai warna terang. |
| Armada Pendukung | `.pattern-maritime` | Kontur gelombang di bawah dan aksen diagonal di kanan atas untuk menghubungkan operasional alat dengan logistik maritim. |
| Berita | `.pattern-editorial` | Busur abstrak di kanan atas dan dot matrix di kiri bawah. Bagian tengah tetap tenang untuk membaca artikel. |
| Footer | `:is(.home-page, .page-about, .page-contact, .page-careers, .page-news) > .footer` | Tekstur diagonal dan cahaya oranye tipis. Markup generator serta ukuran footer dipertahankan. |

## Pattern Tentang Kami

| Section | Class | Alasan |
| --- | --- | --- |
| Profil | `.pattern-topographic` | Kontur geologi untuk identitas pertambangan; teks rata kanan–kiri dipertahankan. |
| Sejarah | `.pattern-dots` | Titik koordinat di tepi dan garis teknis tipis; timeline tetap statis. |
| Visi–Misi | `.pattern-planning` | Grid perencanaan ringan di belakang panel gelap dan peach yang sudah ada. |
| Nilai Perusahaan | `.pattern-diagonal` | Aksen diagonal pada tepi untuk karakter operasional. |
| Klien Kami | `.pattern-maritime` | Gelombang ringan pada margin; daftar klien tetap statis. |
| Ajakan kerja sama | `.pattern-flow` | Garis mengalir dan cahaya oranye tipis pada permukaan charcoal. |
| Footer | Scope bersama | Tekstur geometris yang sama dengan Beranda. |

## Pattern Kontak

- Section peta ilustratif dan tautan Google Maps telah dihapus dari halaman Kontak sesuai permintaan pengguna.
- Informasi kantor dan formulir memakai `.pattern-connections`: grid 1,5 px pada tepi, cahaya peach, dan garis konektivitas oranye 2,2 px.
- SVG `assets/patterns/contact-connections.svg` memakai warna palet BMA dan tidak menggambarkan lokasi geografis sebenarnya.
- Intensitas lebih tegas hanya berlaku pada Kontak. Pattern Beranda dan Tentang Kami tidak berubah.
- Formulir tetap berlatar putih; perilaku validasi, penghitung karakter, dan pemberitahuan demo tetap sama. Formulir tetap belum mengirim pesan.
- Footer Kontak mendapat tekstur diagonal 1,5 px dan aksen oranye yang sedikit lebih terlihat. Hero Beranda tetap tanpa corak.
- Keterangan kantor pusat lama di halaman Kontak diselaraskan menjadi Jakarta Utara sesuai koreksi pengguna sebelumnya.

## Pattern dan penyederhanaan Karier

- Budaya kerja memakai `.pattern-career-culture`: aksen diagonal oranye dan cahaya peach di tepi.
- Daftar lowongan dan isi detail posisi memakai `.pattern-recruitment`: grid teknis di permukaan abu-abu muda. Tabel serta kartu posisi tetap mudah dibaca.
- Proses rekrutmen memakai `.pattern-career-process`: garis mengalir dan aksen peach ringan. Footer mengikuti tekstur bersama.
- Tabel lowongan terdiri dari No., Posisi, Departemen, Lokasi Penempatan, dan Aksi. Kolom Status dan Batas Pengajuan Lamaran dihapus, termasuk informasi sejenis pada tiga halaman detail lowongan.
- FAQ mengenai status/batas lamaran diganti dengan informasi lokasi penempatan.
- Kalimantan Timur dan Kalimantan Selatan ditulis lengkap pada filter, atribut lokasi baris, isi tabel, metadata/detail posisi, dan data posisi formulir di `assets/js/script.js`.
- Filter tetap membandingkan nilai lokasi yang sama antara select dan atribut baris. Struktur penomoran, pagination, serta tujuan tautan Lamar tidak berubah.
- Formulir lamaran mempertahankan tampilannya; informasi lokasi yang diisi melalui JavaScript mengikuti nama provinsi lengkap.
- Pemeriksaan browser meliputi enam ukuran layar, filter kedua lokasi, departemen, kata kunci, keadaan kosong/reset, tautan Lamar, pemilihan posisi formulir, detail lowongan, FAQ, menu mobile, dan daftar tanpa JavaScript.

## Halaman daftar Berita

- `pages/news.html` memakai `.pattern-editorial`: busur abstrak tipis berwarna palet BMA di kanan atas dan dot matrix di kiri bawah. Kartu artikel tetap berlatar putih.
- Panel kategori tetap tersedia dalam permukaan putih, tanpa kolom Cari Berita.
- Dependensi `newsSearch` dihapus dari logika daftar pada `assets/js/script.js`. Filter hanya memakai kategori, dengan enam artikel per halaman.
- Tombol reset mengembalikan kategori Semua Berita dan memindahkan fokus ke tombol kategori tersebut.
- Filter kategori, jumlah hasil, pagination, tujuan artikel, dan akses ke sembilan artikel tanpa JavaScript telah diperiksa.
- Style pencarian yang khusus Berita dibuang dari `assets/css/pages.css`; pencarian lowongan tetap berfungsi.
- Isi dan template halaman detail berita tidak berubah. Footer mendapat pattern hanya pada halaman yang memuat stylesheet bersama.

## File dan cara menyesuaikan

- `index.html`: memuat stylesheet bersama dan memasang class pada empat section isi. Hero tidak memakai class pattern.
- `pages/about.html`: memuat stylesheet bersama dan memasang class pada enam section isi. Banner foto mempertahankan overlay aslinya.
- `assets/css/section-patterns.css`: seluruh warna permukaan, posisi, mask, ukuran, dan opacity. Menggunakan token palet dari `style.css`; tidak mengubah token global.
- `assets/patterns/topographic.svg`: kontur geologi berbasis vektor.
- `assets/patterns/maritime-waves.svg`: kontur gelombang berbasis vektor.
- `assets/patterns/contact-connections.svg`: garis konektivitas untuk Kontak.
- `pages/contact.html`: memuat stylesheet bersama, menambahkan class pattern, serta menghapus section peta.

Untuk mengurangi intensitas, ubah `opacity` pada pseudo-element terkait, bukan opacity section. Opacity section akan ikut memudarkan konten. Warna grid menggunakan `--pattern-line` dan `--pattern-accent`, yang didefinisikan lokal pada `.home-page`, `.page-about`, dan `.page-contact`.

Pattern SVG digambar sebagai kode dekoratif, bukan logo perusahaan atau aset foto. Tidak ada library, font, atau gambar raster baru.

## Layer, responsivitas, dan interaksi

- `.section-pattern` membuat stacking context terisolasi. Pseudo-element menggunakan `pointer-events: none` dan dipotong pada batas section.
- Pattern biasa berada pada `z-index: -1`, di atas background section dan di belakang konten.
- Hero Beranda tidak memiliki pseudo-element pattern. Banner foto Tentang Kami juga mempertahankan lapisan foto dan overlay aslinya.
- Breakpoint 680 px mengurangi detail dan opacity serta memperkecil dekorasi tepi.
- Semua corak statis. Tidak ada animasi tambahan, termasuk ketika `prefers-reduced-motion` aktif.
- Tidak ada ukuran atau ruang layout yang bergantung pada proses pemuatan SVG, sehingga dekorasi tidak menimbulkan pergeseran layout.
- Footer dikenali melalui `.home-page > .footer`, sehingga sinkronisasi `tools/layout.mjs` tidak menghapus dekorasi dan tidak menambah pattern pada footer halaman di luar Beranda, Tentang Kami, Kontak, dan halaman Karier yang memuat stylesheet ini.

## Verifikasi

- Build: `node tools/news.mjs` lalu `node tools/layout.mjs`.
- Referensi aset: `node tools/audit-paths.mjs`.
- Pemeriksaan browser pada lebar 320, 375, 768, 1024, 1440, dan 1920 px.
- Dibandingkan dengan kondisi sebelum perubahan: teks, tujuan tautan, logo, dan tinggi section desktop tetap sama.
- Menu mobile, tautan kartu/CTA, tombol kembali ke atas, konten tanpa JavaScript, serta isolasi stylesheet terhadap halaman dalam telah diperiksa.
