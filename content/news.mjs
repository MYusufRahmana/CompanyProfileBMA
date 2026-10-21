// Data berita untuk halaman detail (pages/berita-<slug>.html). Jalankan `npm run build` setelah mengubah.
// Seluruh isi adalah KONTEN CONTOH untuk tata letak; ganti dengan berita resmi yang sudah diverifikasi.
// Urutan = terbaru di atas (dipakai untuk navigasi "sebelumnya/berikutnya").
//
// Field:
//   slug, category, date (YYYY-MM-DD), dateLabel, title, excerpt (ringkasan kartu & meta description)
//   image: { small, large, alt }   — foto utama (path relatif dari assets/images/)
//   lead: paragraf pembuka; sections: [{ heading, paragraphs[] }]
//   figure (opsional): { small, large, alt, caption } — foto di tengah artikel
//   highlights: poin penting (3–4 butir)

export const news = [
  {
    slug: "sinergi",
    category: "Korporat",
    date: "2026-09-20",
    dateLabel: "20 September 2026",
    title: "Memperkuat sinergi operasional untuk pertumbuhan berkelanjutan",
    excerpt: "Koordinasi antarunit menjadi langkah penting untuk menjaga kesiapan proyek dan kualitas layanan di area kerja.",
    image: { small: "mining/mine-site-aerial-640.webp", large: "mining/mine-site-aerial-1200.webp", alt: "Foto udara area kerja tambang dengan alat berat" },
    lead: "Koordinasi antarunit menjadi langkah penting untuk menjaga kesiapan proyek dan kualitas layanan di area kerja. Setiap fungsi — produksi, hauling, pemeliharaan alat, hingga logistik — bergerak dengan rencana yang sama.",
    sections: [
      {
        heading: "Satu rencana untuk seluruh tim",
        paragraphs: [
          "Rapat koordinasi rutin mempertemukan perwakilan setiap unit untuk menyamakan target harian, membahas kendala lapangan, dan menetapkan prioritas pekerjaan. Dengan informasi yang sama, keputusan dapat diambil lebih cepat dan risiko keterlambatan dapat ditekan.",
          "Pendekatan ini juga membantu tim memahami ketergantungan antarpekerjaan: kesiapan jalan tambang memengaruhi siklus angkut, sementara ketersediaan unit memengaruhi pencapaian produksi.",
        ],
      },
      {
        heading: "Kualitas layanan bagi pemilik IUP",
        paragraphs: [
          "Sinergi operasional pada akhirnya bertujuan menjaga kualitas layanan bagi mitra pemegang IUP. Laporan kemajuan yang konsisten dan komunikasi yang terbuka menjadi dasar kepercayaan dalam setiap proyek.",
        ],
      },
    ],
    figure: { small: "mining/coal-loading-640.webp", large: "mining/coal-loading-1000.webp", alt: "Excavator memuat batu bara ke dump truck", caption: "Pemuatan batu bara di front tambang (foto ilustrasi)." },
    highlights: [
      "Rapat koordinasi rutin lintas unit",
      "Target harian dan prioritas kerja yang disepakati bersama",
      "Laporan kemajuan yang konsisten untuk mitra",
    ],
  },
  {
    slug: "pendidikan",
    category: "Sosial",
    date: "2026-09-05",
    dateLabel: "5 September 2026",
    title: "Dukungan sarana belajar untuk sekolah di sekitar wilayah operasional",
    excerpt: "Contoh kegiatan sosial di bidang pendidikan: penyerahan perlengkapan belajar dan kegiatan membaca bersama siswa.",
    image: { small: "social/social-education-640.webp", large: "social/social-education-1200.webp", alt: "Siswa sekolah sedang belajar di kelas" },
    lead: "Contoh kegiatan sosial di bidang pendidikan: penyerahan perlengkapan belajar dan kegiatan membaca bersama siswa di sekolah yang berada di sekitar wilayah operasional.",
    sections: [
      {
        heading: "Belajar dengan sarana yang memadai",
        paragraphs: [
          "Perlengkapan belajar seperti buku bacaan dan alat tulis diserahkan kepada pihak sekolah untuk mendukung kegiatan belajar sehari-hari. Kebutuhan disusun bersama guru agar bantuan tepat sasaran.",
          "Kegiatan dilanjutkan dengan sesi membaca bersama untuk menumbuhkan minat baca siswa sejak dini.",
        ],
      },
      {
        heading: "Bagian dari kepedulian perusahaan",
        paragraphs: [
          "Kegiatan pendidikan menjadi salah satu bentuk kepedulian perusahaan terhadap masyarakat di sekitar wilayah kerja. Program serupa dapat dikembangkan secara berkelanjutan sesuai kebutuhan sekolah setempat.",
        ],
      },
    ],
    highlights: [
      "Penyerahan buku bacaan dan alat tulis",
      "Kebutuhan disusun bersama pihak sekolah",
      "Sesi membaca bersama siswa",
    ],
  },
  {
    slug: "keselamatan",
    category: "K3",
    date: "2026-08-28",
    dateLabel: "28 Agustus 2026",
    title: "Membangun budaya keselamatan dari setiap briefing lapangan",
    excerpt: "Tim operasional mengikuti simulasi tanggap darurat dan penyegaran prosedur keselamatan sebelum memulai aktivitas.",
    image: { small: "mining/hse-inspection-640.webp", large: "mining/hse-inspection-1200.webp", alt: "Pemeriksaan keselamatan unit angkut tambang" },
    lead: "Tim operasional mengikuti simulasi tanggap darurat dan penyegaran prosedur keselamatan sebelum memulai aktivitas. Keselamatan dibangun dari kebiasaan kecil yang dilakukan setiap hari.",
    sections: [
      {
        heading: "Briefing sebelum setiap shift",
        paragraphs: [
          "Setiap shift diawali dengan safety briefing singkat: kondisi area kerja, potensi bahaya, dan pembagian tugas disampaikan kepada seluruh pekerja. Briefing juga menjadi kesempatan untuk saling mengingatkan penggunaan alat pelindung diri.",
          "Pemeriksaan unit sebelum dioperasikan (P2H) memastikan alat berat dalam kondisi layak dan aman digunakan.",
        ],
      },
      {
        heading: "Siap menghadapi keadaan darurat",
        paragraphs: [
          "Simulasi tanggap darurat melatih alur evakuasi, komunikasi radio, dan pertolongan pertama. Latihan berkala membantu setiap orang memahami perannya ketika keadaan darurat terjadi.",
        ],
      },
    ],
    figure: { small: "mining/equipment-support-640.webp", large: "mining/equipment-support-1200.webp", alt: "Alat berat bekerja di front tambang", caption: "Unit alat berat di area kerja (foto ilustrasi)." },
    highlights: [
      "Safety briefing di awal setiap shift",
      "Pemeriksaan unit sebelum operasi (P2H)",
      "Simulasi tanggap darurat secara berkala",
      "Penggunaan alat pelindung diri yang konsisten",
    ],
  },
  {
    slug: "kesehatan",
    category: "Sosial",
    date: "2026-08-10",
    dateLabel: "10 Agustus 2026",
    title: "Pemeriksaan kesehatan bersama warga desa sekitar site",
    excerpt: "Contoh kegiatan sosial di bidang kesehatan: pemeriksaan tekanan darah dan penyuluhan hidup sehat bersama tenaga kesehatan setempat.",
    image: { small: "social/social-health-640.webp", large: "social/social-health-1200.webp", alt: "Kegiatan pemeriksaan kesehatan warga" },
    lead: "Contoh kegiatan sosial di bidang kesehatan: pemeriksaan tekanan darah dan penyuluhan hidup sehat bersama tenaga kesehatan setempat bagi warga desa di sekitar site.",
    sections: [
      {
        heading: "Pemeriksaan dan penyuluhan",
        paragraphs: [
          "Warga mendapatkan pemeriksaan kesehatan dasar seperti tekanan darah, dilanjutkan dengan penyuluhan mengenai pola hidup sehat. Kegiatan dilaksanakan bersama tenaga kesehatan setempat.",
          "Penyuluhan membahas kebiasaan sederhana yang berdampak besar: pola makan, aktivitas fisik, dan pentingnya pemeriksaan rutin.",
        ],
      },
      {
        heading: "Hubungan baik dengan masyarakat",
        paragraphs: [
          "Kegiatan kesehatan menjadi sarana mempererat hubungan dengan masyarakat sekitar wilayah operasional dan mendukung kualitas hidup warga.",
        ],
      },
    ],
    highlights: [
      "Pemeriksaan kesehatan dasar bagi warga",
      "Penyuluhan pola hidup sehat",
      "Bekerja sama dengan tenaga kesehatan setempat",
    ],
  },
  {
    slug: "maritim",
    category: "Operasional",
    date: "2026-07-12",
    dateLabel: "12 Juli 2026",
    title: "Kolaborasi hauling dan pelabuhan untuk kelancaran pengiriman",
    excerpt: "Integrasi pengangkutan, pelabuhan, dan distribusi membantu kelancaran mobilisasi kebutuhan proyek.",
    image: { small: "mining/hauling-fleet-640.webp", large: "mining/hauling-fleet-1200.webp", alt: "Armada dump truck pengangkut hasil tambang" },
    lead: "Integrasi pengangkutan, pelabuhan, dan distribusi membantu kelancaran mobilisasi kebutuhan proyek — mulai dari hauling hasil tambang hingga pemuatan di atas tongkang.",
    sections: [
      {
        heading: "Dari site ke dermaga",
        paragraphs: [
          "Jadwal hauling disusun selaras dengan jadwal pemuatan di pelabuhan atau dermaga khusus. Dengan begitu, stok di stockpile terkendali dan waktu tunggu tongkang dapat ditekan.",
          "Komunikasi antara tim hauling dan tim bongkar muat menjadi kunci agar setiap perubahan jadwal dapat segera ditindaklanjuti.",
        ],
      },
      {
        heading: "Layanan terpadu",
        paragraphs: [
          "Jasa hauling dan jasa bongkar muat yang berjalan dalam satu koordinasi membantu mitra mendapatkan proses yang lebih efisien dari hulu ke hilir.",
        ],
      },
    ],
    figure: { small: "logistics/cargo-ship-800.webp", large: "logistics/cargo-ship-1600.webp", alt: "Kapal kargo di laut", caption: "Pengiriman melalui jalur laut (foto ilustrasi)." },
    highlights: [
      "Jadwal hauling selaras dengan jadwal pemuatan",
      "Stok stockpile terkendali",
      "Koordinasi tim hauling dan bongkar muat",
    ],
  },
  {
    slug: "overburden",
    category: "Operasional",
    date: "2026-06-05",
    dateLabel: "5 Juni 2026",
    title: "Penyesuaian rencana pengupasan overburden menjelang musim hujan",
    excerpt: "Pengaturan drainase dan urutan kerja disiapkan agar aktivitas tetap aman ketika curah hujan meningkat.",
    image: { small: "mining/overburden-removal-640.webp", large: "mining/overburden-removal-1200.webp", alt: "Excavator bekerja di area pengupasan overburden" },
    lead: "Pengaturan drainase dan urutan kerja disiapkan agar aktivitas tetap aman ketika curah hujan meningkat. Perencanaan yang matang membantu produktivitas tetap terjaga.",
    sections: [
      {
        heading: "Drainase dan jalan tambang",
        paragraphs: [
          "Saluran air dan sump diperiksa serta dibersihkan agar air hujan dapat dialirkan dengan baik. Perawatan jalan tambang juga ditingkatkan untuk menjaga keamanan unit angkut.",
          "Urutan pengupasan disesuaikan sehingga area yang rawan tergenang dapat dikerjakan lebih awal.",
        ],
      },
      {
        heading: "Keselamatan tetap utama",
        paragraphs: [
          "Ketika hujan deras, aktivitas di area tertentu dapat dihentikan sementara sesuai prosedur. Keputusan diambil bersama pengawas lapangan dengan mengutamakan keselamatan pekerja dan alat.",
        ],
      },
    ],
    figure: { small: "mining/pit-benches-1200.webp", large: "mining/pit-benches-1200.webp", alt: "Jenjang tambang terbuka", caption: "Jenjang tambang terbuka (foto ilustrasi)." },
    highlights: [
      "Pemeriksaan saluran air dan sump",
      "Perawatan jalan tambang ditingkatkan",
      "Urutan kerja disesuaikan dengan kondisi cuaca",
    ],
  },
  {
    slug: "pelatihan",
    category: "Korporat",
    date: "2026-05-18",
    dateLabel: "18 Mei 2026",
    title: "Program pelatihan operator alat berat bagi tenaga kerja lokal",
    excerpt: "Pelatihan dasar dan pendampingan lapangan untuk menyiapkan operator yang kompeten dan memahami prosedur aman.",
    image: { small: "mining/equipment-support-640.webp", large: "mining/equipment-support-1200.webp", alt: "Alat berat di area kerja tambang" },
    lead: "Pelatihan dasar dan pendampingan lapangan untuk menyiapkan operator yang kompeten dan memahami prosedur aman, dengan memberi kesempatan bagi tenaga kerja lokal.",
    sections: [
      {
        heading: "Teori dan praktik",
        paragraphs: [
          "Peserta mempelajari pengenalan unit, pemeriksaan harian, dan prosedur keselamatan sebelum berlatih langsung di bawah pendampingan operator berpengalaman.",
          "Pendampingan lapangan membantu peserta membangun kebiasaan kerja yang aman sejak awal.",
        ],
      },
      {
        heading: "Mengembangkan sumber daya manusia",
        paragraphs: [
          "Program pelatihan sejalan dengan misi perusahaan untuk meningkatkan kapasitas dan kompetensi sumber daya manusia secara berkesinambungan.",
        ],
      },
    ],
    figure: { small: "mining/coal-extraction-640.webp", large: "mining/coal-extraction-1200.webp", alt: "Excavator menggali lapisan batu bara", caption: "Operator excavator di front tambang (foto ilustrasi)." },
    highlights: [
      "Pengenalan unit dan pemeriksaan harian",
      "Praktik dengan pendampingan operator berpengalaman",
      "Kesempatan bagi tenaga kerja lokal",
    ],
  },
  {
    slug: "revegetasi",
    category: "Sosial",
    date: "2026-04-22",
    dateLabel: "22 April 2026",
    title: "Penanaman pohon bersama masyarakat di sekitar site",
    excerpt: "Contoh kegiatan kepedulian lingkungan: penanaman bibit pohon bersama warga dan pelajar setempat.",
    image: { small: "social/social-environment-640.webp", large: "social/social-environment-1200.webp", alt: "Kegiatan penanaman pohon bersama warga" },
    lead: "Contoh kegiatan kepedulian lingkungan: penanaman bibit pohon bersama warga dan pelajar setempat sebagai wujud komitmen terhadap kelestarian lingkungan.",
    sections: [
      {
        heading: "Menanam bersama",
        paragraphs: [
          "Bibit pohon ditanam bersama warga dan pelajar di lokasi yang disepakati. Kegiatan disertai pengenalan cara merawat bibit agar dapat tumbuh dengan baik.",
          "Keterlibatan masyarakat diharapkan menumbuhkan rasa memiliki terhadap lingkungan sekitar.",
        ],
      },
      {
        heading: "Komitmen Eco Green",
        paragraphs: [
          "Kegiatan ini sejalan dengan visi perusahaan untuk berkomitmen terhadap kelestarian lingkungan, termasuk reklamasi lahan bekas tambang sebagai bagian dari layanan.",
        ],
      },
    ],
    highlights: [
      "Penanaman bibit bersama warga dan pelajar",
      "Pengenalan cara merawat bibit",
      "Bagian dari komitmen kelestarian lingkungan",
    ],
  },
  {
    slug: "inspeksi-armada",
    category: "Operasional",
    date: "2026-03-10",
    dateLabel: "10 Maret 2026",
    title: "Inspeksi berkala armada angkut untuk menjaga ketersediaan unit",
    excerpt: "Pemeriksaan rutin membantu mendeteksi kerusakan lebih awal dan menjaga siklus angkut tetap lancar.",
    image: { small: "mining/haul-truck-640.webp", large: "mining/haul-truck-1200.webp", alt: "Haul truck tambang melintas di jalan angkut" },
    lead: "Pemeriksaan rutin membantu mendeteksi kerusakan lebih awal dan menjaga siklus angkut tetap lancar, sehingga target pengangkutan dapat tercapai.",
    sections: [
      {
        heading: "Deteksi dini kerusakan",
        paragraphs: [
          "Inspeksi berkala mencakup pemeriksaan ban, rem, sistem hidraulik, dan kondisi umum unit. Temuan dicatat dan ditindaklanjuti oleh tim pemeliharaan sesuai prioritas.",
          "Perawatan terjadwal mengurangi risiko unit berhenti mendadak di tengah operasi.",
        ],
      },
      {
        heading: "Siklus angkut yang lancar",
        paragraphs: [
          "Ketersediaan unit yang terjaga membantu siklus angkut berjalan stabil, dari front tambang hingga stockpile dan pelabuhan.",
        ],
      },
    ],
    figure: { small: "mining/hauling-fleet-640.webp", large: "mining/hauling-fleet-1200.webp", alt: "Armada dump truck di area tambang", caption: "Armada angkut di area tambang (foto ilustrasi)." },
    highlights: [
      "Pemeriksaan ban, rem, dan sistem hidraulik",
      "Temuan ditindaklanjuti sesuai prioritas",
      "Perawatan terjadwal untuk ketersediaan unit",
    ],
  },
];
