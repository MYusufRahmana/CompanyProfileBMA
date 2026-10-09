# Prompt — Section Site Operasional pada Halaman Beranda

## Konteks Project

Buat section baru pada **halaman Beranda** company profile perusahaan.

Teknologi existing:

```text
HTML
CSS
JavaScript
```

Section ini akan menampilkan lokasi/site operasional perusahaan dengan konsep visual seperti company profile perusahaan tambang/coal yang memiliki peta interaktif.

Site perusahaan:

```text
1. Banjarmasin
2. Kelanis
3. Benao
```

IMPORTANT:

- Section ini harus ditempatkan di halaman **Beranda**.
- Jangan membuat halaman terpisah sebagai halaman utama fitur ini.
- Jangan rebuild seluruh website.
- Pertahankan navbar, footer, design system, warna, typography, spacing, dan struktur existing.
- Gunakan desain original yang hanya terinspirasi dari reference layout.
- Jangan menyalin aset, teks, foto, atau branding perusahaan lain.
- Jangan membuat informasi operasional fiktif.

---

# 1. Tujuan

Buat section:

```text
Site Operasional
```

pada halaman:

```text
Beranda
```

dengan konsep:

```text
LEFT
→ Peta Kalimantan + marker site

RIGHT
→ Detail site aktif
→ Deskripsi
→ Tombol Lebih Lanjut
→ Galeri
```

User dapat memilih:

```text
Banjarmasin
Kelanis
Benao
```

melalui marker pada peta.

Ketika marker dipilih:

```text
judul
deskripsi
link
galeri
active marker
```

harus berubah secara dinamis tanpa reload halaman.

---

# 2. Posisi pada Halaman Beranda

Tambahkan section ini pada halaman Beranda existing.

Recommended placement:

```text
Hero
↓
Profil Singkat / Tentang Perusahaan
↓
Layanan / Bisnis
↓
SITE OPERASIONAL
↓
Berita
↓
Perusahaan Kami / Group
↓
Footer
```

Jika struktur Beranda existing berbeda:

ikuti flow existing.

Tempatkan Site Operasional pada posisi yang paling logis,
idealnya setelah section company/business overview
dan sebelum Berita.

Jangan memindahkan section existing secara agresif.

---

# 3. ID Section

Gunakan semantic section:

```html
<section id="site-operasional">
```

atau naming yang sesuai architecture existing.

Ini berguna untuk:

```text
anchor navigation
SEO
future internal link
```

---

# 4. Desktop Layout

Pada desktop gunakan approximately:

```text
50% map
50% content
```

Concept:

```text
┌────────────────────────────┬───────────────────────────────┐
│                            │                               │
│                            │  KELANIS                      │
│      MAP KALIMANTAN        │                               │
│                            │  Deskripsi site...            │
│   ● Banjarmasin            │                               │
│        ● Kelanis           │  [ Lebih Lanjut ]            │
│      ● Benao               │                               │
│                            │  GALERI                       │
│                            │                               │
│                            │  [img][img][img][img]   < >   │
│                            │                               │
└────────────────────────────┴───────────────────────────────┘
```

Recommended section height:

```text
650px – 800px
```

sesuaikan dengan layout existing.

---

# 5. Section Heading

Tambahkan heading kecil/eyebrow:

```text
SITE OPERASIONAL
```

Optional heading utama:

```text
Lokasi Operasional Kami
```

atau cukup:

```text
Site Operasional
```

Gunakan bahasa Indonesia karena seluruh company profile menggunakan bahasa Indonesia.

---

# 6. Map

Jangan menggunakan Google Maps untuk visual utama ini.

Recommended:

```text
SVG map Kalimantan
```

Alternative:

```text
transparent PNG
```

SVG lebih disarankan karena:

```text
tajam
responsive
ringan
mudah diberi marker
mudah dikustomisasi
```

---

# 7. Map Container

Gunakan:

```css
.site-map {
    position: relative;
}
```

Map harus responsive.

Recommended:

```css
.site-map img,
.site-map svg {
    width: 100%;
    height: auto;
    display: block;
}
```

Jangan membuat peta terdistorsi.

---

# 8. Marker Site

Buat marker untuk:

```text
Banjarmasin
Kelanis
Benao
```

Marker berupa button agar accessible.

Example:

