// =============================================================
// PENGATURAN SITUS — satu-satunya tempat untuk identitas perusahaan.
// Dipakai tools/layout.mjs untuk membuat navbar & footer di SEMUA halaman.
// Setelah mengubah file ini jalankan:  npm run build
// Teks boleh berisi HTML entity (mis. &amp;).
// =============================================================

export const site = {
  // Nama resmi (alt logo, aria-label, hak cipta).
  name: "PT Berkat Maritim Abadi",

  // Logo (path dari folder assets/). Lebar/tinggi = ukuran asli file.
  logo: {
    light: { src: "logo/bma-logo-white.webp", width: 398, height: 160 }, // di atas foto / latar gelap
    dark: { src: "logo/bma-logo-color.webp", width: 398, height: 160 }, // latar terang (setelah scroll)
    footer: {
      src: "logo/bma-logo-footer.webp",
      width: 795,
      height: 409,
      alt: "PT Berkat Maritim Abadi — Member of Growin Group",
    },
  },

  // Navbar utama, urut tampil. key harus ada di `pages` di bawah.
  menu: [
    ["home", "Beranda"],
    ["about", "Tentang Kami"],
    ["services", "Layanan"],
    ["news", "Berita"],
    ["careers", "Karier"],
    ["contact", "Kontak"],
  ],

  // File halaman untuk setiap key menu.
  pages: {
    home: "index.html",
    about: "about.html",
    services: "services.html",
    news: "news.html",
    careers: "karir.html",
    contact: "contact.html",
  },

  // Halaman turunan yang menyorot menu induknya (pola nama file -> key menu).
  activeParents: [
    [/^(karir|lamar|lowongan-)/, "careers"],
    [/^berita-/, "news"],
  ],

  // Teks kecil di menu mobile.
  menuNote: "PT Berkat Maritim Abadi · Jasa Pertambangan &amp; Bongkar Muat",

  // Tombol bahasa (tampilan saja). Set false untuk menyembunyikan.
  languageSwitch: true,

  footer: {
    description: "Mitra strategis pertambangan dan logistik sejak 2013. Mendukung kegiatan pertambangan, pengangkutan hasil tambang, dan bongkar muat batu bara.",
    // Kolom tautan: judul + daftar [key menu, label].
    columns: [
      { id: "footerLinks", title: "Perusahaan", links: [["about", "Tentang Kami"], ["news", "Berita"]] },
      {
        id: "footerPages",
        title: "Layanan dan Karier",
        links: [["services", "Layanan"], ["careers", "Karier"]],
        recruitEmail: "karir@growingroup.id",
      },
    ],
    bottomNote: "Pratinjau situs · Berita dan lowongan merupakan materi contoh",
  },

  contact: {
    address: "Jl. Lodan Raya No. 01, Ancol, Pademangan, Jakarta Utara 14430",
    email: "info@growingroup.id",
    phone: { label: "+62 812-8222-858", tel: "+628128222858" },
  },

  // Media sosial: ganti "#" dengan URL resmi. sample: true = diberi label "tautan contoh".
  social: [
    { icon: "linkedin", label: "LinkedIn", url: "#", sample: true },
    { icon: "instagram", label: "Instagram", url: "#", sample: true },
    { icon: "youtube", label: "YouTube", url: "#", sample: true },
  ],
};
