# Struktur Folder BMA Company Profile

Tanggal: 2026-10-07
Status: menunggu review pengguna

## Tujuan

Memisahkan file berdasarkan jenis — HTML, CSS, JS — tanpa mengubah perilaku, tampilan, atau animasi situs.

Proyek tetap statis: tanpa npm, tanpa build, tanpa framework, tanpa dependensi baru. GSAP dan ScrollTrigger tetap memakai salinan lokal yang sudah tertanam di `script.js`.

## Kendala yang sudah dipetakan

Seluruh referensi di dalam repo sudah diinventarisasi. Tidak ada referensi dari luar repo.

| Jenis referensi | Jumlah | Catatan |
|---|---|---|
| `href="x.html"` antar halaman | ±250 | Semua memakai nama file telanjang |
| `src="assets/..."`, `href="assets/..."` | ±90 | Font dan gambar |
| `href="*.css"` | 28 | style 11, brand-heroes 11, careers 4, companies 1, about 1 |
| `src="*.js"` | 15 | script 11, careers 4 |
| `url(assets/fonts/…)` di CSS | 2 | `style.css` baris 6 dan 17 |
| `content="Logo_Berkat_Maritim_Abadi.png"` | 11 | Atribut `og:image` — bukan `href`/`src`, mudah terlewat |
| `README.txt` | 1 | Mendokumentasikan nama file di root |

Dua jebakan yang sudah diidentifikasi dan harus ditangani:

1. `og:image` memakai atribut `content`, sehingga tidak tertangkap pencarian `href`/`src` biasa.
2. `script.js` memuat bundel GSAP minified yang mengandung literal `.js` dan `.css`. Substitusi massal pada file itu akan merusak library.

## Keputusan

1. `index.html` tetap di root agar URL situs tetap langsung menampilkan beranda.
2. 10 halaman lain dipindahkan ke `pages/`.
3. Kelima CSS dipindahkan ke `css/`, kedua JS ke `js/`.
4. `Logo_Berkat_Maritim_Abadi.png` dipindahkan ke `assets/images/`. Dua screenshot kerja (`brand-preview.png`, `company-preview.png`) dipindahkan ke `docs/preview/` karena bukan aset situs.

## Struktur akhir

```
BMA_Company_Profile/
├── index.html
├── pages/
│   ├── tentang-kami.html
│   ├── layanan.html
│   ├── berita.html
│   ├── perusahaan-kami.html
│   ├── kari.html
│   ├── kontak.html
│   ├── lamar.html
│   ├── lowongan-hse-officer.html
│   ├── lowongan-logistics-coordinator.html
│   └── lowongan-marine-supervisor.html
├── css/
│   ├── style.css
│   ├── brand-heroes.css
│   ├── about.css
│   ├── careers.css
│   └── companies.css
├── js/
│   ├── script.js
│   └── careers.js
├── assets/
│   ├── bma-logo.webp
│   ├── fonts/
│   └── images/
├── docs/
│   ├── preview/
│   └── superpowers/specs/
└── README.txt
```

Isi `assets/` selain penambahan logo tidak berubah.

## Aturan penulisan ulang path

### `index.html` (berada di root)

| Dari | Jadi |
|---|---|
| `href="style.css"` | `href="css/style.css"` |
| `href="brand-heroes.css"` | `href="css/brand-heroes.css"` |
| `src="script.js"` | `src="js/script.js"` |
| `href="tentang-kami.html"` dan 9 halaman dalam `pages/` lainnya | `href="pages/tentang-kami.html"` dan seterusnya — seluruh 10 halaman dapat awalan `pages/` |
| `content="Logo_Berkat_Maritim_Abadi.png"` | `content="assets/images/Logo_Berkat_Maritim_Abadi.png"` |
| `src="assets/…"`, `href="assets/…"` | tidak berubah |
| `href="index.html"` | tidak berubah |

### 10 file di `pages/`

| Dari | Jadi |
|---|---|
| `href="style.css"` | `href="../css/style.css"` |
| `href="brand-heroes.css"` | `href="../css/brand-heroes.css"` |
| `href="about.css"`, `href="careers.css"`, `href="companies.css"` | `href="../css/…"` |
| `src="script.js"` | `src="../js/script.js"` |
| `src="careers.js"` | `src="../js/careers.js"` |
| `href="index.html"` | `href="../index.html"` |
| `content="Logo_Berkat_Maritim_Abadi.png"` | `content="../assets/images/Logo_Berkat_Maritim_Abadi.png"` |
| `src="assets/…"`, `href="assets/…"` | `../assets/…` |
| `href="kontak.html"` dan halaman lain | tidak berubah — semua tetap satu folder |

### `css/style.css`

| Dari | Jadi |
|---|---|
| `url(assets/fonts/…` | `url(../assets/fonts/…` |

### `README.txt`

Struktur folder dan nama file diperbarui agar sesuai lokasi baru. Tidak ada perubahan lain pada isi.

## Implementasi

Pemindahan file memakai operasi `git mv` atau `mv` per file, bukan wildcard.

Penulisan ulang path memakai satu skrip Node sekali pakai yang dihapus setelah selesai. Skrip memakai daftar file dan daftar substitusi per file secara eksplisit, bukan pola wildcard. Aturan tambahan:

- Skrip hanya boleh menulis pada 11 file HTML dan `css/style.css`.
- Skrip tidak boleh menyentuh `js/script.js` maupun `js/careers.js`.
- Setiap substitusi asserting jumlah kecocokan yang diharapkan. Jika jumlahactual tidak sama, skrip berhenti dan melaporkan, bukan menebak.
- Karakter `&` pada query string seperti `kontak.html?layanan=Logistics%20%26%20Supply` tidak boleh teralterasi.

## Verifikasi

1. **Audit resolver path.** Skrip Node mem-parse seluruh `href`, `src`, `content`, dan `url()` pada 11 file HTML dan 5 file CSS. Referensi lokal me-resolve relatif terhadap direktori file. Setiap target di-assert ada di disk. Nol target hilang berarti semua tautan hidup. Hasil ditampilkan sebagai tabel per file.
2. **Grep negatif.** Harus nol kecocokan: `href="style.css"` di `pages/`, pola `"assets/` tanpa awalan `../` di `pages/`, `href="kontak.html"` di `index.html`, `url(assets/` di `css/`.
3. **`node --check`** pada `js/script.js` dan `js/careers.js` setelah pemindahan.
4. **Cek visual 11 halaman.** Tool browser tidak terhubung di sesi ini, sehingga langkah ini diserahkan ke pengguna sebagai verifikasi manual melalui Laragon pada `http://localhost/CompanyProfile/BMA_Company_Profile/`.

## Risiko dan batasan

- URL lama seperti `/kontak.html` menjadi 404. Tidak ada tautan dari luar repo, tetapi bookmark lama perlu diarahkan ulang.
- Git repo di project ini ber-root di `D:\` dengan 0 commit. Tidak ada `git mv` yang aman dan spec ini tidak di-commit. Pemindahan memakai operasi filesystem biasa.
- Tidak ada test suite maupun linter pada project ini, dan tidak akan ditambahkan. Bukti kebenaran datang dari audit resolver path.