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

window.BMA.hero = ({ motion, listen }) => {
  const hero = document.getElementById("home");
  const stage = document.getElementById("heroSlider");
  if (!hero || !stage) return () => {};
  const config = window.BMA_HERO || {};
  const slides = (config.slides || []).filter((slide) => slide && slide.desktopImage);
  const media = document.getElementById("heroMedia");
  const foreground = document.getElementById("heroForeground");
  const title = document.getElementById("heroTitle");
  const description = document.getElementById("heroDescription");
  const controls = document.getElementById("heroControls");
  const dotsWrap = document.getElementById("heroDots");
  const number = document.getElementById("slideNumber");
  const total = document.getElementById("slideTotal");
  const pause = document.getElementById("heroPause");
  const nextButton = document.getElementById("heroNext");
  const interval = Math.max(3000, Number(config.interval) || 6500);
  const pad = (n) => String(n).padStart(2, "0");
  const reasons = new Set();
  let current = 0;
  let manuallyPaused = motion.matches;
  let timer;
  let textTimer;
  let pointerX;
  let pointerY;

  // Overlay & judul dari konfigurasi.
  const setOverlay = (value) => {
    if (value !== undefined && value !== null && value !== "")
      hero.style.setProperty("--hero-overlay", Math.min(0.9, Math.max(0, Number(value))));
  };
  setOverlay(config.overlayOpacity);
  if (config.title) {
    // Baris judul diatur eksplisit agar nama perusahaan tetap utuh dan terbaca.
    const lines = config.titleLines?.length ? config.titleLines : [config.title];
    title.replaceChildren(
      ...lines.flatMap((line, i) => {
        const span = document.createElement("span");
        span.className = "hero__word";
        span.textContent = line;
        return i ? [document.createTextNode(" "), span] : [span];
      }),
    );
  }

  // Pertahankan skala CSS; perkecil hanya jika satu baris melebihi area teks.
  const fitTitle = () => {
    hero.style.removeProperty("--hero-title-size");
    const size = parseFloat(getComputedStyle(title).fontSize);
    const available = title.clientWidth;
    const widest = Math.max(0, ...[...title.children].map((line) => line.scrollWidth));
    if (widest > available && available > 0)
      hero.style.setProperty("--hero-title-size", size * (available / widest) * 0.99 + "px");
  };

  // Foto per slide. Foto pertama di HTML dipakai ulang bila sama (tanpa kedip).
  const layer = (className, desktop, mobileSrc, slide, lazy) => {
    const picture = document.createElement("picture");
    picture.className = className;
    const source = document.createElement("source");
    source.media = "(max-width: 680px)";
    const img = document.createElement("img");
    img.alt = className === "hero__photo" ? slide.alt || "" : "";
    img.decoding = "async";
    img.width = 1600;
    img.height = 1067;
    img.style.setProperty("--pos", slide.position || "center");
    img.style.setProperty("--pos-mobile", slide.mobilePosition || slide.position || "center");
    picture.append(source, img);
    picture.load = () => {
      if (img.getAttribute("src")) return;
      if (mobileSrc) source.srcset = mobileSrc;
      else source.remove();
      img.src = desktop;
    };
    if (!lazy) picture.load();
    return picture;
  };
  const staticPhoto = media.querySelector(".hero__photo");
  const photos = slides.map((slide, i) => {
    const staticImg = staticPhoto?.querySelector("img");
    if (i === 0 && staticImg?.getAttribute("src") === slide.desktopImage) {
      staticImg.style.setProperty("--pos", slide.position || "center");
      staticImg.style.setProperty("--pos-mobile", slide.mobilePosition || slide.position || "center");
      if (slide.alt) staticImg.alt = slide.alt;
      staticPhoto.load = () => {};
      return staticPhoto;
    }
    const picture = layer("hero__photo", slide.desktopImage, slide.mobileImage, slide, i !== 0);
    if (i === 0) picture.querySelector("img").fetchPriority = "high";
    return picture;
  });
  if (photos.length) media.replaceChildren(...photos);

  // Lapisan objek opsional di atas foto. Slide tanpa foreground dilewati.
  const cutouts = slides.map((slide) =>
    slide.foregroundImage
      ? layer("hero__cutout", slide.foregroundImage, slide.foregroundMobileImage, slide, true)
      : null,
  );
  foreground?.replaceChildren(...cutouts.filter(Boolean));

  // Indikator dan kontrol hanya untuk lebih dari satu slide.
  const multi = photos.length > 1;
  const dots = slides.map((slide, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "hero__dot";
    dot.setAttribute("aria-label", `Tayangan ${i + 1}${slide.eyebrow ? ": " + slide.eyebrow : ""}`);
    listen(dot, "click", () => show(i));
    dotsWrap.append(dot);
    return dot;
  });
  controls.hidden = !multi;
  total.textContent = pad(Math.max(1, photos.length));

  const updateNextLabel = () => {
    if (!multi) return;
    const next = slides[(current + 1) % slides.length];
    nextButton.setAttribute("aria-label", `Tayangan berikutnya${next.eyebrow ? ": " + next.eyebrow : ""}`);
  };

  const canPlay = () => multi && !manuallyPaused && !motion.matches && !reasons.size && !document.hidden;
  const resetProgress = (full) => {
    dots.forEach((dot) => {
      dot.style.setProperty("--dur", "0s");
      dot.style.setProperty("--progress", full && dot === dots[current] ? "1" : "0");
    });
  };
  const start = () => {
    clearTimeout(timer);
    resetProgress(!canPlay());
    if (!canPlay()) return;
    const dot = dots[current];
    void dot.offsetWidth; // mulai ulang transisi bar dari nol
    dot.style.setProperty("--dur", interval + "ms");
    dot.style.setProperty("--progress", "1");
    timer = setTimeout(() => show(current + 1), interval);
    photos[(current + 1) % photos.length].load(); // siapkan foto berikutnya
    cutouts[(current + 1) % cutouts.length]?.load();
  };
  const hold = (reason, value) => {
    if (value) reasons.add(reason);
    else reasons.delete(reason);
    start();
  };

  const applyText = (slide) => {
    if (description && slide.description) description.textContent = slide.description;
    setOverlay(slide.overlayOpacity ?? config.overlayOpacity);
  };

  function show(index, initial = false) {
    if (!photos.length) return;
    const next = (index + photos.length) % photos.length;
    if (next === current && !initial) return;
    current = next;
    photos[next].load();
    cutouts[next]?.load();
    photos.forEach((photo, i) => photo.classList.toggle("is-active", i === next));
    cutouts.forEach((cutout, i) => cutout?.classList.toggle("is-active", i === next));
    dots.forEach((dot, i) => dot.setAttribute("aria-pressed", String(i === next)));
    number.textContent = pad(next + 1);
    updateNextLabel();
    clearTimeout(textTimer);
    if (initial || motion.matches) applyText(slides[next]);
    else {
      hero.classList.add("is-changing");
      textTimer = setTimeout(() => {
        applyText(slides[next]);
        hero.classList.remove("is-changing");
      }, 300);
    }
    start();
  }

  const updatePause = () => {
    pause.setAttribute("aria-pressed", String(manuallyPaused));
    pause.setAttribute("aria-label", manuallyPaused ? "Lanjutkan tayangan" : "Jeda tayangan");
    pause.querySelector("use")?.setAttribute("href", manuallyPaused ? "#i-play" : "#i-pause");
    pause.disabled = motion.matches;
  };
  listen(nextButton, "click", () => show(current + 1));
  listen(document.getElementById("heroPrev"), "click", () => show(current - 1));
  listen(pause, "click", () => {
    manuallyPaused = !manuallyPaused;
    updatePause();
    start();
  });
  // Jeda saat diarahkan kursor, difokuskan, tab tersembunyi, atau hero tidak terlihat.
  listen(stage, "pointerenter", (event) => event.pointerType === "mouse" && hold("hover", true));
  listen(stage, "pointerleave", () => hold("hover", false));
  listen(stage, "focusin", () => hold("focus", true));
  listen(stage, "focusout", (event) => !stage.contains(event.relatedTarget) && hold("focus", false));
  listen(document, "visibilitychange", () => start());
  listen(stage, "keydown", (event) => {
    if (!multi || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    if (event.target.closest("a, input, textarea, select")) return;
    event.preventDefault();
    show(current + (event.key === "ArrowRight" ? 1 : -1));
  });
  // Geser (swipe) di layar sentuh.
  listen(stage, "pointerdown", (event) => {
    if (event.pointerType === "mouse") return;
    pointerX = event.clientX;
    pointerY = event.clientY;
  }, { passive: true });
  listen(stage, "pointerup", (event) => {
    if (pointerX === undefined) return;
    const dx = event.clientX - pointerX;
    const dy = event.clientY - pointerY;
    pointerX = undefined;
    if (multi && Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
  }, { passive: true });
  const observer = new IntersectionObserver((entries) => hold("offscreen", !entries[0].isIntersecting), { threshold: 0.1 });
  observer.observe(stage);
  listen(motion, "change", () => {
    manuallyPaused = motion.matches;
    updatePause();
    start();
  });

  const resize = new ResizeObserver(fitTitle);
  resize.observe(stage);
  document.fonts?.ready.then(fitTitle);

  // Animasi masuk: tunggu foto pertama siap, lalu foto → judul → info.
  updatePause();
  show(0, true);
  fitTitle();
  if (!motion.matches) {
    hero.classList.add("hero--animate");
    const first = photos[0]?.querySelector("img");
    const reveal = () => requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add("is-ready")));
    if (first && !first.complete) {
      first.decode().then(reveal, reveal);
      setTimeout(reveal, 1500); // jangan menunggu terlalu lama di koneksi lambat
    } else reveal();
  }

  return () => {
    clearTimeout(timer);
    clearTimeout(textTimer);
    observer.disconnect();
    resize.disconnect();
  };
};

