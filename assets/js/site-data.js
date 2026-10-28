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
  title: "Berkat Maritim Abadi",
  description: "Mitra strategis pertambangan dan logistik.",
  posterDesktop: "assets/images/company/home-hero-fullhd-poster-1920.webp",
  posterMobile: "assets/images/company/home-hero-fullhd-poster-800.webp",
  video: [{ src: "assets/videos/bma-hero-fullhd-v2.mp4" }],
  position: "center",
  mobilePosition: "74% center",
  overlayOpacity: 0.9,
};