```html
<button
    class="site-marker"
    data-site="kelanis"
    aria-label="Tampilkan Site Kelanis"
></button>
```

---

# 9. Posisi Marker

Marker harus menggunakan:

```text
left: percentage
top: percentage
```

relative terhadap container peta.

Example hanya struktur:

```css
.site-marker--banjarmasin {
    left: 42%;
    top: 72%;
}

.site-marker--kelanis {
    left: 55%;
    top: 48%;
}

.site-marker--benao {
    left: 38%;
    top: 35%;
}
```

IMPORTANT:

Angka di atas hanya contoh.

Jangan menganggap posisi tersebut sebagai koordinat geografis yang benar.

Buat position config mudah diubah setelah titik resmi/site final tersedia.

---

# 10. Marker Style

Inactive:

```text
white / neutral
```

Active:

```text
company orange
```

Jika menggunakan brand PT Berkat Maritim Abadi:

```text
Orange     #FC7108
Dark Gray  #4B4D4F
White      #FFFFFF
Black      #000000
```

Active marker boleh:

```text
lebih besar sedikit
subtle shadow
subtle pulse
```

Jangan gunakan animasi berlebihan.

---

# 11. Active Marker Label

Marker aktif menampilkan label seperti:

```text
Kelanis
```

Style:

```text
white background
rounded pill
dark text
small shadow
orange accent
```

Label mengikuti marker aktif.

---

# 12. Default Site

Set default active site:

```text
Kelanis
```

Namun struktur harus mudah diubah bila site lain nantinya ingin menjadi default.

Saat halaman Beranda pertama kali dibuka:

```text
Kelanis sudah aktif
detail Kelanis tampil
galeri Kelanis tampil
```

---

# 13. Site Data

Gunakan data-driven JavaScript.

Recommended:

```js
const sites = {
    banjarmasin: {
        name: "Banjarmasin",
        description: "Deskripsi resmi Site Banjarmasin.",
        link: "#",
        images: [
            "assets/images/sites/banjarmasin/01.jpg",
            "assets/images/sites/banjarmasin/02.jpg",
            "assets/images/sites/banjarmasin/03.jpg"
        ]
    },

    kelanis: {
        name: "Kelanis",
        description: "Deskripsi resmi Site Kelanis.",
        link: "#",
        images: [
            "assets/images/sites/kelanis/01.jpg",
            "assets/images/sites/kelanis/02.jpg",
            "assets/images/sites/kelanis/03.jpg"
        ]
    },

    benao: {
        name: "Benao",
        description: "Deskripsi resmi Site Benao.",
        link: "#",
        images: [
            "assets/images/sites/benao/01.jpg",
            "assets/images/sites/benao/02.jpg",
            "assets/images/sites/benao/03.jpg"
        ]
    }
};
```

Jangan membuat click handler dengan content hardcoded satu per satu.

---

# 14. JavaScript Function

Gunakan satu function:

```js
setActiveSite(siteKey)
```

Function bertanggung jawab untuk:

```text
update active marker
update label
update title
update description
update detail link
update gallery
```

---

# 15. Detail Panel

Panel kanan harus memiliki:

```text
Site Name
Description
Lebih Lanjut
Gallery
```

Example:

```text
Kelanis

Kelanis merupakan salah satu area operasional
perusahaan ...

[ Lebih Lanjut ]

GALERI

[ image ] [ image ] [ image ] [ image ]
```

---

# 16. Title Style

Recommended desktop:

```text
font-size: 44px – 56px
font-weight: 700
```

Gunakan typography existing.

Jangan oversized.

---

# 17. Description

Gunakan:

```text
line-height: 1.6 – 1.8
```

Batasi lebar paragraf agar mudah dibaca.

Jangan mengisi deskripsi fiktif.

Jika content resmi belum ada, gunakan placeholder yang mudah diganti.

Example:

```text
Deskripsi Site Kelanis akan ditambahkan berdasarkan
informasi resmi perusahaan.
```

---

# 18. Tombol Lebih Lanjut

Tambahkan button/link:

```text
Lebih Lanjut
```

Gunakan company accent.

Recommended:

```text
orange background
white text
rounded / pill
subtle hover
```

Link harus berasal dari site data.

Jika detail page belum tersedia:

gunakan placeholder link yang jelas
atau disable sementara tanpa broken URL.

