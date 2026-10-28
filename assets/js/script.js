/* BMA — JavaScript bersama. Tanpa build atau framework. */
document.documentElement.classList.replace("no-js", "js");

/* ===== animations/navigation.js ===== */
window.BMA = window.BMA || {};

window.BMA.navigation = ({ motion, listen }) => {
  const header = document.getElementById("siteHeader");
  const menu = document.getElementById("navMenu");
  const toggle = document.getElementById("menuToggle");
  const mobile = matchMedia("(max-width: 960px)");
  const links = [...menu.querySelectorAll("a")];
  const focusables = () =>
    [toggle, ...menu.querySelectorAll("a, button")].filter(
      (el) => el.getClientRects().length,
    );
  let opened = false;
  let frame;
  const sync = () => {
    header.classList.toggle("scrolled", scrollY > 30);
    frame = null;
  };
  const setOpen = (value, restoreFocus = true) => {
    opened = value && mobile.matches;
    menu.classList.toggle("open", opened);
    header.classList.toggle("menu-open", opened);
    toggle.classList.toggle("active", opened);
    toggle.setAttribute("aria-expanded", String(opened));
    toggle.setAttribute("aria-label", opened ? "Tutup menu" : "Buka menu");
    document.body.classList.toggle("menu-is-open", opened);
    menu.inert = mobile.matches && !opened;
    document.querySelector("main").inert = opened;
    document.querySelector("footer").inert = opened;
    if (opened) {
      requestAnimationFrame(() => links[0].focus({ preventScroll: true }));
    } else {
      if (restoreFocus && mobile.matches) toggle.focus({ preventScroll: true });
    }
  };
  listen(toggle, "click", () => setOpen(!opened));
  links.forEach((link) => listen(link, "click", () => setOpen(false, false)));
  listen(document, "keydown", (event) => {
    if (!opened) return;
    if (event.key === "Escape") setOpen(false);
    if (event.key === "Tab") {
      const items = focusables();
      const index = items.indexOf(document.activeElement);
      if (event.shiftKey && index <= 0) {
        event.preventDefault();
        items.at(-1).focus();
      } else if (!event.shiftKey && index === items.length - 1) {
        event.preventDefault();
        toggle.focus();
      }
    }
  });
  listen(mobile, "change", () => setOpen(false, false));
  listen(motion, "change", () => {
    if (opened) setOpen(true, false);
  });
  listen(
    window,
    "scroll",
    () => {
      if (!frame) frame = requestAnimationFrame(sync);
    },
    { passive: true },
  );
  setOpen(false, false);
  sync();
  // Homepage section navigation; dedicated page links retain their page states.
  const sections = [...menu.querySelectorAll('.nav-link[href^="#"]')]
    .map((link) => ({
      link,
      section: document.querySelector(link.getAttribute("href")),
    }))
    .filter((item) => item.section);
  const updateActive = () => {
    const active =
      [...sections]
        .reverse()
        .find(
          (item) =>
            item.section.getBoundingClientRect().top <= innerHeight * 0.4,
        ) || sections[0];
    sections.forEach((item) => {
      item.link.classList.toggle("active", item === active);
      if (item === active) item.link.setAttribute("aria-current", "location");
      else item.link.removeAttribute("aria-current");
    });
  };
  let activeFrame;
  if (sections.length) {
    listen(
      window,
      "scroll",
      () => {
        cancelAnimationFrame(activeFrame);
        activeFrame = requestAnimationFrame(updateActive);
      },
      { passive: true },
    );
    updateActive();
  }
  return () => {
    cancelAnimationFrame(frame);
    cancelAnimationFrame(activeFrame);
  };
};

/* ===== sections/hero.js ===== */
window.BMA = window.BMA || {};

