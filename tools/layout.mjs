// Shared layout partials (icon sprite, header, footer) for every static page.
// Run: node tools/layout.mjs
// Each partial maps to a future Blade include:
//   iconSprite() -> partials/icons.blade.php
//   header()     -> partials/header.blade.php
//   footer()     -> partials/footer.blade.php
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Line icons, 24px grid, stroke = currentColor. Several paths adapted from
// Feather (MIT) and Lucide (ISC); see README.
const icons = {
  "arrow-right": '<path d="M5 12h14M13 6l6 6-6 6"/>',
  "arrow-left": '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  "arrow-up": '<path d="M12 19V5M6 11l6-6 6 6"/>',
  "arrow-up-right": '<path d="M7 17 17 7M8 7h9v9"/>',
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  pause: '<path d="M9 5v14M15 5v14"/>',
  play: '<path d="m8 5 11 7-11 7z"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  excavator:
    '<rect x="2" y="16" width="12" height="4" rx="2"/><path d="M4 16v-5h4l2 5"/><path d="m8 11 5-6 6 4"/><path d="m19 9 2.5 4.5h-4z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12.5 9 5 9-5"/><path d="m3 16.5 9 5 9-5"/>',
  truck:
    '<path d="M2 16V9l9-2v9"/><path d="M11 10h5l3 3v3h-8"/><circle cx="6" cy="17.5" r="2"/><circle cx="16" cy="17.5" r="2"/>',
  tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/>',
  map: '<path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4z"/><path d="M8 2v16M16 6v16"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  hardhat:
    '<path d="M2 18h20"/><path d="M4 18v-3a8 8 0 0 1 16 0v3"/><path d="M10 7.3V5h4v2.3"/><path d="M9.5 18v-5M14.5 18v-5"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
  cycle:
    '<path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 21v-5h5"/><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5"/>',
  users:
    '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  phone:
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  tree: '<path d="M12 22v-5"/><path d="m12 2 7 9h-4l5 6H4l5-6H5z"/>',
  stockpile: '<path d="M2 20h20"/><path d="m4 20 5-9 3 4 3-6 5 11"/>',
  barge: '<path d="M2 20c2 1 4 1 6 0s4-1 6 0 4 1 6 0"/><path d="M3 15h18l-2 3H5z"/><path d="m6 15 3-4 3 2 3-3 3 5"/>',
  box: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/>',
  mountain: '<path d="m3 20 6-11 4 6 3-4 5 9z"/>',
  compass: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/>',
  linkedin:
    '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  instagram:
    '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>',
  youtube:
    '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><path d="m9.75 15.02 5.75-3.27-5.75-3.27z"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
};

export const iconSprite = () =>
  `<svg class="icon-sprite" xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">\n` +
  Object.entries(icons)
    .map(([id, body]) => `      <symbol id="i-${id}" viewBox="0 0 24 24">${body}</symbol>`)
    .join("\n") +
  "\n    </svg>";