---

# 19. Future Detail Page

Siapkan data agar nantinya dapat diarahkan ke:

```text
site-banjarmasin.html
site-kelanis.html
site-benao.html
```

atau routing project existing.

Tetapi task ini fokus pada:

```text
section Beranda
```

Jangan wajib membuat detail page sekarang.

---

# 20. Gallery

Di bawah informasi site:

```text
GALERI
```

Tampilkan approximately:

```text
3–4 images desktop
```

Gunakan:

```text
rounded corner
consistent aspect ratio
object-fit: cover
```

---

# 21. Gallery Navigation

Tambahkan control:

```text
<   >
```

Gunakan button circular kecil.

Implement horizontal scroll:

```js
galleryTrack.scrollBy({
    left: amount,
    behavior: "smooth"
});
```

Tidak perlu library carousel jika tidak ada library existing.

---

# 22. Gallery Berdasarkan Site

Ketika:

```text
Kelanis active
```

hanya tampilkan gallery Kelanis.

Ketika:

```text
Banjarmasin active
```

gallery berubah ke Banjarmasin.

Begitu juga:

```text
Benao
```

---

# 23. Content Transition

Saat site berubah:

gunakan animasi subtle:

```text
opacity
translateY
```

Recommended:

```text
200–350ms
```

Jangan animasi lambat.

---

# 24. Marker Transition

Saat site berubah:

```text
old marker
→ inactive

new marker
→ active
```

Active marker dapat:

```text
scale(1.08 – 1.12)
```

No excessive bouncing.

---

# 25. Background Section

Buat background clean.

Optional:

subtle topographic contour pattern.

Opacity:

```text
0.04 – 0.08
```

Pattern tidak boleh mengganggu content.

---

# 26. Mining / Industrial Visual Direction

Target visual:

```text
premium
corporate
industrial
mining
coal
modern
clean
professional
```

Avoid:

```text
generic Bootstrap look
too many cards
heavy gradient
large shadow
excessive animation
```

---

# 27. Responsive Tablet

Tablet boleh menjadi:

```text
45% map
55% content
```

atau stack jika space tidak cukup.

Marker tetap menggunakan percentage positioning.

---

# 28. Mobile Layout

Mobile:

```text
SITE OPERASIONAL

[ Peta Kalimantan ]

[ Banjarmasin ]
[ Kelanis ]
[ Benao ]

Kelanis

Description...

[ Lebih Lanjut ]

GALERI

[ img ] [ img ]
```

Jangan memaksakan desktop split layout.

---

# 29. Mobile Site Selector

Tambahkan button/tab:

```text
Banjarmasin
Kelanis
Benao
```

di bawah map pada mobile.

Tab menjalankan function yang sama:

```js
setActiveSite(siteKey)
```

---

# 30. Accessibility

Marker:

```text
button
```

bukan hanya div.

Tambahkan:

```text
aria-label
focus state
keyboard support
```

Gallery navigation juga harus button.

---

# 31. Image Alt

Gunakan descriptive alt.

Example:

```text
Area operasional Kelanis
Area operasional Banjarmasin
Area operasional Benao
```

Jangan:

```text
image1
img2
```

---

# 32. SEO

Gunakan semantic HTML:

```text
section
h2
h3
p
a
button
```

Penting:

teks site harus berupa DOM text,
bukan tertanam dalam image.

---

# 33. Recommended Asset Structure

```text
assets/
└── images/
    └── sites/
        ├── map/
        │   └── kalimantan.svg
        │
        ├── banjarmasin/
        │   ├── 01.jpg
        │   ├── 02.jpg
        │   └── 03.jpg
        │
        ├── kelanis/
        │   ├── 01.jpg
        │   ├── 02.jpg
        │   └── 03.jpg
        │
        └── benao/
            ├── 01.jpg
            ├── 02.jpg
            └── 03.jpg
```

Jika project memiliki folder asset berbeda:

ikuti structure existing.

---

# 34. Recommended CSS Classes

```text
.home-sites
.home-sites__container

.site-map-column
.site-map
.site-map__image

.site-marker
.site-marker--active
.site-marker__label

.site-content
.site-content__title
.site-content__description
.site-content__button

.site-gallery
.site-gallery__header
.site-gallery__track
.site-gallery__item
.site-gallery__navigation
```

