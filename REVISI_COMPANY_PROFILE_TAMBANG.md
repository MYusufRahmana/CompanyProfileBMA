# Instruksi Revisi Website Company Profile Pertambangan Batu Bara

## 1. Tujuan

Bertindak sebagai **Senior Frontend Developer, UI/UX Designer, dan Code Reviewer**. Tingkatkan website company profile perusahaan pertambangan batu bara, terutama aktivitas **coal getting**, yang **sudah memiliki HTML, CSS, dan JavaScript**.

**PENTING:** Mulai dengan memeriksa seluruh isi direktori project aktual. Jangan membuat ulang project dari nol, jangan mengganti teknologi menjadi framework, dan jangan mengasumsikan struktur file tertentu sudah ada. Pertahankan kode, aset, dan fitur yang masih baik. Lakukan perubahan bertahap tanpa merusak halaman lain.

### Prinsip utama
- Website menggunakan **multi-page**, bukan seluruh konten ditumpuk di Beranda.
- Seluruh teks yang tampil kepada pengunjung menggunakan **bahasa Indonesia yang natural, profesional, dan konsisten**, termasuk navbar, judul, tombol, placeholder, validasi, dan footer.
- Tetap menggunakan **HTML5, CSS3, dan Vanilla JavaScript** pada tahap sekarang.
- Desain mencerminkan industri pertambangan batu bara: aktivitas pengambilan batu bara, excavator, dump truck, hauling, dan lingkungan operasional tambang.
- Terapkan responsive design, aksesibilitas dasar, dan performa yang baik.

## 2. Susunan navbar utama — wajib persis urutannya

1. **Beranda** → halaman beranda
2. **Tentang Kami** → profil perusahaan
3. **Layanan** → layanan perusahaan
4. **Sosial** → aktivitas dan kontribusi sosial perusahaan
5. **Berita** → daftar berita perusahaan
6. **Perusahaan Kami** → daftar perusahaan dalam grup
7. **Kontak** → informasi kontak

**Aturan navbar:**
- Tujuh menu di atas adalah **menu utama**. Gunakan navigasi halaman biasa (`href`), bukan anchor yang men-scroll semua section di halaman Beranda.
- Teks menu harus sesuai ejaan di atas, termasuk **Kontak**, bukan “Contact”, dan **Berita**, bukan “News”.
- **Karir bukan submenu Tentang Kami.** Halaman Karir harus berdiri sendiri dengan URL tersendiri. Karena Karir tidak masuk dalam daftar tujuh menu utama, berikan akses ke Karir melalui tautan yang mudah ditemukan di footer dan/atau tombol/tautan khusus yang tidak menjadi submenu Tentang Kami. Jangan menambahkannya sebagai menu utama kedelapan tanpa persetujuan.
- Beri penanda menu aktif, efek hover yang halus, navbar sticky bila sudah ada, serta menu mobile yang dapat dibuka dan ditutup dengan baik.
- Pertahankan logo dan identitas visual yang sudah tersedia.

## 3. Perbaikan footer — lebih ramping dan proporsional

**Masalah:** Footer saat ini terlalu tinggi/tebal dan membuat halaman terasa berat.

**Perbaikan yang wajib dilakukan:**
- Kurangi padding vertikal, jarak antar kolom, margin, dan elemen dekoratif yang terlalu besar.
- Gunakan layout ringkas maksimal 3–4 kolom di desktop, misalnya: identitas perusahaan singkat, tautan cepat, layanan/halaman penting, dan kontak.
- Logo jangan terlalu besar; deskripsi perusahaan maksimal 1–2 kalimat.
- Tambahkan tautan **Karir** dan **Sosial** pada footer tanpa menduplikasi seluruh navbar secara berlebihan.
- Buat baris copyright tipis di bagian paling bawah.
- Hindari banner besar, ruang kosong berlebihan, dan elemen visual yang menambah tinggi tanpa fungsi.
- Pada mobile, susun kolom secara vertikal dengan jarak yang tetap nyaman dan tidak memanjang berlebihan.
- Pastikan footer konsisten di setiap halaman; sesuaikan implementasi terhadap arsitektur project HTML yang tersedia.

