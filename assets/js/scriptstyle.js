 window.addEventListener('load', function() {
      gsap.registerPlugin(ScrollTrigger);
      const section = document.querySelector(".horizontal-section");
      const container = section.querySelector(".horizontal-container");
      // Calculate how far to scroll: (total width of images) - (viewport width)
      const scrollDistance = container.scrollWidth - window.innerWidth;
      // Animate the container's X from 0 to -scrollDistance on scroll
      gsap.to(container, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: true
        }
      });
    });


