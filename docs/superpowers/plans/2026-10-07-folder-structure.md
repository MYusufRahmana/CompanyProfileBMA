# Struktur Folder BMA Company Profile — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Memisahkan 11 file HTML, 5 file CSS, dan 2 file JS ke folder `pages/`, `css/`, dan `js/` tanpa mengubah perilaku, tampilan, atau animasi situs.

**Architecture:** `index.html` tetap di root agar URL situs tetap menampilkan beranda; 10 halaman lain masuk `pages/` sehingga link antar halaman tetap berupa nama file telanjang. Pemindahan file memakai `mv` per file. Penulisan ulang path dilakukan satu skrip Node sekali pakai yang menurunkan daftar nama halaman dari isi direktori `pages/`, bukan dari daftar yang diketik manual. Kebenaran dibuktikan oleh satu skrip audit yang me-resolve setiap referensi lokal relatif terhadap lokasi file dan memastikan targetnya ada di disk.

**Tech Stack:** HTML5 statis, CSS, JavaScript ES2022, Node.js untuk perkakas verifikasi. Tanpa npm, tanpa build, tanpa framework, tanpa dependensi baru. GSAP dan ScrollTrigger tetap memakai salinan lokal yang sudah tertanam di `script.js`.

**Spec:** `docs/superpowers/specs/2026-10-07-folder-structure-design.md`

## Global Constraints

- Tidak menambah dependensi, paket npm, tag `<script>`, atau CDN.
- Tidak mengubah isi, urutan, atau perilaku JS dan CSS selain prefiks path yang tercantum di spec.
- `js/script.js` memuat bundel GSAP minified yang mengandung literal `.js` dan `.css`. **Tidak ada substitusi teks pada file JS mana pun.**
- Tidak menambah test framework maupun linter. Perkakas verifikasi adalah skrip Node biasa.
- Tidak menjalankan `git commit`, `git mv`, atau `git add`. Repo git project ini ber-root di `D:\` dengan 0 commit dan mencakup seluruh drive. Semua operasi memakai `mv`/`cp` biasa.
- Direktori `assets/` tidak dipindah. Hanya `Logo_Berkat_Maritim_Abadi.png` yang ditambah ke `assets/images/`.
- Substitusi selalu memakai string literal per nama file, bukan regex alternation gabungan.

## Review Focus

Lima kondisi yang paling mungkin menggigit seseorang yang memakai situs ini nanti, dan yang tidak diuji oleh task mana pun:

1. **`og:image` memakai atribut `content`, bukan `href`/`src`.** Kalau terlewat, logo untuk pratinjau media sosial 404 di 11 halaman tanpa error terlihat di console.
2. **`srcset` dan `data-srcset` berisi URL aset multi-baris** (`assets/images/... 800w,`). Kalau `index.html` ikut diberi awalan `../`, gambar hero langsung rusak; kalau halaman lain yang dipindah punya `srcset`, wajib di-prefix.
3. **Link dengan query dan fragment**, misalnya `kontak.html?layanan=Logistics%20%26%20Supply` dan `perusahaan-kami.html#mining`. Prefiks harus ditambahkan tanpa merusak `%26` maupun `#fragment`.
4. **Tabrakan nama file `kari.html` vs `karir.html`.** Regex alternation gabungan seperti `(kari|kontak|...)` akan cocok ke `kari` lalu gagal, sehingga `karir.html` terlewat diam-diam. Ini benar-benar terjadi saat penyusunan plan ini.
5. **Substitusi pada `script.js`.** Satu `sed` di file itu merusak library GSAP dan mematikan seluruh animasi situs.

## Task 1: Bangun oracle audit path

**Files:**
- Create: `tools/audit-paths.mjs`

**Interfaces:**
- Consumes: tidak ada. Ini task pertama.
- Produces: `node tools/audit-paths.mjs` — exit code 0 bila semua referensi lokal resolve, exit code 1 bila ada target hilang, dan mencetak tabel per file. Task 3, 4, 5, dan 6 memanggil perintah ini.