**Target visual:** profesional, minimalis, kompak, tetap terbaca, dan tidak mendominasi konten utama.

## 4. Bahasa Indonesia di seluruh website

Audit dan ubah **seluruh copywriting yang terlihat** menjadi bahasa Indonesia, termasuk:
- Navbar, breadcrumb, heading, subheading, paragraf, tombol dan CTA.
- Label formulir, placeholder, pesan validasi, status, tabel, dan pagination.
- Judul halaman (`<title>`), deskripsi SEO, `alt` gambar, serta atribut aksesibilitas yang dibaca pengunjung.
- Footer, teks berita, halaman karir, sosial, dan profil perusahaan.

Contoh konsistensi istilah:

| Sebelumnya | Menjadi |
|---|---|
| Home | Beranda |
| About Us | Tentang Kami |
| Our Services | Layanan |
| Social | Sosial |
| Latest News | Berita Terbaru |
| Our Companies | Perusahaan Kami |
| Contact | Kontak |
| Careers | Karir |
| Read More | Baca Selengkapnya |
| Apply Now | Lamar Sekarang |
| Learn More | Pelajari Selengkapnya |

Istilah teknis industri seperti *coal getting*, *overburden*, atau *hauling* dapat dipertahankan bila lazim dalam operasional, tetapi beri penjelasan Indonesia pada konten publik bila dibutuhkan. **Jangan terjemahkan nama perusahaan, merek, nama resmi, atau istilah teknis secara sembarangan.**

## 5. Halaman Karir — terpisah, menggunakan tabel

Buat atau perbaiki halaman **Karir** sebagai halaman mandiri (contoh `karir.html`, sesuaikan dengan pola direktori aktual).

**Jangan:**
- Memasukkan Karir sebagai dropdown atau submenu Tentang Kami.
- Menggunakan layout kartu/grid untuk menampilkan daftar lowongan.

**Gunakan tabel lowongan** dengan kolom:

| No. | Posisi | Departemen | Lokasi Penempatan | Tipe Pekerjaan | Batas Lamaran | Status | Aksi |
|---|---|---|---|---|---|---|---|
| 1 | [Nama Posisi] | [Departemen] | [Lokasi] | [Tipe] | [Tanggal] | Dibuka | **Lamar** |

Persyaratan:
- Buat header halaman dengan judul **Karir** dan deskripsi singkat.
- Tabel rapi, mudah dibaca, diberi batas/pemisah baris dan efek hover yang lembut.
- Tombol **Lamar** terlihat jelas dan menggunakan warna aksen perusahaan.
- Sediakan filter sederhana berdasarkan kata kunci, departemen atau lokasi jika data mendukung.
- Jika lowongan banyak, sediakan pagination sederhana.
- Responsif: pada layar kecil gunakan pembungkus `overflow-x: auto` untuk mempertahankan struktur tabel, bukan mengubahnya menjadi grid kartu.
- Bedakan lowongan **Dibuka** dan **Ditutup**; nonaktifkan tombol Lamar untuk lowongan yang sudah ditutup.
- Tombol **Lamar** menuju halaman/detail/form lamaran yang benar-benar tersedia. Jika belum ada sistem penerimaan lamaran, buat halaman/detail lowongan dan CTA yang jelas berstatus prototipe, atau gunakan tautan email resmi **hanya jika alamat telah disediakan**. **Jangan memalsukan status “lamaran berhasil dikirim”.**
- Jangan membuat lowongan atau tanggal penutupan seolah-olah data resmi; gunakan data contoh yang diberi label jika belum ada data nyata.

## 6. Halaman Sosial — halaman baru

