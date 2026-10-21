/* =============================================================
   DATA BERANDA — ubah isi hero dan site operasional di sini.
   Dimuat sebelum js/script.js (hanya di index.html).
   ============================================================= */

/* ----- Hero (slide foto + teks) ----- */
// Konfigurasi hero Beranda. Ubah nilai di sini untuk mengganti tampilan,
// tanpa menyentuh HTML/CSS.
// - desktopImage / mobileImage : path foto (mobile opsional, layar ≤ 680px)
// - position / mobilePosition  : titik fokus foto (nilai CSS object-position)
// - foregroundImage            : OPSIONAL — PNG/WebP objek yang sudah dipotong (latar transparan),
//                                dibuat dari foto yang SAMA dan berukuran SAMA. Objek ini tampil
//                                di depan judul (efek "tulisan di belakang objek").
//   foregroundMobileImage      : versi mobile dari foreground (opsional)
// - eyebrow                    : nama singkat slide (dibacakan pembaca layar pada tombol slide)
// - description                : teks di kiri bawah hero
// - overlayOpacity             : 0 (terang) – 0.8 (gelap); bisa juga per slide.
//                                Samakan dengan --hero-overlay di css/style.css (nilai cadangan tanpa JS).
// - interval                   : jeda antarslide (ms). Satu slide = tanpa autoplay & kontrol.
window.BMA_HERO = {
  title: "Berkat Maritim Abadi",
  overlayOpacity: 0.7,
  interval: 6500,
  slides: [
    {
      desktopImage: "assets/images/company/hero-1-1480.webp",
      mobileImage: "assets/images/company/hero-1-800.webp",
      position: "center 55%",
      mobilePosition: "64% center",
      foregroundImage: "",
      eyebrow: "Partner Strategis Pertambangan dan Logistik",
      description:
        "Dengan fokus pada efisiensi operasional dan pelayanan prima, kami berkomitmen untuk menjadi mitra terpercaya dalam mendukung kelancaran aktivitas pertambangan dan pelabuhan di Indonesia.",
    },
    {
      desktopImage: "assets/images/company/hero-2-1480.webp",
      mobileImage: "assets/images/company/hero-2-800.webp",
      position: "center 45%",
      mobilePosition: "45% center",
      foregroundImage: "",
      eyebrow: "Jasa Pertambangan",
      description:
        "Overburden removal, coal getting, land clearing, crushing & stockpiling, hingga reklamasi lahan bekas tambang.",
    },
    {
      desktopImage: "assets/images/company/hero-3-1460.webp",
      mobileImage: "assets/images/company/hero-3-800.webp",
      position: "center 50%",
      mobilePosition: "62% center",
      foregroundImage: "",
      eyebrow: "Jasa Hauling & Bongkar Muat",
      description:
        "Pengangkutan hasil tambang serta bongkar muat di pelabuhan maupun dermaga khusus, hingga pemuatan di atas tongkang.",
    },
  ],
};

/* ----- Site operasional (peta + galeri) ----- */
// Data Site Operasional (Beranda). Ganti deskripsi, link, posisi, dan foto
// dengan data resmi. Posisi marker dalam persen terhadap satu peta gabungan
// dan bersifat ilustratif, bukan koordinat geografis.
// Menambah site: tambahkan satu entri di BMA_SITES; marker & tab dibuat otomatis.
window.BMA_SITE_DEFAULT = "kelanis";
window.BMA_SITE_MAPS = {
  // Peta gabungan: assets/images/maps/kalimantan-sites.svg (paintmaps.com).
  kalteng: { name: "Kalimantan Tengah" },
  kalsel: { name: "Kalimantan Selatan" },
};
window.BMA_SITES = {
  banjarmasin: {
    name: "Banjarmasin",
    map: "kalsel",
    description:
      "Kantor pusat PT Berkat Maritim Abadi berada di Banjarmasin, Kalimantan Selatan. Dari sini kami mendukung proyek jasa pertambangan dan bongkar muat di wilayah Kalimantan.",
    link: "pages/services.html", // nanti: pages/site-banjarmasin.html
    position: { x: 64.1, y: 62.5 },
    images: [
      { src: "assets/images/mining/haul-truck-640.webp", full: "assets/images/mining/haul-truck-1200.webp", caption: "armada angkut" },
      { src: "assets/images/mining/mine-site-aerial-640.webp", full: "assets/images/mining/mine-site-aerial-1200.webp", caption: "area kerja tambang" },
      { src: "assets/images/mining/hero-hauling-800.webp", full: "assets/images/mining/hero-hauling-1600.webp", caption: "jalan angkut" },
    ],
  },
  kelanis: {
    name: "Kelanis",
    map: "kalteng",
    description:
      "Informasi mengenai Site Kelanis akan ditampilkan berdasarkan data resmi perusahaan.",
    link: "pages/services.html", // nanti: pages/site-kelanis.html
    position: { x: 53.7, y: 71.5 },
    images: [
      {
        src: "assets/images/company/site-kelanis-1-640.webp",
        full: "assets/images/company/site-kelanis-1-1200.webp",
        alt: "Foto udara stockpile batu bara dan tongkang di tepi sungai, Site Kelanis",
      },
      {
        src: "assets/images/company/site-kelanis-2-640.webp",
        full: "assets/images/company/site-kelanis-2-1200.webp",
        alt: "Tim lapangan dan excavator saat pembukaan lahan, Site Kelanis",
      },
      {
        src: "assets/images/company/site-kelanis-3-640.webp",
        full: "assets/images/company/site-kelanis-3-1200.webp",
        alt: "Dua excavator bekerja di front batu bara, Site Kelanis",
      },
    ],
  },
  benao: {
    name: "Benao",
    map: "kalteng",
    description:
      "Informasi mengenai Site Benao akan ditampilkan berdasarkan data resmi perusahaan.",
    link: "pages/services.html", // nanti: pages/site-benao.html
    position: { x: 56.4, y: 46.2 },
    images: [
      { src: "assets/images/mining/overburden-removal-640.webp", full: "assets/images/mining/overburden-removal-1200.webp", caption: "pengupasan overburden" },
      { src: "assets/images/mining/equipment-support-640.webp", full: "assets/images/mining/equipment-support-1200.webp", caption: "alat berat" },
      { src: "assets/images/mining/hero-coal-getting-800.webp", full: "assets/images/mining/hero-coal-getting-1600.webp", caption: "coal getting" },
      { src: "assets/images/mining/hse-inspection-640.webp", full: "assets/images/mining/hse-inspection-1200.webp", caption: "inspeksi unit" },
    ],
  },
};