Oracle harus melihat langsung keadaan akhir (semua resolve) dan keadaan rusak (ada target hilang), supaya ia terbukti bukan sekadar selalu lulus.

- [ ] **Step 1: Tulis skrip audit**

Buat `tools/audit-paths.mjs` dengan isi persis berikut:

```javascript
// Audit every local reference in the site and fail if a target is missing.
// Usage: node tools/audit-paths.mjs   (exit 0 = all resolve, exit 1 = broken)
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SKIP_DIRS = new Set(["docs", "tools", "node_modules", ".git"]);
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;
const HAS_EXT = /\.[a-z0-9]{2,5}(?:$|[?#])/i;
const FILE_EXT = /\.(?:png|jpe?g|webp|avif|svg|gif|ico|css|js|html|woff2?|ttf|otf|mp4|webm)$/i;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

// Split an attribute value into candidate local references.
function candidates(value) {
  const trimmed = value.trim();
  if (!trimmed || EXTERNAL.test(trimmed)) return [];
  // srcset holds several "url 800w" entries separated by commas.
  if (/\d+w\b/.test(trimmed)) {
    return trimmed
      .split(",")
      .map((part) => part.trim().split(/\s+/)[0])
      .filter(Boolean);
  }
  return [trimmed];
}

// A reference is a local file reference when it carries a known file extension.
// This keeps viewport meta content="width=device-width" out of the report.
function localPath(ref) {
  const clean = ref.split(/[?#]/)[0];
  if (!clean || EXTERNAL.test(clean)) return null;
  return HAS_EXT.test(ref) || FILE_EXT.test(clean) ? clean : null;
}

const files = walk(ROOT).filter((f) => /\.html?$/.test(f));
let broken = 0;
let checked = 0;

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  const found = [];

  if (file.endsWith(".html")) {
    const attr =
      /(?:href|src|content|srcset|data-srcset)\s*=\s*"([^"]*)"/gi;
    for (const match of source.matchAll(attr)) {
      for (const ref of candidates(match[1])) found.push(ref);
    }
  } else {
    for (const match of source.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/gi)) {
      found.push(match[1].trim());
    }
  }

  const local = found.map(localPath).filter(Boolean);
  const missing = [];
  for (const ref of local) {
    const target = path.resolve(path.dirname(file), ref);
    checked++;
    if (!fs.existsSync(target)) missing.push(ref);
  }

  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const status = missing.length ? "BROKEN" : "ok";
  console.log(
    `${status.padEnd(6)} ${rel.padEnd(42)} ${String(local.length).padStart(3)} refs`,
  );
  for (const ref of missing) console.log(`         -> missing: ${ref}`);
  broken += missing.length;
}

console.log(`\n${files.length} files, ${checked} local references, ${broken} broken`);
process.exit(broken ? 1 : 0);
```

- [ ] **Step 2: Jalankan audit pada layout saat ini dan pastikan GREEN**

Run: `node tools/audit-paths.mjs`
Expected: 11 baris `ok`, ringkasan `broken 0`, exit code 0.

Layout saat ini sudah utuh, jadi audit harus hijau. Ini membuktikan audit bisa membaca referensi yang memang valid.

- [ ] **Step 3: Buktikan audit bisa mendeteksi kerusakan**

Audit yang selalu hijau tidak berguna. Tanam satu referensi yang sengaja salah lalu pastikan audit merah.

File selftest harus berada di **root**, bukan di `tools/`, karena `tools/` ada di `SKIP_DIRS` dan tidak akan dipindai.

Buat `audit-selftest.html` di root:

Run: `printf '%s\n' '<a href="does-not-exist.html">x</a>' > audit-selftest.html`
Expected: file tercipta, tanpa output.

Jalankan audit:

Run: `node tools/audit-paths.mjs`
Expected: baris `BROKEN audit-selftest.html 1 refs` dengan `-> missing: does-not-exist.html`, ringkasan `1 broken`, exit code 1.

Hapus file selftest dan pastikan audit kembali hijau:

Run: `rm audit-selftest.html && node tools/audit-paths.mjs`
Expected: kembali ke 11 baris `ok`, ringkasan `0 broken`, exit code 0.

Kalau audit tidak berubah jadi merah pada langkah ini, jangan lanjut ke Task 2. Perbaiki `audit-paths.mjs` lebih dulu.

- [ ] **Step 4: Konfirmasi isi direktori tools**

Run: `ls -1 tools/`
Expected: hanya `audit-paths.mjs`.

## Task 2: Pindahkan file ke folder baru

**Files:**
- Create directory: `pages/`, `css/`, `js/`, `docs/preview/`
- Move: 10 file HTML → `pages/`
- Move: 5 file CSS → `css/`
- Move: 2 file JS → `js/`
- Move: `Logo_Berkat_Maritim_Abadi.png` → `assets/images/`
- Move: `brand-preview.png`, `company-preview.png` → `docs/preview/`

**Interfaces:**
- Consumes: `node tools/audit-paths.mjs` dari Task 1.
- Produces: layout filesystem final. Task 3 dan 4 menulis path di dalamnya.

Tidak ada substitusi teks di task ini. Yang diuji hanya konsekuensi pemindahan file.

- [ ] **Step 1: Buat salinan cadangan sebelum menyentuh apa pun**

Git tidak bisa dipakai sebagai jalur rollback, jadi buat satu salinan di luar folder proyek.

Run:
```bash
cd "D:/Laragon/laragon/www/CompanyProfile/BMA_Company_Profile"
cp -r . "D:/Laragon/laragon/www/CompanyProfile/BMA_Company_Profile_backup_pre_restructure"
```
Expected: tanpa output. Verifikasi jumlah file HTML di salinan:

Run: `ls -1 ../BMA_Company_Profile_backup_pre_restructure/*.html | wc -l`
Expected: 11.

Kalau angkanya bukan 11, hapus salinan dan ulangi. Jangan lanjut sebelum salitan ini benar.

- [ ] **Step 2: Buat direktori**

Run:
```bash
cd "D:/Laragon/laragon/www/CompanyProfile/BMA_Company_Profile"
mkdir -p pages css js docs/preview
```
Expected: tanpa output, exit code 0.

- [ ] **Step 3: Pindahkan 10 halaman ke `pages/`**

Run:
```bash
mv tentang-kami.html layanan.html berita.html perusahaan-kami.html kari.html kontak.html lamar.html lowongan-hse-officer.html lowongan-logistics-coordinator.html lowongan-marine-supervisor.html pages/
```
Expected: tanpa output. `index.html` sengaja tidak dipindah.

- [ ] **Step 4: Pindahkan CSS ke `css/`**

Run:
```bash
mv style.css brand-heroes.css about.css careers.css companies.css css/
```
Expected: tanpa output.

- [ ] **Step 5: Pindahkan JS ke `js/`**

Run:
```bash
mv script.js careers.js js/
```
Expected: tanpa output.

- [ ] **Step 6: Pindahkan file PNG**

Run:
```bash
mv Logo_Berkat_Maritim_Abadi.png assets/images/
mv brand-preview.png company-preview.png docs/preview/
```
Expected: tanpa output.

- [ ] **Step 7: Pastikan root bersih dan `index.html` masih ada**

Run: `ls -1 *.html *.css *.js 2>/dev/null`
Expected: hanya `index.html`. Kalau ada nama lain yang tersisa, Task 2 belum tuntas.

- [ ] **Step 8: Jalankan audit dan pastikan RED**