---

# 35. Recommended JavaScript

Concept:

```js
const sites = {...};

let activeSite = 'kelanis';

function setActiveSite(siteKey) {
    const site = sites[siteKey];

    updateMarkers(siteKey);
    updateContent(site);
    updateGallery(site);
}
```

Jaga function tetap simple.

---

# 36. Jangan Buat Duplicate Content Block

Jangan buat:

```text
#banjarmasin-content
#kelanis-content
#benao-content
```

dengan tiga section besar yang di-hide/show.

Gunakan satu dynamic content panel.

---

# 37. Performance

Gunakan optimized image jika tersedia:

```text
WebP
AVIF
```

Tambahkan:

```html
loading="lazy"
```

untuk gallery image yang tidak langsung dibutuhkan.

Jangan lazy load main map jika section langsung terlihat cukup awal.

---

# 38. Jangan Install Dependency Tidak Perlu

Untuk functionality ini cukup gunakan:

```text
HTML
CSS
JavaScript
```

Jika project existing menggunakan GSAP,
boleh gunakan GSAP hanya untuk subtle content transition.

Tetapi jangan install:

```text
Swiper
GSAP
jQuery
```

hanya untuk section ini jika belum tersedia.

---

# 39. Jika GSAP Sudah Ada

Jika company profile existing sudah menggunakan GSAP:

boleh gunakan:

```text
GSAP
```

untuk:

```text
content fade
marker activation
gallery entrance
section reveal
```

Jangan menggunakan complex pinned animation.

Interaction harus tetap cepat.

---

# 40. Reference Screenshot

Gunakan screenshot yang diberikan user
hanya sebagai reference untuk:

```text
layout
map + content split
marker concept
gallery positioning
overall composition
```

Jangan copy:

```text
exact map asset
exact text
exact icons
exact images
exact visual identity
```

---

# 41. Data Content Rule

Site perusahaan:

```text
Banjarmasin
Kelanis
Benao
```

Jangan invent:

```text
alamat detail
koordinat
luas tambang
jumlah produksi
cadangan batu bara
kapasitas
jarak
pelabuhan
hauling route
operational statistics
```

Jika tidak tersedia dalam project/user input:

gunakan placeholder.

---

# 42. Initial Placeholder Content

Boleh sementara:

```text
Banjarmasin
Informasi mengenai Site Banjarmasin akan ditampilkan
berdasarkan data resmi perusahaan.

Kelanis
Informasi mengenai Site Kelanis akan ditampilkan
berdasarkan data resmi perusahaan.

Benao
Informasi mengenai Site Benao akan ditampilkan
berdasarkan data resmi perusahaan.
```

Buat content mudah diganti nantinya.

---

# 43. Home Page Integration

IMPORTANT:

Jangan membuat file halaman Beranda baru
jika halaman existing sudah ada.

Cari existing home page:

```text
index.html
home.html
beranda.html
atau equivalent
```

Tambahkan section ke page tersebut.

Pertahankan:

```text
navbar
hero
other sections
footer
scripts
SEO metadata
```

---

# 44. Existing CSS Integration

Jangan membuat styling yang konflik dengan existing CSS.

Audit terlebih dahulu:

```text
container
section spacing
button
heading
color variables
breakpoints
```

Reuse existing CSS variables jika tersedia.

---

# 45. Existing JavaScript Integration

Jangan membuat global variable conflict.

Jika project memakai:

```js
DOMContentLoaded
```

integrasikan dengan existing script.

Jika code modular:

ikuti architecture existing.

---

# 46. Section Spacing

Recommended:

desktop:

```text
padding-top: 80px – 120px
padding-bottom: 80px – 120px
```

Tablet/mobile:

lebih kecil.

Ikuti section spacing existing.

---

# 47. Main Content Stability

Interaction antar-site tidak boleh menyebabkan:

```text
page jump
layout shift besar
section height berubah ekstrem
```

Gunakan reasonable min-height pada content panel
jika description berbeda panjang.

---

# 48. Hover State

Marker hover:

```text
slightly scale
orange highlight
cursor pointer
```

Gallery:

```text
subtle image zoom
```

Button:

```text
small translate
```

Keep subtle.

---

# 49. Active State

Pastikan user langsung tahu site mana yang aktif.

Gunakan kombinasi:

