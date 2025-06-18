// Hero section (initial load only)
window.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

  tl.from(".hero-section", { opacity: 0, y: 50, duration: 0.8 })
    .from(".tagline", { opacity: 0, y: 30 }, "-=0.5")
    .from(".headline", { opacity: 0, y: 30 }, "-=0.4");
});

// Work section scroll animation
window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top 85%",
      scrub: true
    }
  });

  tl.from(".work-title", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  }).from(".marquee-wrapper", {
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: "power3.out"
  }, "-=0.5");
});

// Digital section scroll animation
window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".digital-section",
      start: "top 85%",
      scrub: true
    }
  });

  tl.from(".digital-section h2", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  }).from(".digital-item", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.2
  }, "-=0.5");
});

// Brand parallax scroll animation
window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#brand-parallax",
      start: "top 85%",
      scrub: true
    }
  });

  tl.from(".icon-1", {
    x: -200, y: -100, opacity: 0, duration: 1, ease: "power3.out"
  })
  .from(".icon-2", {
    x: 200, y: -100, opacity: 0, duration: 1, ease: "power3.out"
  }, "-=0.8")
  .from(".icon-3", {
    x: -200, y: 100, opacity: 0, duration: 1, ease: "power3.out"
  }, "-=0.8")
  .from(".icon-4", {
    x: 200, y: 100, opacity: 0, duration: 1, ease: "power3.out"
  }, "-=0.8")
  .from(".brand-parallax-content span", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  })
  .from(".parallax-title", {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  }, "-=0.6")
  .from(".parallax-subtitle", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.6")
  .from(".parallax-desc", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.5");
});