window.BMA.hero = () => {
  const hero = document.getElementById("home");
  if (!hero) return () => {};
  const config = window.BMA_HERO || {};
  const title = hero.querySelector("#heroTitle");
  const description = hero.querySelector("#heroDescription");
  const photo = hero.querySelector(".hero__photo img");
  const source = hero.querySelector(".hero__photo source");
  const video = hero.querySelector("#heroVideo");
  const toggle = hero.querySelector("#heroVideoToggle");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

  if (config.title && title) title.textContent = config.title;
  if (config.description && description) description.textContent = config.description;
  if (photo && config.posterDesktop) photo.src = config.posterDesktop;
  if (source && config.posterMobile) source.srcset = config.posterMobile;
  if (config.position) hero.style.setProperty("--pos", config.position);
  if (config.mobilePosition) hero.style.setProperty("--pos-mobile", config.mobilePosition);
  if (Number.isFinite(config.overlayOpacity))
    hero.style.setProperty("--hero-overlay", Math.min(0.9, Math.max(0, config.overlayOpacity)));

  // Video latar. Poster tetap di bawahnya; video baru terlihat (memudar masuk)
  // setelah benar-benar berputar. Tidak dimuat bila gerak dikurangi atau
  // penghemat data aktif. Gagal dimuat/diblokir → poster tetap tampil.
  let observer = { disconnect() {} };
  let userPaused = false;
  let frame = 0;
  const setToggle = (paused) => {
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.setAttribute("aria-label", paused ? "Putar video latar" : "Jeda video latar");
    toggle.classList.toggle("is-paused", paused);
  };
  const fail = () => {
    hero.classList.remove("is-video-ready");
    hero.classList.add("is-video-failed");
    if (toggle) toggle.hidden = true;
  };
  const connection = navigator.connection || {};
  const saveData = connection.saveData || /(^|-)2g$/.test(connection.effectiveType || "");
  const sources = Array.isArray(config.video) ? config.video : [];
  if (video && sources.length && !reduceMotion.matches && !saveData) {
    const width = window.innerWidth;
    const pick = sources.find((item) => item.maxWidth && width <= item.maxWidth) || sources[sources.length - 1];
    video.muted = true; // wajib untuk autoplay di peramban seluler
    video.addEventListener("playing", () => {
      hero.classList.add("is-video-ready");
      if (toggle) toggle.hidden = false;
      setToggle(false);
    });
    video.addEventListener("error", fail);
    video.src = pick.src;
    video.preload = "auto";
    const play = () => video.play().catch(() => {
      // Autoplay diblokir: poster tetap, tombol menawarkan putar manual.
      // Bila videonya sendiri gagal dimuat, tombol tetap disembunyikan.
      if (video.error || hero.classList.contains("is-video-failed")) return;
      if (toggle) { toggle.hidden = false; setToggle(true); userPaused = true; }
    });
    play();
    toggle?.addEventListener("click", () => {
      if (video.paused) { userPaused = false; play(); setToggle(false); }
      else { userPaused = true; video.pause(); setToggle(true); }
    });
    // Hemat baterai: jeda saat hero tidak terlihat.
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) video.pause();
        else if (!userPaused) video.play().catch(() => {});
      });
      observer.observe(hero);
    }
    reduceMotion.addEventListener?.("change", (event) => {
      if (event.matches) { userPaused = true; video.pause(); setToggle(true); }
    });

    // Cincin progres pada tombol + transisi gelap singkat di sambungan loop
    // (akhir video → awal) agar tidak terasa seperti potongan kasar.
    let looped = false;
    const tick = () => {
      const duration = video.duration;
      if (duration) {
        const time = video.currentTime;
        const left = duration - time;
        if (left < 0.45) looped = true;
        toggle?.style.setProperty("--progress", (time / duration).toFixed(4));
        hero.classList.toggle("is-loop-dip", left < 0.45 || (looped && time < 0.35));
      }
      frame = requestAnimationFrame(tick);
    };
    video.addEventListener("play", () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(tick);
    });
    video.addEventListener("pause", () => {
      cancelAnimationFrame(frame);
      hero.classList.remove("is-loop-dip");
    });
  }

  // Efek ketik pada judul. Semua huruf sudah menempati tempatnya (tersembunyi),
  // lalu ditampilkan satu per satu, jadi tata letak tidak bergeser.
  // Pembaca layar membaca judul utuh lewat aria-label.
  let typingTimer = 0;
  const text = title?.textContent.trim();
  if (title && text && !reduceMotion.matches) {
    title.setAttribute("aria-label", text);
    title.classList.add("is-typing");
    title.innerHTML = "";
    // Kata dibungkus agar pemenggalan baris tetap per kata, bukan per huruf.
    const chars = [];
    text.split(/(\s+)/).forEach((part) => {
      if (/^\s+$/.test(part)) {
        const space = document.createElement("span");
        space.className = "hero__char";
        space.setAttribute("aria-hidden", "true");
        space.textContent = " ";
        title.append(space);
        chars.push(space);
        return;
      }
      const word = document.createElement("span");
      word.className = "hero__word";
      word.setAttribute("aria-hidden", "true");
      [...part].forEach((letter) => {
        const char = document.createElement("span");
        char.className = "hero__char";
        char.textContent = letter;
        word.append(char);
        chars.push(char);
      });
      title.append(word);
    });
    let index = 0;
    const step = () => {
      chars[index - 1]?.classList.remove("is-current");
      if (index >= chars.length) {
        title.classList.replace("is-typing", "is-typed");
        return;
      }
      chars[index].classList.add("is-shown", "is-current");
      index += 1;
      typingTimer = setTimeout(step, chars[index - 1].textContent === " " ? 40 : 85);
    };
    typingTimer = setTimeout(step, 450);
  }
  return () => {
    clearTimeout(typingTimer);
    cancelAnimationFrame(frame);
    observer.disconnect();
  };
};