Buat halaman **Sosial** yang terpisah (contoh `sosial.html` sesuai struktur project), berfokus pada **kegiatan sosial, kontribusi kepada masyarakat, dan program tanggung jawab sosial perusahaan**.

Struktur rekomendasi:
1. **Banner halaman:** “Sosial” disertai breadcrumb.
2. **Pengantar:** komitmen perusahaan terhadap masyarakat di sekitar wilayah operasional.
3. **Program Sosial:** kategori seperti pendidikan, kesehatan, pemberdayaan ekonomi masyarakat, dan kepedulian lingkungan **sebagai placeholder bila belum terverifikasi**.
4. **Dokumentasi Kegiatan:** galeri foto aktivitas sosial dengan judul dan penjelasan singkat.
5. **Cerita dan Kegiatan Terbaru:** rangkuman aktivitas sosial yang dapat diklik menuju detail jika halaman tersedia.
6. **Ajakan Kolaborasi:** tombol **Hubungi Kami** menuju halaman Kontak bila relevan.

**Pedoman:**
- Tampilkan visual manusiawi, autentik, dan kredibel; hindari penggunaan foto tambang sebagai satu-satunya visual halaman Sosial.
- Jangan membuat klaim kegiatan CSR, nominal bantuan, penerima manfaat, atau capaian nyata tanpa data perusahaan.
- Jika belum ada konten, gunakan label contoh/placeholder yang mudah diganti.
- Tidak perlu dashboard atau backend untuk tahap ini.

## 7. Halaman Beranda — tetap sederhana

Beranda adalah ringkasan, bukan salinan semua halaman. Batasi pada:
1. Hero slider (maksimal 3 slide) bernuansa pertambangan batu bara.
2. Profil perusahaan singkat + tombol **Tentang Kami**.
3. Pratinjau maksimal 3 layanan + tombol **Lihat Semua Layanan**.
4. Berita terbaru (maksimal 3 item) + tombol **Lihat Semua Berita**.
5. Logo perusahaan dalam grup (slider horizontal jika fitur saat ini sudah tersedia) + tombol **Lihat Perusahaan Kami**.
6. Footer yang ringkas.

**Hapus sepenuhnya** section **Operational Highlights** dan **Health, Safety & Environment** dari rancangan saat ini; jangan otomatis dipindahkan ke halaman lain. Pertahankan hanya konten yang memang diperlukan sebagai ringkasan Beranda.

## 8. Halaman lain tetap terpisah

- **Tentang Kami:** profil, sejarah, visi, misi, nilai perusahaan (hanya gunakan fakta yang tersedia).
- **Layanan:** daftar layanan dan penjelasan aktivitas operasional seperti coal getting; jangan membuat layanan fiktif sebagai klaim resmi.
- **Berita:** daftar berita, tanggal, kategori, dan tautan detail bila tersedia.
- **Perusahaan Kami:** logo, nama, profil singkat, dan hubungan perusahaan dalam grup bila telah dikonfirmasi.
- **Kontak:** alamat, telepon, email, peta jika data tersedia, dan formulir tampilan saja bila backend belum ada.
- **Karir:** halaman independen berisi tabel lowongan dan tombol Lamar.
- **Sosial:** halaman independen tentang kegiatan sosial perusahaan.

Tidak semua bagian harus ditampilkan ulang pada Beranda.

## 9. Standar UI/UX dan teknis

- Identitas visual: charcoal/abu batu bara, putih, serta aksen emas industrial yang digunakan secukupnya.
- Foto relevan dengan tambang batu bara; prioritaskan aset perusahaan bila ada.
- Tipografi tegas dan profesional, dengan hierarki judul yang konsisten.
- HTML semantik; satu `h1` utama yang tepat pada setiap halaman.
- Responsif pada lebar 360px, 768px, 1024px, dan 1440px.
- Hindari horizontal overflow, kecuali container tabel lowongan yang memang bisa digeser.
- Optimalkan ukuran gambar, gunakan lazy loading pada gambar non-kritis.
- Pertahankan transisi dan animasi yang halus serta dukungan `prefers-reduced-motion`.
- Pastikan menu mobile, slider, tombol, pencarian/filter tabel, dan tautan bekerja.
- Jangan memasukkan framework baru atau membuat backend pada fase ini.
- Gunakan path relatif yang benar agar perpindahan antarhalaman dan pemuatan CSS/JS/aset tidak rusak.

