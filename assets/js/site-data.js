/* =============================================================
   DATA BERANDA — dimuat sebelum assets/js/script.js.
   ============================================================= */

/* ----- Hero: motion (gambar HD bergerak & berganti) dengan judul dan deskripsi ----- */
// Path relatif terhadap index.html. Slide pertama juga ditulis di index.html (tampil
// tanpa JavaScript & dimuat paling awal); samakan bila diganti.
// - slides: gambar latar. Tiap slide bergerak pelan (zoom + geser ke arah kbX/kbY),
//   lalu memudar ke slide berikutnya. position/mobilePosition = titik fokus gambar.
//   mobile: false = tidak dipakai di ponsel (gambar panorama terlalu lebar untuk layar tegak).
// - interval: lama tiap slide (ms). Animasi berhenti bila pengguna mengurangi gerak.
// - overlayOpacity: kegelapan di belakang teks, 0 (terang) hingga 0.9 (gelap).
window.BMA_HERO = {
  title: "Dari Tambang hingga Pelabuhan",
  description:
    "Mendukung kelancaran produksi dan distribusi dengan keselamatan sebagai prioritas.",
  slides: [
    { src: "assets/images/company/hero-motion-1-1475.webp", width: 1475, height: 1067, position: "40% center", mobilePosition: "34% center", kbX: "1.5%", kbY: "-1%" },
    { src: "assets/images/company/hero-motion-2-1920.webp", width: 1920, height: 720, position: "68% center", kbX: "-2%", kbY: "0%", mobile: false },
    { src: "assets/images/company/hero-motion-3-1466.webp", width: 1466, height: 1073, position: "62% center", mobilePosition: "66% center", kbX: "-1.5%", kbY: "1%" },
    { src: "assets/images/company/hero-motion-4-1920.webp", width: 1920, height: 640, position: "82% center", kbX: "-1.5%", kbY: "-0.5%", mobile: false },
  ],
  interval: 6500,
  overlayOpacity: 0.8,
};
