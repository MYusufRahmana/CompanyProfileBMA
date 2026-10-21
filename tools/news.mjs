// Membuat halaman detail berita pages/berita-<slug>.html dari content/news.mjs.
// Run: node tools/news.mjs   (lalu header/footer/ikon tetap disinkronkan oleh tools/layout.mjs)
// Struktur halaman = calon partial Blade: resources/views/news/show.blade.php.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { header, footer, icon, iconSprite } from "./layout.mjs";
import { news } from "../content/news.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const base = "../";
const img = (p) => `${base}assets/images/${p}`;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fileOf = (item) => `berita-${item.slug}.html`;

const readingMinutes = (item) => {
  const text = [item.lead, ...item.sections.flatMap((s) => [s.heading, ...s.paragraphs]), ...item.highlights].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
};

// Kartu berita: markup sama dengan pages/news.html agar gaya .news-tile dipakai ulang.
const tile = (item) => `            <article class="news-tile" data-category="${esc(item.category)}">
              <div class="news-tile-media">
                <img src="${img(item.image.small)}" alt="" width="640" height="427" loading="lazy" decoding="async" />
                <span class="news-tile-category">${esc(item.category)}</span>
              </div>
              <div class="news-tile-body">
                <p class="news-tile-meta">${icon("calendar")}<time datetime="${item.date}">${esc(item.dateLabel)}</time></p>
                <h3><a class="stretched-link" href="${fileOf(item)}">${esc(item.title)}</a></h3>
                <p>${esc(item.excerpt)}</p>
                <span class="more-indicator" aria-hidden="true">Baca Selengkapnya <span class="icon-circle">${icon("arrow-right")}</span></span>
              </div>
            </article>`;

// Berita terkait: kategori sama dulu, lalu yang terbaru; maksimal 3.
const related = (item) =>
  [...news.filter((n) => n !== item && n.category === item.category), ...news.filter((n) => n !== item && n.category !== item.category)].slice(0, 3);

const figure = (f) => `            <figure class="article-figure">
              <img src="${img(f.large)}" srcset="${img(f.small)} 640w, ${img(f.large)} 1200w" sizes="(max-width: 960px) 100vw, 720px" alt="${esc(f.alt)}" width="1200" height="800" loading="lazy" decoding="async" />
              <figcaption>${esc(f.caption)}</figcaption>
            </figure>`;