/* ===== sections/site-map.js ===== */
window.BMA = window.BMA || {};

window.BMA.sites = ({ motion, listen }) => {
  const map = document.getElementById("siteMap");
  const sites = window.BMA_SITES || {};
  const maps = window.BMA_SITE_MAPS || {};
  const keys = Object.keys(sites);
  if (!map || !keys.length) return () => {};
  const list = document.getElementById("siteList");
  const body = document.getElementById("siteContent");
  const province = document.getElementById("siteProvince");
  const title = document.getElementById("siteTitle");
  const description = document.getElementById("siteDescription");
  const link = document.getElementById("siteLink");
  const track = document.getElementById("siteGallery");
  const empty = document.getElementById("siteGalleryEmpty");
  const prev = document.getElementById("siteGalleryPrev");
  const next = document.getElementById("siteGalleryNext");
  const galleryNote = document.querySelector("#siteGalleryTitle small");
  const lightbox = document.getElementById("siteLightbox");
  let photos = [];
  let photoIndex = 0;
  let photoOpener = null;
  let activeSite = null;
  let timer;

  const sitesOn = (mapKey) => keys.filter((k) => sites[k].map === mapKey);
  const mapKeys = Object.keys(maps).filter((m) => sitesOn(m).length);

  // Daftar site dikelompokkan per provinsi; semua marker tetap terlihat
  // pada satu peta gabungan saat site aktif berubah.
  const listButtons = {};
  const groups = {};
  mapKeys.forEach((mapKey) => {
    const group = document.createElement("div");
    group.className = "site-list__group";
    const heading = document.createElement("p");
    heading.className = "site-list__province";
    heading.textContent = maps[mapKey].name;
    const options = document.createElement("div");
    options.className = "site-list__options";
    sitesOn(mapKey).forEach((key) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = sites[key].name;
      button.setAttribute("aria-label", `${sites[key].name}, ${maps[mapKey].name}`);
      listen(button, "click", () => setActiveSite(key));
      options.append(button);
      listButtons[key] = button;
    });
    group.append(heading, options);
    list?.append(group);
    groups[mapKey] = group;
  });

  // Marker di peta dibuat dari data yang sama.
  const markers = {};
  keys.forEach((key) => {
    const site = sites[key];
    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = "site-marker";
    marker.dataset.site = key;
    marker.style.setProperty("--x", site.position.x + "%");
    marker.style.setProperty("--y", site.position.y + "%");
    marker.setAttribute("aria-label", "Tampilkan lokasi operasional " + site.name);
    const label = document.createElement("span");
    label.className = "site-marker__label";
    label.setAttribute("aria-hidden", "true");
    label.textContent = site.label || site.name;
    marker.append(label);
    listen(marker, "click", () => setActiveSite(key));
    map.append(marker);
    markers[key] = marker;
  });

  const updateGalleryNav = () => {
    const max = track.scrollWidth - track.clientWidth;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max - 2;
  };
  const showEmptyIfNeeded = () => {
    const none = !track.children.length;
    track.hidden = none;
    empty.hidden = !none;
    updateGalleryNav();
  };

  const updateMarkers = (key) => {
    keys.forEach((k) => {
      const active = k === key;
      markers[k].classList.toggle("site-marker--active", active);
      markers[k].setAttribute("aria-pressed", String(active));
      listButtons[k]?.setAttribute("aria-pressed", String(active));
    });
    Object.entries(groups).forEach(([provinceKey, group]) => {
      group.classList.toggle("is-active", provinceKey === sites[key].map);
    });
  };
  const updateContent = (site) => {
    if (province) province.textContent = maps[site.map]?.name || "";
    title.textContent = site.name;
    description.textContent = site.description;
    link.href = site.link || "pages/services.html";
    link.setAttribute("aria-label", "Lihat layanan terkait lokasi operasional " + site.name);
  };
  // Pop-up foto: <dialog> dengan navigasi panah, Esc, dan klik latar untuk menutup.
  const showPhoto = (i) => {
    if (!lightbox || !photos.length) return;
    photoIndex = (i + photos.length) % photos.length;
    const photo = photos[photoIndex];
    const image = lightbox.querySelector("img");
    image.src = photo.full || photo.src;
    image.alt = photo.alt;
    lightbox.querySelector("[data-lightbox-caption]").textContent = photo.alt;
    lightbox.querySelector("[data-counter]").textContent = photoIndex + 1 + " / " + photos.length;
    lightbox.querySelectorAll("[data-prev], [data-next]").forEach((button) => {
      button.hidden = photos.length < 2;
    });
  };
  const openPhoto = (i, opener) => {
    if (!lightbox?.showModal) return;
    photoOpener = opener;
    showPhoto(i);
    lightbox.showModal();
  };
  if (lightbox) {
    listen(lightbox.querySelector("[data-prev]"), "click", () => showPhoto(photoIndex - 1));
    listen(lightbox.querySelector("[data-next]"), "click", () => showPhoto(photoIndex + 1));
    listen(lightbox.querySelector("[data-close]"), "click", () => lightbox.close());
    listen(lightbox, "click", (event) => {
      if (event.target === lightbox) lightbox.close();
    });
    listen(lightbox, "keydown", (event) => {
      if (event.key === "ArrowRight") showPhoto(photoIndex + 1);
      if (event.key === "ArrowLeft") showPhoto(photoIndex - 1);
    });
    listen(lightbox, "close", () => photoOpener?.focus());
  }

  const updateGallery = (site) => {
    photos = (site.images || []).map((image) => ({
      ...image,
      alt: image.alt || "Foto ilustrasi " + image.caption + ", bukan dokumentasi Site " + site.name,
    }));
    track.replaceChildren(
      ...photos.map((image, i) => {
        const item = document.createElement("li");
        item.className = "site-gallery__item";
        const button = document.createElement("button");
        button.type = "button";
        button.className = "site-gallery__open";
        button.setAttribute("aria-label", "Perbesar foto: " + image.alt);
        button.addEventListener("click", () => openPhoto(photos.indexOf(image), button));
        const img = document.createElement("img");
        img.src = image.src;
        img.alt = "";
        img.width = 640;
        img.height = 427;
        img.loading = "lazy";
        img.decoding = "async";
        // Gambar gagal dimuat: sembunyikan item, jangan tampilkan ikon rusak.
        img.addEventListener("error", () => {
          item.remove();
          photos = photos.filter((photo) => photo !== image);
          showEmptyIfNeeded();
        });
        button.append(img);
        item.append(button);
        return item;
      }),
    );
    track.scrollLeft = 0;
    // Label "Foto ilustrasi" hanya jika ada foto contoh (tanpa alt khusus).
    if (galleryNote) {
      const illustrative = (site.images || []).some((image) => !image.alt);
      galleryNote.textContent = illustrative ? "Foto ilustrasi" : "Dokumentasi operasional";
    }
    showEmptyIfNeeded();
  };

  function setActiveSite(siteKey) {
    const site = sites[siteKey];
    if (!site || siteKey === activeSite) return;
    const first = activeSite === null;
    const animate = !first && !motion.matches;
    activeSite = siteKey;
    updateMarkers(siteKey);
    clearTimeout(timer);
    if (!animate) {
      updateContent(site);
      updateGallery(site);
      return;
    }
    // Transisi halus: keluar → ganti isi → masuk.
    body.classList.add("is-changing");
    track.classList.add("is-changing");
    timer = setTimeout(() => {
      updateContent(site);
      updateGallery(site);
      body.classList.remove("is-changing");
      track.classList.remove("is-changing");
    }, 180);
  }
  window.BMA.setActiveSite = setActiveSite;

  listen(prev, "click", () => track.scrollBy({ left: -track.clientWidth * 0.8, behavior: motion.matches ? "auto" : "smooth" }));
  listen(next, "click", () => track.scrollBy({ left: track.clientWidth * 0.8, behavior: motion.matches ? "auto" : "smooth" }));
  listen(track, "scroll", updateGalleryNav, { passive: true });
  listen(window, "resize", updateGalleryNav, { passive: true });

  setActiveSite(sites[window.BMA_SITE_DEFAULT] ? window.BMA_SITE_DEFAULT : keys[0]);
  return () => {
    clearTimeout(timer);
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
  ["navigation", "hero", "sites", "scrollReveal"].forEach(
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
    const search = document.querySelector("#newsSearch");
    const tabs = [...document.querySelectorAll("[data-news-category]")];
    const cards = [...news.children];
    let page = 1;
    // Kategori dan pencarian memilih berita; pagination menampilkan enam per halaman.
    const filter = (resetPage = true) => {
      if (resetPage) page = 1;
      const matches = cards.filter(
        (card) =>
          (category === "all" || card.dataset.category === category) &&
          normalize(card.textContent).includes(normalize(search.value)),
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
    search.addEventListener("input", () => filter());
    document
      .querySelector("[data-reset-news]")
      .addEventListener("click", () => {
        category = "all";
        search.value = "";
        filter();
        search.focus();
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
  // Tabel lowongan (hanya lowongan dibuka): filter kata kunci, departemen, lokasi + pagination.
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
      document.querySelector("#jobCount").textContent =
        matches.length + " lowongan ditemukan" +
        (result.pages > 1 ? " · halaman " + page + " dari " + result.pages : "");
      document.querySelector("#jobEmpty").hidden = matches.length !== 0;
      wrapper.hidden = matches.length === 0;
    };
    search.addEventListener("input", () => filter());
    Object.values(selects).forEach((select) => select.addEventListener("change", () => filter()));
    document.querySelector("[data-reset-jobs]").addEventListener("click", () => {
      search.value = "";
      Object.values(selects).forEach((select) => (select.value = "all"));
      filter();
      search.focus();
    });
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
  const jobs = [["operator-excavator","Operator Excavator","Produksi","Kutai Kartanegara, Kaltim","Kontrak"],["hse-officer","HSE Officer","K3 & Lingkungan","Kutai Kartanegara, Kaltim","Penuh waktu"],["logistics-coordinator","Koordinator Logistik","Logistik","Tanah Bumbu, Kalsel","Penuh waktu"],["foreman-produksi","Foreman Produksi Coal Getting","Produksi","Kutai Kartanegara, Kaltim","Penuh waktu"],["mekanik-alat-berat","Mekanik Alat Berat","Plant & Maintenance","Tanah Bumbu, Kalsel","Kontrak"]];
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
