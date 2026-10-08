/* Uses the GSAP and ScrollTrigger copies already bundled in script.js. */
document.addEventListener('DOMContentLoaded', () => {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    const entrance = document.querySelectorAll('[data-career-enter]');
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    timeline.from(entrance, { y: 26, opacity: 0, duration: .85, stagger: .1, clearProps: 'transform,opacity' });
    const photograph = document.querySelector('.career-cover-image');
    if (photograph) timeline.from(photograph, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, clearProps: 'clipPath' }, 0);
    // Animate whole compositions once; content remains readable before JS loads.
    document.querySelectorAll('[data-career-reveal]').forEach(section => {
      ScrollTrigger.create({ trigger: section, start: 'top 88%', once: true,
        onEnter: () => gsap.fromTo(section, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: 'power2.out', clearProps: 'transform,opacity' })
      });
    });
    return () => timeline.kill();
  });
  // Filters in script.js update synchronously; animate only the resulting cards.
  const results = document.getElementById('jobList');
  let filterTween;
  let filterTimer;
  const animateResults = () => {
    clearTimeout(filterTimer);
    filterTimer = setTimeout(() => {
      filterTween?.kill();
      if (results) gsap.set(results.children, { clearProps: 'transform,opacity' });
      if (matchMedia('(prefers-reduced-motion: reduce)').matches || !results) return;
      filterTween = gsap.fromTo([...results.children].filter(card => !card.hidden), { opacity: .4, y: 10 }, { opacity: 1, y: 0, duration: .3, stagger: .045, overwrite: true, clearProps: 'transform,opacity' });
      ScrollTrigger.refresh();
    }, 100);
  };
  document.getElementById('jobSearch')?.addEventListener('input', animateResults);
  ['jobDepartment', 'jobLocation'].forEach(id => document.getElementById(id)?.addEventListener('change', animateResults));
  document.querySelector('[data-reset-jobs]')?.addEventListener('click', animateResults);
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('pagehide', event => {
    if (!event.persisted) { clearTimeout(filterTimer); filterTween?.kill(); media.revert(); }
  });
});