Run: `node tools/audit-paths.mjs`
Expected: banyak baris `BROKEN`, termasuk `index.html` untuk setiap `style.css`, `brand-heroes.css`, `script.js`, dan setiap link halaman; `BROKEN pages/*.html` untuk setiap `style.css`, `script.js`, `assets/...`; dan `BROKEN css/style.css` untuk dua `url(assets/fonts/...)`. Ringkasan `broken` jauh di atas 0, exit code 1.

Ini adalah state merah yang disengaja. Kegagalan di sini adalah bukti bahwa audit benar-benar mendeteksi tautan putus.

## Task 3: Tulis ulang path di 11 file HTML

**Files:**
- Create: `tools/rewrite-paths.mjs` (sekali pakai, dihapus di Task 6)
- Modify: `index.html`, dan 10 file di `pages/`

**Interfaces:**
- Consumes: layout dari Task 2, `tools/rewrite-paths.mjs`.
- Produces: semua referensi di 11 file HTML resolve. `node tools/audit-paths.mjs` setelah task ini hanya boleh melaporkan 2 target hilang, keduanya `assets/fonts/...` dari `css/style.css`.

- [ ] **Step 1: Tulis skrip rewrite**

Buat `tools/rewrite-paths.mjs` dengan isi persis berikut:

```javascript
// One-shot path rewrite for the folder restructure.
// Page names are read from pages/ so a hand-written name list can never go stale.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const rel = (p) => path.relative(ROOT, p).replace(/\\/g, "/");

const pageNames = fs
  .readdirSync(path.join(ROOT, "pages"))
  .filter((f) => f.endsWith(".html"));

const cssNames = fs
  .readdirSync(path.join(ROOT, "css"))
  .filter((f) => f.endsWith(".css"));

const jsNames = fs
  .readdirSync(path.join(ROOT, "js"))
  .filter((f) => f.endsWith(".js"));

const logoTarget = "assets/images/Logo_Berkat_Maritim_Abadi.png";

let grandTotal = 0;

function rewrite(file, rules) {
  let source = fs.readFileSync(file, "utf8");
  let touched = 0;

  for (const [needle, replacement] of rules) {
    const parts = source.split(needle);
    const count = parts.length - 1;
    if (!count) continue;
    source = parts.join(replacement);
    touched += count;
  }

  if (touched) {
    fs.writeFileSync(file, source, "utf8");
    grandTotal += touched;
    console.log(`${rel(file).padEnd(42)} ${touched} substitutions`);
  } else {
    console.log(`${rel(file).padEnd(42)} 0 (unchanged)`);
  }
}

// index.html lives at the root: css/, js/, pages/ and assets/ are one level down.
const rootRules = [
  ...cssNames.map((n) => [`href="${n}"`, `href="css/${n}"`]),
  ...jsNames.map((n) => [`src="${n}"`, `src="js/${n}"`]),
  // No closing quote, so fragments and query strings keep working.
  ...pageNames.map((n) => [`href="${n}`, `href="pages/${n}`]),
  [`content="Logo_Berkat_Maritim_Abadi.png"`, `content="${logoTarget}"`],
];

// pages/*.html live one level down: everything returns via ../
const pageRules = [
  ...cssNames.map((n) => [`href="${n}"`, `href="../css/${n}"`]),
  ...jsNames.map((n) => [`src="${n}"`, `src="../js/${n}"`]),
  ["href=\"index.html", 'href="../index.html'],
  [`src="assets/`, `src="../assets/`],
  [`href="assets/`, `href="../assets/`],
  [`content="Logo_Berkat_Maritim_Abadi.png"`, `content="../${logoTarget}"`],
];

rewrite(path.join(ROOT, "index.html"), rootRules);
for (const name of pageNames) {
  rewrite(path.join(ROOT, "pages", name), pageRules);
}

console.log(`\n${pageNames.length} pages, ${grandTotal} substitutions total`);
```

Perhatikan `["href=\"index.html", 'href="../index.html"]` — string di sebelah kanan sengaja tanpa kutip penutup, sama seperti pola halaman di `rootRules`, supaya `index.html#lowongan` ikut ter-prefix.