## 10. Urutan implementasi yang harus dilakukan

1. **Audit direktori aktual:** tampilkan ringkasan folder/file yang ditemukan dan identifikasi halaman yang sudah ada, termasuk file Karir, footer, navbar, serta aset.
2. **Audit navigasi:** periksa halaman yang saat ini masih menjadi section Beranda atau submenu.
3. **Perbaiki navbar:** tepat tujuh menu utama dengan urutan yang ditentukan; Karir mandiri, bukan submenu Tentang Kami.
4. **Ringkas footer:** kurangi tinggi serta atur ulang elemen agar padat dan elegan.
5. **Lokalisasi konten:** ubah seluruh teks publik menjadi bahasa Indonesia, tanpa merusak nama atau istilah teknis resmi.
6. **Perbaiki Karir:** ganti daftar lowongan menjadi tabel responsif dengan tombol Lamar yang masuk akal.
7. **Buat halaman Sosial:** selaras dengan tema perusahaan dan tautkan dari navbar.
8. **Periksa Beranda:** pertahankan ringkasan utama, hapus dua section yang tidak diinginkan.
9. **Uji seluruh halaman:** navigasi, active state, semua CTA, responsive layout, CSS/JS, console error, dan broken links.
10. **Laporkan hasil:** file yang dibuat/diedit, perubahan utama, fitur yang belum berfungsi karena belum ada backend/data resmi, serta tindakan lanjutan.

## 11. Kriteria penerimaan (Definition of Done)

- [ ] Seluruh direktori project sudah diperiksa sebelum perubahan.
- [ ] Navbar berisi tepat: Beranda, Tentang Kami, Layanan, Sosial, Berita, Perusahaan Kami, Kontak.
- [ ] Setiap menu navbar membuka halaman berbeda yang sesuai.
- [ ] Karir bukan submenu Tentang Kami dan memiliki halaman mandiri.
- [ ] Halaman Karir menampilkan daftar lowongan sebagai **tabel, bukan grid**.
- [ ] Tiap lowongan aktif memiliki tombol **Lamar** dengan tujuan yang valid atau status prototipe yang jelas.
- [ ] Halaman Sosial tersedia, dapat dibuka, dan terhubung dari navbar.
- [ ] Footer jauh lebih ringkas, tidak terlalu tinggi pada desktop dan mobile.
- [ ] Semua teks antarmuka publik berbahasa Indonesia.
- [ ] Beranda ringkas dan tidak menampung seluruh konten halaman lain.
- [ ] Operational Highlights dan Health, Safety & Environment dihapus.
- [ ] Seluruh gambar, CSS, JS, dan tautan penting berhasil dimuat.
- [ ] Tampilan dan fungsi berjalan di desktop, tablet, dan mobile.
- [ ] Tidak ada klaim perusahaan, lowongan, atau program sosial fiktif yang ditampilkan sebagai fakta.

---

## Instruksi terakhir kepada coding assistant

**Mulai dengan membaca direktori project yang saat ini terbuka di workspace. Jangan berasumsi file belum ada. Berikan ringkasan audit singkat, kemudian terapkan revisi langsung pada file existing dan buat hanya file baru yang memang diperlukan. Prioritaskan navbar, footer, halaman Karir, halaman Sosial, serta konsistensi bahasa Indonesia. Pastikan website tetap multipage, rapi, ringan, dan beridentitas perusahaan pertambangan batu bara.**
