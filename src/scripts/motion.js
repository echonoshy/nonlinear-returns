const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  const revealSelectors = [
    ".hero .eyebrow",
    ".hero h1",
    ".hero .lede",
    ".hero-copy",
    ".chartcard",
    ".arc-card",
    ".positioning",
    ".stats .stat",
    ".intro",
    ".act",
    ".cta",
    ".block",
    ".lane",
    ".frame-head",
    ".concept",
    ".topic",
    ".thesis"
  ];

  const revealItems = Array.from(document.querySelectorAll(revealSelectors.join(",")));

  revealItems.forEach((item, index) => {
    item.dataset.reveal = "";
    item.style.setProperty("--reveal-delay", `${Math.min((index % 5) * 70, 280)}ms`);
  });

  document.documentElement.classList.add("motion-ready");

  const show = (item) => item.classList.add("is-visible");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target);
        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.1
    });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach(show);
  }
}