- [ ] **Step 2: Jalankan rewrite**

Run: `node tools/rewrite-paths.mjs`
Expected: 11 baris, semua berisi jumlah substitusi lebih dari 0, lalu ringkasan `11 pages, N substitutions total` dengan N lebih dari 300. `css/*.html` mana pun yang tidak ada tidak boleh muncul.

- [ ] **Step 3: Jalankan audit, harus masih RED hanya di CSS**

Run: `node tools/audit-paths.mjs`
Expected: semua baris `ok` kecuali `css/style.css`, yang melaporkan tepat 2 `-> missing: assets/fonts/...`. Exit code 1.

Kalau ada baris `BROKEN` lain, baca nama target yang hilang dan perbaiki Task 3, jangan lanjut ke Task 4.

## Task 4: Tulis ulang `url()` di CSS

**Files:**
- Modify: `css/style.css`

**Interfaces:**
- Consumes: hasil Task 3.
- Produces: `node tools/audit-paths.mjs` hijau penuh, exit code 0.

- [ ] **Step 1: Prefiks path font di `css/style.css`**

Ganti dua baris di `css/style.css` (baris 6 dan 17):

Dari:
```css
  src: url(assets/fonts/inter-latin.woff2) format("woff2");
```
Jadi:
```css
  src: url(../assets/fonts/inter-latin.woff2) format("woff2");
```

Dari:
```css
  src: url(assets/fonts/manrope-latin.woff2) format("woff2");
```
Jadi:
```css
  src: url(../assets/fonts/manrope-latin.woff2) format("woff2");
```

- [ ] **Step 2: Pastikan tidak ada `url(assets/` yang tertinggal**

Run: `grep -rn "url(assets/" css/ || echo "CLEAN"`
Expected: `CLEAN`.

- [ ] **Step 3: Jalankan audit, harus GREEN**

Run: `node tools/audit-paths.mjs`
Expected: semua baris `ok`, ringkasan `broken 0`, exit code 0.

Ini adalah bukti utama bahwa restrukturisasi tidak memutus satu pun tautan.

## Task 5: Verifikasi negatif dan sintaks

**Files:**
- Modify: `README.txt`

**Interfaces:**
- Consumes: layout final dari Task 4.
- Produces: jaminan bahwa tidak ada path lama yang tertinggal dan JS tetap valid.

- [ ] **Step 1: Grep negatif path lama**

Run:
```bash
grep -rn 'href="style.css"\|href="brand-heroes.css"\|href="careers.css"\|href="about.css"\|href="companies.css"' pages/ index.html && echo "FAIL: bare css link found" || echo "PASS: no bare css links"
grep -rn 'src="script.js"\|src="careers.js"' pages/ index.html && echo "FAIL: bare js link found" || echo "PASS: no bare js links"
```
Expected dua baris `PASS`.

- [ ] **Step 2: Pastikan `assets/` di `pages/` selalu berprefiks `../`**

Run: `grep -rn '="assets/' pages/ && echo "FAIL: unprefixed asset path" || echo "PASS: all asset paths prefixed"`
Expected: `PASS: all asset paths prefixed`.

- [ ] **Step 3: Pastikan `index.html` memakai `pages/` dan tidak memakai `../`**

Run:
```bash
grep -c 'href="pages/' index.html
grep -c '\.\./' index.html || true
```
Expected: angka pertama lebih besar dari 0, angka kedua 0.

- [ ] **Step 4: Pastikan fragment dan query string utuh**

Run: `grep -rc 'perusahaan-kami.html#mining' pages/ | grep -v ':0' ; grep -rc 'Logistics%20%26%20Supply' pages/ | grep -v ':0'`
Expected: minimal satu baris per pola. Pola `%26` masih utuh berarti substitusi tidak merusak query string.

- [ ] **Step 5: Validasi sintaks JS**