```text
orange marker
site label
title panel
```

Jangan hanya mengandalkan perubahan kecil warna yang tidak jelas.

---

# 50. No Full Map Library

Tidak perlu:

```text
Google Maps API
Leaflet
Mapbox
OpenStreetMap JS
```

untuk layout ini.

Ini adalah:

```text
interactive illustration map
```

bukan geographic navigation map.

---

# 51. Future Extensibility

Buat agar site baru dapat ditambahkan cukup dengan:

```js
sites.newSite = {...}
```

plus marker config.

Jangan hardcode jumlah site = 3 di seluruh code.

---

# 52. Empty Gallery Fallback

Jika satu site belum memiliki foto:

jangan tampilkan broken image.

Tampilkan:

```text
Galeri belum tersedia.
```

atau placeholder existing.

---

# 53. Broken Image Handling

Jika image gagal load:

hide broken item
atau gunakan project placeholder.

Jangan tampilkan icon broken image browser.

---

# 54. Gallery Image Ratio

Recommended:

```css
aspect-ratio: 4 / 3;
object-fit: cover;
```

atau ratio existing.

Jaga semua cards seragam.

---

# 55. QA Desktop

Test:

```text
1920px
1440px
1366px
1280px
```

Pastikan:

```text
map tidak terlalu besar
text tidak terlalu sempit
gallery tidak terpotong secara buruk
marker tetap di lokasi relatif
```

---

# 56. QA Tablet

Test:

```text
1024px
768px
```

Pastikan:

```text
layout tidak overlap
marker tetap click-able
content readable
```

---

# 57. QA Mobile

Test:

```text
430px
390px
375px
```

Pastikan:

```text
map tidak overflow
site selector usable
gallery horizontal navigation usable
text readable
```

---

# 58. Functional Test

Test:

```text
Click Banjarmasin
→ Banjarmasin active

Click Kelanis
→ Kelanis active

Click Benao
→ Benao active
```

Check:

```text
title
description
button
gallery
marker
label
```

semuanya update.

---

# 59. Regression Test

Setelah section selesai:

test kembali:

```text
Navbar
Hero Slider
Tentang
Layanan
Berita
Our Company
Footer
Responsive navigation
existing animation
```

Tidak boleh rusak.

---

# 60. Acceptance Criteria

Task selesai ketika:

- [ ] Site Operasional tampil di halaman Beranda.
- [ ] Tidak dibuat sebagai halaman utama terpisah.
- [ ] Peta Kalimantan tampil.
- [ ] Marker Banjarmasin tersedia.
- [ ] Marker Kelanis tersedia.
- [ ] Marker Benao tersedia.
- [ ] Default site aktif.
- [ ] Marker dapat diklik.
- [ ] Active marker jelas.
- [ ] Judul berubah sesuai site.
- [ ] Deskripsi berubah sesuai site.
- [ ] Tombol Lebih Lanjut mengikuti site.
- [ ] Gallery berubah sesuai site.
- [ ] Gallery navigation bekerja.
- [ ] Tidak reload halaman saat site berubah.
- [ ] Desktop layout clean.
- [ ] Mobile layout clean.
- [ ] Marker responsive.
- [ ] Tidak ada horizontal overflow.
- [ ] Existing Beranda tidak rusak.
- [ ] Navbar tidak berubah.
- [ ] Footer tidak berubah.
- [ ] Tidak ada informasi operasional fiktif.
- [ ] Tidak ada dependency baru yang tidak diperlukan.

---

# 61. Final Expected Flow

```text
BERANDA
│
├── Hero
│
├── Tentang / Profil
│
├── Layanan
│
│
├── SITE OPERASIONAL
│   │
│   ├── MAP KALIMANTAN
│   │   ├── Banjarmasin
│   │   ├── Kelanis
│   │   └── Benao
│   │
│   └── SITE DETAIL
│       ├── Nama Site
│       ├── Deskripsi
│       ├── Lebih Lanjut
│       └── Galeri
│
├── Berita
├── Our Company
└── Footer
```

---

# 62. Final Principle

Target section adalah:

```text
interactive
clean
premium
mining-oriented
responsive
easy to maintain
```

Buat section ini terasa sebagai bagian alami dari halaman Beranda,
bukan komponen tambahan yang terlihat terpisah dari design system website.