export const icon = (name, cls = "icon") =>
  `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;

// page: file name without extension; base: "" for root, "../" for pages/.
// Every menu item is a real page; no in-page anchors.
const links = (page, base) => {
  const p = (file) => (page === "index" ? `pages/${file}` : file);
  return {
    home: `${base}index.html`,
    about: p("about.html"),
    services: p("services.html"),
    operations: p("operations.html"),
    social: p("sosial.html"),
    news: p("news.html"),
    companies: p("companies.html"),
    careers: p("karir.html"),
    contact: p("contact.html"),
  };
};

// Main menu items in display order. Karir is a top-level item (not a submenu).
const menu = [
  ["home", "Beranda"],
  ["about", "Tentang Kami"],
  ["services", "Layanan"],
  ["social", "Sosial"],
  ["news", "Berita"],
  ["companies", "Perusahaan Kami"],
  ["careers", "Karir"],
  ["contact", "Kontak"],
];

// Pages that are not menu items highlight their closest parent menu.
const activeKey = (page) =>
  ({
    index: "home",
    about: "about",
    services: "services",
    operations: "services",
    sosial: "social",
    news: "news",
    companies: "companies",
    contact: "contact",
  })[page] ?? (/^(karir|lamar|lowongan-)/.test(page) ? "careers" : "");

export function header(page, base) {
  const l = links(page, base);
  const active = activeKey(page);
  const items = menu
    .map(([key, label]) => {
      const current = active === key ? ' active" aria-current="page' : "";
      return `<a href="${l[key]}" class="nav-link${current}">${label}</a>`;
    })
    .join("\n          ");
  return `<header class="site-header" id="siteHeader">
      <nav class="navbar container" aria-label="Navigasi utama">
        <a class="brand" href="${l.home}" aria-label="PT Berkat Maritim Abadi — Beranda">
          <img class="brand-image" src="${base}assets/bma-logo.webp" alt="PT Berkat Maritim Abadi" width="130" height="53" /><img class="brand-wordmark-light" src="${base}assets/bma-logo.webp" alt="" aria-hidden="true" width="130" height="53" />
        </a>

        <button class="menu-toggle" id="menuToggle" type="button" aria-label="Buka menu" aria-expanded="false" aria-controls="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div class="nav-menu" id="navMenu">
          ${items}
          <div class="menu-contact">
            PT Berkat Maritim Abadi · Jasa Pertambangan Batu Bara<br /><a href="${l.contact}">Informasi kontak &amp; kerja sama ↗</a>
          </div>
        </div>
      </nav>
    </header>`;
}

export function footer(page, base) {
  const l = links(page, base);
  const li = (href, label) => `<li><a href="${href}">${label}</a></li>`;
  return `<footer class="footer">
      <div class="container footer-top">
        <div class="footer-about">
          <a class="brand footer-brand" href="${l.home}" aria-label="PT Berkat Maritim Abadi — Beranda">
            <img class="brand-image" src="${base}assets/bma-logo.webp" alt="PT Berkat Maritim Abadi" width="130" height="53" loading="lazy" /><img class="brand-wordmark-light" src="${base}assets/bma-logo.webp" alt="" aria-hidden="true" width="130" height="53" loading="lazy" />
          </a>
          <p class="footer-desc">Mitra operasional pertambangan batu bara dengan fokus pada coal getting yang aman dan efisien.</p>
          <ul class="social-links" aria-label="Media sosial (tautan contoh)">
            <li><a href="#" aria-label="LinkedIn (tautan contoh)">${icon("linkedin")}</a></li>
            <li><a href="#" aria-label="Instagram (tautan contoh)">${icon("instagram")}</a></li>
            <li><a href="#" aria-label="YouTube (tautan contoh)">${icon("youtube")}</a></li>
          </ul>
        </div>

        <nav class="footer-col" aria-labelledby="footerLinks">
          <h2 id="footerLinks">Perusahaan</h2>
          <ul>
            ${li(l.about, "Tentang Kami")}
            ${li(l.companies, "Perusahaan Kami")}
            ${li(l.social, "Sosial")}
            ${li(l.news, "Berita")}
          </ul>
        </nav>

        <nav class="footer-col" aria-labelledby="footerPages">
          <h2 id="footerPages">Layanan &amp; Karir</h2>
          <ul>
            ${li(l.services, "Layanan")}
            ${li(l.operations, "Operasional Tambang")}
            ${li(l.careers, "Karir")}
          </ul>
        </nav>

        <div class="footer-col">
          <h2>Kontak</h2>
          <ul class="footer-contact">
            <li>${icon("pin")}<span>Jakarta Utara, DKI Jakarta</span></li>
            <li>${icon("mail")}<a href="mailto:info@bma.example">info@bma.example</a></li>
            <li>${icon("phone")}<a href="tel:+62215550188">+62 21 555 0188</a></li>
          </ul>
        </div>
      </div>

      <div class="container footer-bottom">
        <span>© <span id="year"></span> PT Berkat Maritim Abadi. Hak cipta dilindungi.</span>
        <span>Pratinjau desain · data kontak dan konten masih contoh</span>
      </div>
    </footer>`;
}

// Replace header, footer and sprite in every page; content between them is untouched.
function sync() {
  const files = ["index.html", ...fs.readdirSync(path.join(root, "pages")).filter((f) => f.endsWith(".html")).map((f) => `pages/${f}`)];
  for (const rel of files) {
    const file = path.join(root, rel);
    const page = path.basename(rel, ".html");
    const base = rel.startsWith("pages/") ? "../" : "";
    let html = fs.readFileSync(file, "utf8");
    const before = html;
    html = html.replace(/<header class="site-header"[\s\S]*?<\/header>/, () => header(page, base));
    html = html.replace(/<footer class="footer">[\s\S]*?<\/footer>/, () => footer(page, base));
    html = html.replace(/\s*<!-- icons:start -->[\s\S]*?<!-- icons:end -->/, "");
    html = html.replace(/(<body[^>]*>)/, `$1\n    <!-- icons:start -->\n    ${iconSprite()}\n    <!-- icons:end -->`);
    html = html.replace(/<meta name="theme-color" content="[^"]*"/, '<meta name="theme-color" content="#171C20"');
    if (html !== before) fs.writeFileSync(file, html);
    console.log(`${rel.padEnd(44)} ${html !== before ? "updated" : "unchanged"}`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) sync();