Run:
```bash
node --check js/script.js && node --check js/careers.js && echo "JS OK"
```
Expected: `JS OK`. Ini juga membuktikan file JS tidak rusak oleh Task 2 dan Task 3.

- [ ] **Step 6: Pastikan JS tidak pernah disubstitusi**

Run: `grep -c 'company-directory.js' js/script.js`
Expected: 1. Komentar internal modul GSAP harus utuh.

- [ ] **Step 7: Perbarui `README.txt`**

Di `README.txt`, ganti paragraf kedua dan ketiga:

Dari:
```
11 halaman HTML: Beranda, Tentang Kami, Layanan, Berita, Perusahaan Kami, Karir, Kontak, Lamar, dan 3 detail lowongan.
Semua halaman menggunakan style.css dan script.js yang sama, dengan stylesheet tambahan pada halaman tertentu. Aset tersimpan di assets/.
script.js mencakup interaksi halaman dan library animasi GSAP beserta lisensinya.
```

Jadi:
```
11 halaman HTML: Beranda, Tentang Kami, Layanan, Berita, Perusahaan Kami, Karir, Kontak, Lamar, dan 3 detail lowongan.
Struktur folder: index.html berada di root, 10 halaman lainnya di pages/, seluruh stylesheet di css/, seluruh JavaScript di js/, dan aset di assets/.
Semua halaman menggunakan css/style.css dan js/script.js yang sama, dengan stylesheet tambahan pada halaman tertentu.
js/script.js mencakup interaksi halaman dan library animasi GSAP beserta lisensinya. Jalankan perkakas verifikasi dengan: node tools/audit-paths.mjs
```

- [ ] **Step 8: Jalankan audit sekali lagi setelah README berubah**

Run: `node tools/audit-paths.mjs`
Expected: `broken 0`, exit code 0.

## Task 6: Bersihkan dan serahkan checklist manual

**Files:**
- Delete: `tools/rewrite-paths.mjs`

**Interfaces:**
- Consumes: Task 5 yang sudah hijau.
- Produces: repo tanpa skrip sekali pakai, dan daftar verifikasi manual untuk pengguna.

`tools/audit-paths.mjs` sengaja **dipertahankan** sebagai oracle regresi untuk restrukturisasi berikutnya.

- [ ] **Step 1: Hapus skrip rewrite**

Run: `rm tools/rewrite-paths.mjs && ls -1 tools/`
Expected: hanya `audit-paths.mjs`.

- [ ] **Step 2: Tampilkan struktur akhir**

Run: `ls -1R | head -60`
Expected: root hanya berisi `index.html`, folder `assets/`, `css/`, `docs/`, `js/`, `pages/`, `tools/`, dan `README.txt`.

- [ ] **Step 3: Audit penutup**

Run: `node tools/audit-paths.mjs`
Expected: `broken 0`, exit code 0.

- [ ] **Step 4: Serahkan checklist visual ke pengguna**

Tool browser tidak terhubung di sesi ini, jadi 11 halaman harus diperiksa manual. Bunyikan checklist ini ke pengguna:

```
Buka http://localhost/CompanyProfile/BMA_Company_Profile/ lalu cek:
1. Beranda memuat tanpa gambar rusak (icon gambar rusak di hero).
2. Semua link navbar dan footer berpindah halaman dengan benar.
3. Buka tentang-kami.html, layanan.html, berita.html, perusahaan-kami.html,
   kari.html, kontak.html, lamar.html, dan 3 halaman lowongan — semua harus
   tampil dengan style dan font yang sama seperti sebelumnya.
4. Di perusahaan-kami.html: grid 3 kolom, animasi stagger GSAP saat scroll,
   filter kategori dan pencarian tetap bekerja.
5. Di kari.html: filter lowongan dan animasi GSAP tambahan careers.js jalan.
6. Formulir kontak di kontak.html dan lamar.html masih berfungsi.
7. Console browser harus bersih, tanpa error 404.
```