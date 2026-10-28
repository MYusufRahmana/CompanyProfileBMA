/* =============================================================
   DATA BERANDA — dimuat sebelum assets/js/script.js.
   ============================================================= */

/* ----- Hero: video latar dengan judul dan deskripsi ----- */
// Path relatif terhadap index.html. Samakan poster, teks, dan preload di
// index.html agar tampilan tanpa JavaScript tetap sesuai.
// - video: daftar file; yang dipakai adalah entri pertama dengan maxWidth
//   ≥ lebar layar, atau entri terakhir. Satu entri = satu video untuk semua layar.
//   Video tidak dimuat bila pengguna mengurangi animasi atau menghemat data;
//   poster tetap tampil.
// - position / mobilePosition: titik fokus video & poster (object-position).
// - overlayOpacity: kegelapan di belakang teks, 0 (terang) hingga 0.9 (gelap).
window.BMA_HERO = {
  title: "Mitra Strategis Pertambangan dan Logistik",
  description:
    "PT Berkat Maritim Abadi melayani jasa pertambangan, pengangkutan hasil tambang, dan bongkar muat batu bara di Kalimantan sejak 2013.",
  posterDesktop: "assets/images/company/home-hero-bmavidio-poster.webp",
  posterMobile: "assets/images/company/home-hero-bmavidio-poster.webp",
  // _source/BmaVidio.MP4 tanpa cuplikan ke-3 (dipotong tanpa kompres ulang; 1280 × 720, 8,7 detik, ±12 MB).
  video: [{ src: "assets/videos/BmaVidio-2cuplikan.mp4" }],
  position: "center",
  // Di ponsel video dipotong; geser fokus ke excavator.
  mobilePosition: "74% center",
  // Hanya menggelapkan sisi kiri di belakang teks; sisa video tetap terang dan tajam.
  overlayOpacity: 0.8,
};
