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


// gsap.registerPlugin(ScrollTrigger);

// const pageContainer = document.querySelector(".container");

// /* SMOOTH SCROLL */
// const scroller = new LocomotiveScroll({
//   el: pageContainer,
//   smooth: true
// });

// scroller.on("scroll", ScrollTrigger.update);

// ScrollTrigger.scrollerProxy(pageContainer, {
//   scrollTop(value) {
//     return arguments.length
//       ? scroller.scrollTo(value, 0, 0)
//       : scroller.scroll.instance.scroll.y;
//   },
//   getBoundingClientRect() {
//     return {
//       left: 0,
//       top: 0,
//       width: window.innerWidth,
//       height: window.innerHeight
//     };
//   },
//   pinType: pageContainer.style.transform ? "transform" : "fixed"
// });

// ////////////////////////////////////
// ////////////////////////////////////
// window.addEventListener("load", function () {
//   let pinBoxes = document.querySelectorAll(".pin-wrap > *");
//   let pinWrap = document.querySelector(".pin-wrap");
//   let pinWrapWidth = pinWrap.offsetWidth;
//   let horizontalScrollLength = pinWrapWidth - window.innerWidth;

//   // Pinning and horizontal scrolling

//   gsap.to(".pin-wrap", {
//     scrollTrigger: {
//       scroller: pageContainer, //locomotive-scroll
//       scrub: true,
//       trigger: "#sectionPin",
//       pin: true,
//       // anticipatePin: 1,
//       start: "top top",
//       end: pinWrapWidth
//     },
//     x: -horizontalScrollLength,
//     ease: "none"
//   });

//   ScrollTrigger.addEventListener("refresh", () => scroller.update()); //locomotive-scroll

//   ScrollTrigger.refresh();
// });