const page = (item, i) => {
  const newer = news[i - 1];
  const older = news[i + 1];
  const minutes = readingMinutes(item);
  const body = item.sections
    .map((s, idx) => {
      const block = `            <h2>${esc(s.heading)}</h2>\n` + s.paragraphs.map((p) => `            <p>${esc(p)}</p>`).join("\n");
      return idx === 0 && item.figure ? block + "\n" + figure(item.figure) : block;
    })
    .join("\n");
  const pager = [
    newer
      ? `            <a class="article-pager__link" href="${fileOf(newer)}"><span>${icon("arrow-left")} Berita lebih baru</span><strong>${esc(newer.title)}</strong></a>`
      : `            <span class="article-pager__link is-empty" aria-hidden="true"></span>`,
    older
      ? `            <a class="article-pager__link article-pager__link--next" href="${fileOf(older)}"><span>Berita lebih lama ${icon("arrow-right")}</span><strong>${esc(older.title)}</strong></a>`
      : `            <span class="article-pager__link is-empty" aria-hidden="true"></span>`,
  ].join("\n");

  return `<!doctype html>
<html lang="id" class="no-js">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(item.title)} · Berita | BMA</title>
    <meta name="description" content="${esc(item.excerpt)}" />
    <meta name="theme-color" content="#171C20" />
    <meta name="robots" content="index, follow" />
    <meta property="og:type" content="article" />
    <meta property="og:locale" content="id_ID" />
    <meta property="og:site_name" content="PT Berkat Maritim Abadi" />
    <meta property="og:title" content="${esc(item.title)}" />
    <meta property="og:description" content="${esc(item.excerpt)}" />
    <meta property="og:image" content="${img(item.image.large)}" />
    <meta property="article:published_time" content="${item.date}" />
    <meta property="article:section" content="${esc(item.category)}" />
    <link rel="icon" type="image/png" sizes="32x32" href="${base}assets/icons/favicon-32.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="${base}assets/icons/favicon-192.png" />
    <link rel="apple-touch-icon" href="${base}assets/icons/apple-touch-icon.png" />
    <link rel="preload" href="${base}assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="${base}assets/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="stylesheet" href="${base}assets/css/style.css" />
    <link rel="stylesheet" href="${base}assets/css/brand-heroes.css" />
    <link rel="stylesheet" href="${base}assets/css/components.css" />
    <link rel="stylesheet" href="${base}assets/css/pages.css" />
  </head>

  <body class="page-news page-article">
    <!-- icons:start -->
    ${iconSprite()}
    <!-- icons:end -->
    <a class="skip-link" href="#mainContent">Langsung ke konten</a>
    <!-- Header: dibuat oleh tools/layout.mjs -->
    ${header("berita-" + item.slug, base)}

    <!-- Dibuat oleh tools/news.mjs dari content/news.mjs — jangan edit manual. -->
    <main id="mainContent" tabindex="-1">
      <section class="page-banner page-banner--simple page-banner--article" aria-labelledby="pageTitle">
        <img class="page-banner-photo" src="${img(item.image.large)}" srcset="${img(item.image.small)} 640w, ${img(item.image.large)} 1200w" sizes="100vw" alt="" width="1200" height="800" fetchpriority="high" decoding="async" />
        <div class="container page-banner-content">
          <p class="article-meta-top"><span class="article-chip">${esc(item.category)}</span><span>${icon("calendar")}<time datetime="${item.date}">${esc(item.dateLabel)}</time></span><span>${icon("clock")}${minutes} menit baca</span></p>
          <h1 id="pageTitle">${esc(item.title)}</h1>
          <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../index.html">Beranda</a><span aria-hidden="true">/</span><a href="news.html">Berita</a><span aria-hidden="true">/</span><span aria-current="page">${esc(item.category)}</span></nav>
        </div>
      </section>

      <section class="section article-section">
        <div class="container article-layout">
          <article class="article-content" aria-labelledby="pageTitle">
            <p class="article-lead">${esc(item.lead)}</p>
${body}
            <aside class="article-highlights" aria-labelledby="highlightsTitle">
              <h2 id="highlightsTitle">Poin Penting</h2>
              <ul>
${item.highlights.map((h) => `                <li>${icon("check")}<span>${esc(h)}</span></li>`).join("\n")}
              </ul>
            </aside>
            <p class="article-sample-note">Konten contoh untuk tata letak · foto ilustrasi. Ganti dengan berita resmi dan dokumentasi kegiatan yang telah diverifikasi.</p>
            <nav class="article-pager" aria-label="Berita lainnya">
${pager}
            </nav>
          </article>

          <aside class="article-aside" aria-label="Info dan bagikan berita">
            <div class="article-aside__card">
              <h2 class="article-aside__title">Info Berita</h2>
              <dl class="article-facts">
                <div><dt>Kategori</dt><dd>${esc(item.category)}</dd></div>
                <div><dt>Tanggal</dt><dd><time datetime="${item.date}">${esc(item.dateLabel)}</time></dd></div>
                <div><dt>Waktu baca</dt><dd>${minutes} menit</dd></div>
              </dl>
              <h2 class="article-aside__title">Bagikan</h2>
              <div class="article-share" data-share-title="${esc(item.title)}">
                <a class="article-share__btn" data-share="whatsapp" href="https://wa.me/?text=${encodeURIComponent(item.title)}" target="_blank" rel="noopener" aria-label="Bagikan ke WhatsApp">${icon("whatsapp")}</a>
                <a class="article-share__btn" data-share="linkedin" href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="Bagikan ke LinkedIn">${icon("linkedin")}</a>
                <a class="article-share__btn" data-share="email" href="mailto:?subject=${encodeURIComponent(item.title)}" aria-label="Bagikan lewat email">${icon("mail")}</a>
                <button class="article-share__btn" type="button" data-copy-link aria-label="Salin tautan berita">${icon("link")}</button>
              </div>
              <p class="article-share__status" role="status" aria-live="polite"></p>
              <a class="article-back" href="news.html">${icon("arrow-left")} Semua berita</a>
            </div>
          </aside>
        </div>
      </section>

      <section class="section bg-light related-news" aria-labelledby="relatedTitle">
        <div class="container">
          <div class="section-heading">
            <div>
              <p class="section-kicker">Berita Lainnya</p>
              <h2 id="relatedTitle">Berita Terkait</h2>
            </div>
            <a class="btn btn-outline-dark" href="news.html">Lihat Semua Berita ${icon("arrow-right")}</a>
          </div>
          <div class="news-tiles">
${related(item).map(tile).join("\n")}
          </div>
        </div>
      </section>
    </main>

    <!-- Footer: dibuat oleh tools/layout.mjs -->
    ${footer("berita-" + item.slug, base)}
    <script src="${base}assets/js/script.js" defer></script>
  </body>
</html>
`;
};

// Hapus halaman berita lama yang slug-nya sudah tidak ada di data.
const keep = new Set(news.map(fileOf));
for (const f of fs.readdirSync(path.join(root, "pages"))) {
  if (/^berita-.+\.html$/.test(f) && !keep.has(f)) {
    fs.unlinkSync(path.join(root, "pages", f));
    console.log(`pages/${f}`.padEnd(44), "removed");
  }
}
news.forEach((item, i) => {
  const file = path.join(root, "pages", fileOf(item));
  const html = page(item, i);
  const before = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  if (html !== before) fs.writeFileSync(file, html);
  console.log(`pages/${fileOf(item)}`.padEnd(44), html !== before ? "written" : "unchanged");
});
