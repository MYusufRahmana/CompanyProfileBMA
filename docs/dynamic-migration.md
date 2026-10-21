# Panduan pengembangan dinamis

Proyek ini adalah prototipe statis. Belum ada backend, database, autentikasi, atau pengiriman formulir. Struktur sekarang mempertahankan publikasi GitHub Pages untuk demonstrasi. Framework backend dapat dipilih saat implementasi dinamis dimulai.

## Pemetaan komponen

| Sumber prototipe | Tujuan pada aplikasi dinamis |
| --- | --- |
| Header, footer, ikon di `tools/layout.mjs` | Layout dan partial/component bersama |
| `content/site.mjs` | Konfigurasi perusahaan atau pengaturan CMS |
| `content/news.mjs` | Model/tabel berita, kategori, dan media |
| `assets/js/site-data.js` | Data hero dan lokasi operasional dari konfigurasi/CMS |
| Kartu berita di beranda dan daftar | Query artikel pada template |
| Tabel karier, data jobs/jobDetails, halaman detail | Satu sumber data lowongan |
| `pages/contact.html` dan `pages/lamar.html` | Endpoint, validasi server, dan penanganan formulir |
| `assets/` | Aset publik yang disalin atau diproses bundler |

Jika memilih Laravel, HTML dapat dipindahkan ke Blade, komponen bersama menjadi partial, dan data perusahaan menjadi konfigurasi atau model. Generator statis dapat dihentikan setelah template dan datanya sudah digantikan backend.

## Urutan migrasi

1. Buat layout bersama dengan mempertahankan tampilan dan perilaku responsif.
2. Satukan data berita, lowongan, hero, dan lokasi operasional agar tidak diedit di beberapa tempat.
3. Hubungkan halaman detail dan daftar ke sumber data yang sama.
4. Implementasikan formulir dengan validasi server, penyimpanan sesuai kebutuhan, serta notifikasi. Pertahankan keterangan simulasi sampai fungsi ini tersedia.
5. Ganti berita, lowongan, tautan, dan ilustrasi dengan materi yang siap dipublikasikan.
6. Petakan URL lama ke URL baru atau siapkan redirect ketika alamat halaman berubah.

## Aset dan deployment

- Font, logo, favicon, dan WebP aktif tersedia di `assets/`.
- Referensi CSS/JavaScript relatif terhadap HTML; URL gambar di CSS relatif terhadap stylesheet.
- Path gambar konfigurasi beranda relatif terhadap `index.html`, bukan lokasi JavaScript.
- PNG/JPG master dan PDF ada di `_source/` untuk penyuntingan, bukan untuk dilayani aplikasi.
- Jangan menghapus HTML detail berita selagi masih ditautkan halaman lain.
- Sumber gambar dan lisensi tercatat di [assets.md](assets.md).
