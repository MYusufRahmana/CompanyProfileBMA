# SDD ledger — plan: docs/superpowers/plans/2026-10-07-folder-structure.md

Setup ruling: repo git ber-root di `D:\` dengan 0 commit, sehingga `task-start`/`task-done`
dan isolasi worktree dari executing-plans tidak bisa dipakai. Ledger ini yang jadi catatan
progres. Tidak ada `git commit`/`git add`/`git mv` sama sekali.

Pre-flight shared interfaces:
- Task 1 (audit script) -> Task 2/3/4/5/6 (semua memanggil `node tools/audit-paths.mjs`).
  Kontrak yang dipakai: exit 0 = semua resolve, exit 1 = ada target hilang, prints tabel per file.
  Ditemukan: konsisten di semua task.
- Task 2 (layout filesystem) -> Task 3 (rewrite script membaca `pages/`, `css/`, `js/`).
  Kontrak: Task 3 wajib jalan SETELAH Task 2 Step 7 selesai. Ditemukan: urut di plan.
- Task 3 (HTML rewrite) -> Task 4 (CSS url) -> Task 5 (grep negatif) -> Task 6 (cleanup).
  Rantai berurutan, tidak ada yang bisa diparalelkan.
Task 1: complete (tests: node tools/audit-paths.mjs -> 16 files, 431 refs, 0 broken, exit 0;
  red-state proof: audit-selftest.html -> 1 broken, exit 1)
Task 1: Ruling: filter /\.(?:html|css)$/ replaces plan's /\.(?:html|css)$/ written as /\.html?$/ —
  plan's regex only matched .htm/.html so CSS was never scanned and Task 4's url() rewrite would
  have been unverified — cost if wrong: one regex literal, verified by style.css reporting 2 refs.

Task 2: complete (tests: node tools/audit-paths.mjs -> 16 files, 431 refs, 225 BROKEN, exit 1 = intended RED)
Task 2: Ruling: plan Step 3 wrote `mv ... kari.html ...` but the real file is `karir.html`; mv continued
  past the missing operand and left 9/10 pages moved — moved `karir.html` separately, re-verified
  pages/ = 10 and root = index.html only — cost if wrong: one file stranded at root, caught by the
  Step 7 root check before Task 3 ran.
Backup: ../BMA_Company_Profile_backup_pre_restructure (11 html, 5 css, 2 js, 15 assets) — only rollback path.

Task 3: complete (tests: node tools/audit-paths.mjs -> 223 substitutions applied, audit now shows
  only css/style.css BROKEN with exactly 2 missing url() refs, 11/11 HTML ok, exit 1 as expected)

Task 4: complete (tests: node tools/audit-paths.mjs -> 16 files, 431 refs, 0 broken, exit 0 = GREEN;
  grep "url(assets/" in css/ clean; both @font-face url() now ../assets/fonts/)

Task 5: Ruling: plan Step 4/5 grepped 'perusahaan-kami.html#mining' inside pages/ and expected a hit;
  that fragment link only ever existed in index.html (subsidiary cards), now 'pages/...#mining' — the
  empty result was correct behaviour, not a broken link; verified directly in index.html instead
  (2x each for #mining/#marine/#logistics/#resources) and query strings verified intact in
  pages/layanan.html — cost if wrong: none, audit independently resolves every link.
Task 5: complete (tests: 3 negative greps PASS; node --check js/script.js + js/careers.js OK;
  internal GSAP comment 'company-directory.js' intact = 1; index.html has 45 pages/ refs and 0 '../';
  audit after README edit -> 431 refs, 0 broken, exit 0)

Task 6: complete (rewrite-paths.mjs deleted; tools/ retains audit-paths.mjs; final audit
  16 files / 431 refs / 0 broken, exit 0)
Final: review clean — oracle (fresh context) found 0 Critical, 0 Important, 0 Minor.
Final: independent evidence gathered by me, not by the reviewer:
  - js/script.js and js/careers.js byte-for-byte IDENTICAL to backup (cmp) — never substituted,
    so the minified GSAP bundle is provably undamaged.
  - 4 of 5 CSS byte-identical; css/style.css differs on exactly 2 lines (the url() prefixes).
  - 11/11 HTML become byte-identical to backup once path prefixes are normalized away => no
    content, class, id, attribute or text was altered anywhere.
  - 5/5 plan Review Focus items verified handled.
No deferred minors. No fix pass needed.