/* ===== animations/scroll-reveal.js ===== */
window.BMA = window.BMA || {};

// Scroll reveal with IntersectionObserver plus a light rAF parallax.
// Elements are hidden only after `.motion-ok` is set, so content stays
// readable without JavaScript and with prefers-reduced-motion.
window.BMA.scrollReveal = ({ motion, listen }) => {
  const root = document.documentElement;
  const desktop = matchMedia("(min-width: 961px)");
  const parallax = [...document.querySelectorAll("[data-parallax]")];
  const timers = new Set();
  let observer;
  let frame;

  // Shared compositions on inner pages reveal without extra markup.
  document
    .querySelectorAll(".section-heading, .news-card, .about-logo-wrap, .group-panel")
    .forEach((el) => {
      if (!el.closest("[data-reveal]")) el.dataset.reveal = "up";
    });
  // Siblings entering together are staggered.
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    const siblings = [...el.parentElement.children].filter((child) =>
      child.hasAttribute("data-reveal"),
    );
    const index = siblings.indexOf(el);
    if (index > 0) el.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 90}ms`);
  });

  const reveal = (el) => {
    el.classList.add("is-revealed");
    const delay = parseFloat(el.style.getPropertyValue("--reveal-delay")) || 0;
    // Hand the element back to its own hover transforms once the entrance ends.
    const timer = setTimeout(() => {
      el.removeAttribute("data-reveal");
      el.style.removeProperty("--reveal-delay");
      timers.delete(timer);
    }, 1000 + delay);
    timers.add(timer);
  };
  const initReveal = () => {
    observer?.disconnect();
    const targets = [...document.querySelectorAll("[data-reveal]:not(.is-revealed)")];
    if (motion.matches || !("IntersectionObserver" in window)) {
      root.classList.remove("motion-ok");
      targets.forEach((el) => el.classList.add("is-revealed"));
      return;
    }
    root.classList.add("motion-ok");
    observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          reveal(entry.target);
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    targets.forEach((el) => observer.observe(el));
  };

  const parallaxOn = () => parallax.length && desktop.matches && !motion.matches;
  const renderParallax = () => {
    frame = null;
    parallax.forEach((img) => {
      const box = img.parentElement.getBoundingClientRect();
      if (box.bottom < 0 || box.top > innerHeight) return;
      const progress =
        (box.top + box.height / 2 - innerHeight / 2) / (innerHeight / 2 + box.height / 2);
      img.style.transform = `translate3d(0, ${(progress * -8).toFixed(2)}%, 0)`;
    });
  };
  const initParallax = () => {
    if (parallaxOn()) renderParallax();
    else parallax.forEach((img) => (img.style.transform = ""));
  };
  listen(
    window,
    "scroll",
    () => {
      if (parallaxOn() && !frame) frame = requestAnimationFrame(renderParallax);
    },
    { passive: true },
  );
  listen(desktop, "change", initParallax);
  listen(motion, "change", () => {
    initReveal();
    initParallax();
  });
  initReveal();
  initParallax();
  return () => {
    observer?.disconnect();
    cancelAnimationFrame(frame);
    timers.forEach(clearTimeout);
  };
};

/* ===== script.js ===== */
document.addEventListener("DOMContentLoaded", () => {
  const cleanups = [];
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const listen = (target, event, callback, options) => {
    if (!target) return;
    target.addEventListener(event, callback, options);
    cleanups.push(() => target.removeEventListener(event, callback, options));
  };
  const runtime = { motion, listen };
  ["navigation", "hero", "scrollReveal"].forEach(
    (name) => {
      if (window.BMA?.[name]) cleanups.push(window.BMA[name](runtime));
    },
  );
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Contact form: validated in the browser only. Nothing is sent until a
  // backend is connected, and the notice says so plainly.
  const contactForm = document.getElementById("demoContactForm");
  listen(contactForm, "submit", (event) => {
    event.preventDefault();
    const status = document.getElementById("formStatus");
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      status.textContent = "";
      return;
    }
    status.innerHTML =
      '<svg class="icon" aria-hidden="true"><use href="#i-mail"/></svg><span>Pesan Anda <strong>belum terkirim</strong> karena layanan pengiriman melalui formulir belum tersedia. Silakan sampaikan pertanyaan atau kebutuhan layanan melalui email atau telepon yang tercantum.</span>';
  });
  const top = document.createElement("button");
  top.type = "button";
  top.className = "to-top";
  top.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-arrow-up"/></svg>';
  top.setAttribute("aria-label", "Kembali ke atas");
  document.body.append(top);
  listen(top, "click", () =>
    window.scrollTo({
      top: 0,
      behavior: motion.matches ? "instant" : "smooth",
    }),
  );
  document.querySelectorAll("[data-back-to-top]").forEach((button) =>
    listen(button, "click", () =>
      window.scrollTo({ top: 0, behavior: motion.matches ? "instant" : "smooth" }),
    ),
  );
  const updateTop = () => top.classList.toggle("show", scrollY > 600);
  listen(window, "scroll", updateTop, { passive: true });
  updateTop();
  // No SPA lifecycle: release observers and GSAP contexts on real page disposal.
  // A bfcache page retains its state; visibility listeners handle suspension.
  listen(window, "pagehide", (event) => {
    if (!event.persisted)
      cleanups
        .splice(0)
        .reverse()
        .forEach((dispose) => dispose?.());
  });
});

// Interaksi halaman berita, karir, dan kontak.
// Pagination bersama untuk daftar berita dan tabel lowongan: menampilkan
// `items` yang cocok per halaman dan membuat tombol halaman di `pager`.
window.BMA.paginate = ({ all, matches, pager, perPage, page, onChange }) => {
  const pages = Math.max(1, Math.ceil(matches.length / perPage));
  const current = Math.min(page, pages);
  const visible = new Set(matches.slice((current - 1) * perPage, current * perPage));
  all.forEach((item) => (item.hidden = !visible.has(item)));
  if (pager) {
    pager.hidden = pages < 2;
    pager.replaceChildren();
    const button = (label, target, attrs = {}) => {
      const el = document.createElement("button");
      el.type = "button";
      el.innerHTML = label;
      el.disabled = target < 1 || target > pages;
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      el.addEventListener("click", () => onChange(target));
      return el;
    };
    const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
    if (pages > 1)
      pager.append(
        button(icon("arrow-left"), current - 1, { "aria-label": "Halaman sebelumnya" }),
        ...Array.from({ length: pages }, (_, i) =>
          button(String(i + 1), i + 1, {
            "aria-label": "Halaman " + (i + 1),
            ...(i + 1 === current ? { "aria-current": "page" } : {}),
          }),
        ),
        button(icon("arrow-right"), current + 1, { "aria-label": "Halaman berikutnya" }),
      );
  }
  return { page: current, pages };
};

document.addEventListener("DOMContentLoaded", () => {
  const normalize = (value) => value.toLocaleLowerCase("id").trim();
  const news = document.querySelector("#newsList");
  if (news) {
    let category = "all";
    const tabs = [...document.querySelectorAll("[data-news-category]")];
    const cards = [...news.children];
    let page = 1;
    // Filter kategori memilih berita; pagination menampilkan enam per halaman.
    const filter = (resetPage = true) => {
      if (resetPage) page = 1;
      const matches = cards.filter(
        (card) =>
          category === "all" || card.dataset.category === category,
      );
      const result = window.BMA.paginate({
        all: cards,
        matches,
        pager: document.querySelector("#newsPagination"),
        perPage: 6,
        page,
        onChange: (target) => {
          page = target;
          filter(false);
          news.scrollIntoView({ block: "start" });
        },
      });
      page = result.page;
      const count = matches.length;
      document.querySelector("#newsCount").textContent =
        count + " artikel ditemukan" + (result.pages > 1 ? " · halaman " + page + " dari " + result.pages : "");
      document.querySelector("#newsEmpty").hidden = count !== 0;
      tabs.forEach((tab) =>
        tab.setAttribute(
          "aria-pressed",
          String(tab.dataset.newsCategory === category),
        ),
      );
    };
    tabs.forEach((tab) =>
      tab.addEventListener("click", () => {
        category = tab.dataset.newsCategory;
        filter();
      }),
    );
    document
      .querySelector("[data-reset-news]")
      .addEventListener("click", () => {
        category = "all";
        filter();
        tabs.find((tab) => tab.dataset.newsCategory === "all")?.focus();
      });
    filter();
  }
  // Detail berita: tautan bagikan memakai alamat halaman saat ini + tombol salin tautan.
  const share = document.querySelector(".article-share");
  if (share) {
    const url = location.href.split("#")[0];
    const title = share.dataset.shareTitle || document.title;
    const links = {
      whatsapp: "https://wa.me/?text=" + encodeURIComponent(title + " " + url),
      linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url),
      email: "mailto:?subject=" + encodeURIComponent(title) + "&body=" + encodeURIComponent(url),
    };
    share.querySelectorAll("[data-share]").forEach((link) => {
      if (links[link.dataset.share]) link.href = links[link.dataset.share];
    });
    const status = document.querySelector(".article-share__status");
    share.querySelector("[data-copy-link]")?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(url);
        status.textContent = "Tautan berita disalin.";
      } catch {
        status.textContent = "Salin tautan dari bilah alamat browser.";
      }
      clearTimeout(share.statusTimer);
      share.statusTimer = setTimeout(() => (status.textContent = ""), 3000);
    });
  }
  // Tabel lowongan: filter kata kunci, departemen, lokasi + pagination.
  const jobTable = document.querySelector("#jobTable");
  if (jobTable) {
    const rows = [...jobTable.tBodies[0].rows];
    const search = document.querySelector("#jobSearch");
    const selects = {
      department: document.querySelector("#jobDepartment"),
      location: document.querySelector("#jobLocation"),
    };
    const wrapper = jobTable.closest(".table-scroll");
    let page = 1;
    const filter = (resetPage = true) => {
      if (resetPage) page = 1;
      const matches = rows.filter(
        (row) =>
          Object.entries(selects).every(
            ([key, select]) => select.value === "all" || row.dataset[key] === select.value,
          ) && normalize(row.textContent).includes(normalize(search.value)),
      );
      // Penomoran mengikuti hasil yang tampil.
      matches.forEach((row, i) => (row.querySelector("[data-no]").textContent = i + 1));
      const result = window.BMA.paginate({
        all: rows,
        matches,
        pager: document.querySelector("#jobPagination"),
        perPage: 6,
        page,
        onChange: (target) => {
          page = target;
          filter(false);
          wrapper.scrollIntoView({ block: "nearest" });
        },
      });
      page = result.page;
      const count = document.querySelector("#jobCount");
      const strong = document.createElement("strong");
      strong.textContent = matches.length;
      count.replaceChildren(
        strong,
        " lowongan ditemukan" +
          (result.pages > 1 ? " · halaman " + page + " dari " + result.pages : ""),
      );
      // Tombol atur ulang di samping jumlah hanya muncul saat ada filter aktif.
      const active =
        search.value.trim() !== "" || Object.values(selects).some((select) => select.value !== "all");
      const metaReset = document.querySelector(".jobs-meta [data-reset-jobs]");
      if (metaReset) metaReset.hidden = !active;
      document.querySelector("#jobEmpty").hidden = matches.length !== 0;
      wrapper.hidden = matches.length === 0;
    };
    search.addEventListener("input", () => filter());
    Object.values(selects).forEach((select) => select.addEventListener("change", () => filter()));
    document.querySelectorAll("[data-reset-jobs]").forEach((button) =>
      button.addEventListener("click", () => {
        search.value = "";
        Object.values(selects).forEach((select) => (select.value = "all"));
        filter();
        search.focus();
      }),
    );
    filter();
  }
  const form = document.querySelector("#demoContactForm");
  if (form) {
    const service = form.elements.service;
    const requested = new URLSearchParams(window.location.search).get(
      "layanan",
    );
    if (
      service &&
      [...service.options].some((option) => option.value === requested)
    )
      service.value = requested;
    const message = form.querySelector("textarea");
    const counter = document.querySelector("#messageCount");
    if (message && counter) {
      const update = () =>
        (counter.textContent = message.value.length + " / 2000 karakter");
      message.addEventListener("input", update);
      update();
    }
  }
});


// Formulir lamaran frontend: tidak mengirim data atau menyimpan CV.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#applicationForm');
  if (!form) return;
  const jobs = [["operator-excavator","Operator Excavator","Produksi","Kutai Kartanegara, Kalimantan Timur","Kontrak"],["hse-officer","HSE Officer","K3 & Lingkungan","Kutai Kartanegara, Kalimantan Timur","Penuh waktu"],["logistics-coordinator","Koordinator Logistik","Logistik","Tanah Bumbu, Kalimantan Selatan","Penuh waktu"],["foreman-produksi","Foreman Produksi Coal Getting","Produksi","Kutai Kartanegara, Kalimantan Timur","Penuh waktu"],["mekanik-alat-berat","Mekanik Alat Berat","Plant & Maintenance","Tanah Bumbu, Kalimantan Selatan","Kontrak"]];
  // Rincian posisi untuk panel kiri formulir (teks sama dengan halaman lowongan;
  // posisi tanpa halaman detail menampilkan catatan bahwa rincian belum tersedia).
  const jobDetails = {
    "operator-excavator": {
      "tasks": [
        "Mengoperasikan excavator untuk penggalian dan pemuatan batu bara.",
        "Melakukan pemeriksaan unit sebelum dan sesudah shift (P2H).",
        "Menjaga kualitas pemuatan dan meminimalkan pencampuran material.",
        "Berkomunikasi dengan pengemudi dump truck dan pengawas melalui radio.",
        "Melaporkan kondisi unit dan kejadian di area kerja."
      ],
      "requirements": [
        "Pendidikan minimal SMA/SMK sederajat.",
        "Memiliki SIO/SIMPER excavator yang masih berlaku.",
        "Pengalaman minimal 2 tahun sebagai operator excavator di tambang.",
        "Memahami prosedur keselamatan kerja di area tambang.",
        "Bersedia bekerja dengan sistem shift dan ditempatkan di site."
      ],
      "page": "lowongan-operator-excavator.html"
    },
    "hse-officer": {
      "tasks": [
        "Melaksanakan inspeksi area kerja dan memantau kepatuhan prosedur keselamatan.",
        "Menyusun identifikasi bahaya dan penilaian risiko bersama tim lapangan.",
        "Mendukung briefing keselamatan, induksi keselamatan, dan simulasi tanggap darurat.",
        "Mencatat temuan, menyusun laporan K3, serta memantau tindakan perbaikan."
      ],
      "requirements": [
        "Pendidikan D3/S1 bidang K3, teknik, atau bidang terkait.",
        "Pengalaman 2–3 tahun dalam fungsi K3 di lingkungan tambang atau industri.",
        "Memahami identifikasi risiko, pelaporan insiden, dan prosedur tanggap darurat.",
        "Mampu berkomunikasi dengan tim lintas fungsi dan bersedia ditempatkan di site."
      ],
      "page": "lowongan-hse-officer.html"
    },
    "logistics-coordinator": {
      "tasks": [
        "Mengoordinasikan permintaan material dan suku cadang dari tim site.",
        "Mengelola administrasi gudang dan pencatatan stok.",
        "Berkoordinasi dengan pemasok dan tim pengadaan.",
        "Memantau pengiriman kebutuhan ke site sesuai jadwal."
      ],
      "requirements": [
        "Pendidikan D3/S1 bidang logistik, manajemen, atau terkait.",
        "Pengalaman 2–3 tahun di bidang logistik atau pergudangan.",
        "Terbiasa menggunakan aplikasi pengolah data (spreadsheet).",
        "Teliti, komunikatif, dan bersedia ditempatkan di site."
      ],
      "page": "lowongan-logistics-coordinator.html"
    },
    "foreman-produksi": {},
    "mekanik-alat-berat": {}
  };
  const position = form.elements.position;
  const syncPosition = () => {
    const job = jobs.find(job => job[0] === position.value);
    document.querySelector('#applicationJob').textContent = job ? job[1] : 'Pilih posisi Anda';
    document.querySelector('#applicationLocation').textContent = job ? job[3] + ' · ' + job[2] : 'Pilih salah satu lowongan pada formulir.';
    const type = document.querySelector('#applicationType');
    if (type) type.textContent = job ? job[4] + ' · Penempatan di site' : 'Penempatan di site';
    renderJobDetail(job ? jobDetails[job[0]] : null);
  };
  const renderJobDetail = (detail) => {
    const panel = document.querySelector('#applicationDetail');
    if (!panel) return;
    panel.hidden = !detail;
    if (!detail) return;
    const list = (selector, items) => {
      const ul = document.querySelector(selector);
      ul.replaceChildren(...(items || []).map(text => {
        const li = document.createElement('li');
        li.textContent = text;
        return li;
      }));
      ul.closest('section').hidden = !items?.length;
    };
    list('#applicationTasks', detail.tasks);
    list('#applicationRequirements', detail.requirements);
    document.querySelector('#applicationDetailEmpty').hidden = Boolean(detail.tasks?.length);
    const link = document.querySelector('#applicationJobLink');
    link.hidden = !detail.page;
    if (detail.page) link.href = detail.page;
  };
  const requested = new URLSearchParams(location.search).get('posisi');
  if (jobs.some(job => job[0] === requested)) position.value = requested;
  position.addEventListener('change', syncPosition); syncPosition();
  const input = document.querySelector('#cvFile');
  const error = document.querySelector('#cvError');
  const selected = document.querySelector('#cvSelected');
  const zone = document.querySelector('#cvDropzone');
  let cv = null;
  const choose = file => {
    cv = null; selected.hidden = true; error.textContent = ''; input.setCustomValidity('');
    if (!file) return;
    let message = '';
    if (!/\.pdf$/i.test(file.name) || (file.type && file.type !== 'application/pdf')) message = 'Gunakan berkas CV berformat PDF.';
    else if (file.size === 0) message = 'Berkas kosong. Pilih CV yang berisi dokumen.';
    else if (file.size > 5 * 1024 * 1024) message = 'Ukuran CV melebihi 5 MB. Pilih berkas yang lebih kecil.';
    if (message) {input.value = ''; error.textContent = message; input.setCustomValidity(message); return;}
    cv = file; selected.hidden = false;
    document.querySelector('#cvName').textContent = file.name;
    document.querySelector('#cvSize').textContent = (file.size / 1024 / 1024).toFixed(2) + ' MB · Siap untuk simulasi';
  };
  input.addEventListener('change', () => choose(input.files[0]));
  document.querySelector('#cvRemove').addEventListener('click', () => {input.value = ''; choose(null); input.focus();});
  ['dragenter', 'dragover'].forEach(type => zone.addEventListener(type, event => {event.preventDefault(); zone.classList.add('dragover');}));
  ['dragleave', 'drop'].forEach(type => zone.addEventListener(type, event => {event.preventDefault(); zone.classList.remove('dragover');}));
  zone.addEventListener('drop', event => {
    const files = event.dataTransfer.files;
    if (files.length !== 1) {error.textContent = 'Pilih satu berkas CV saja.'; return;}
    input.files = files; choose(files[0]);
  });
  const success = document.querySelector('#applicationSuccess');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!cv || !form.reportValidity()) return;
    const job = jobs.find(job => job[0] === position.value);
    document.querySelector('#applicationSummary').textContent = form.elements.fullName.value.trim() + ', formulir Anda untuk posisi ' + job[1] + ' telah lolos validasi di browser.';
    form.hidden = true; success.hidden = false; success.focus(); success.scrollIntoView({block:'start'});
  });
  document.querySelector('#editApplication').addEventListener('click', () => {success.hidden = true; form.hidden = false; form.elements.fullName.focus();});
});

// Navigasi layanan: tandai layanan yang sedang dibaca.
document.addEventListener("DOMContentLoaded", () => {
  const links = [...document.querySelectorAll(".service-nav a[href^='#']")];
  if (!links.length || !("IntersectionObserver" in window)) return;
  const byId = new Map(links.map((link) => [link.hash.slice(1), link]));
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.removeAttribute("aria-current"));
        const link = byId.get(entry.target.id);
        link?.setAttribute("aria-current", "true");
        // Keep the active chip visible by scrolling the chip row only — never the page.
        const row = link?.parentElement.parentElement;
        if (row && row.scrollWidth > row.clientWidth)
          row.scrollTo({ left: link.offsetLeft - 16, behavior: "smooth" });
      }),
    { rootMargin: "-45% 0px -50% 0px" },
  );
  byId.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
});

// Sejarah perusahaan: sumbu terisi warna saat halaman digulir, setiap milestone masuk saat terlihat,
// dan titik milestone yang sudah dilewati tetap menyala. Tanpa JavaScript atau dengan
// prefers-reduced-motion, semua milestone langsung tampil.
document.addEventListener("DOMContentLoaded", () => {
  const timeline = document.querySelector("[data-history]");
  if (!timeline) return;
  const steps = [...timeline.querySelectorAll(".history-step")];
  const dots = steps.map((step) => step.querySelector(".history-dot"));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    timeline.style.setProperty("--history-progress", 1);
    steps.forEach((step) => step.classList.add("is-visible", "is-passed"));
    return;
  }
  let frame = 0;
  const measure = () => {
    frame = 0;
    const anchor = window.innerHeight * 0.62;
    const rect = timeline.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (anchor - rect.top) / Math.max(rect.height, 1)));
    timeline.style.setProperty("--history-progress", progress);
    dots.forEach((dot, index) =>
      steps[index].classList.toggle("is-passed", !!dot && dot.getBoundingClientRect().top <= anchor),
    );
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(measure);
  };
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }),
    { rootMargin: "0px 0px -12% 0px", threshold: 0.2 },
  );
  steps.forEach((step) => observer.observe(step));
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  measure();
});
