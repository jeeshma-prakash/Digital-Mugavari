
    const toggle = document.getElementById("toggleWidget");
    const box = document.getElementById("widgetBox");
    const steps = document.querySelectorAll(".widget-step");

    // Selected values
    let selectedMain = null;
    let selectedServiceBtn = null;

    toggle.addEventListener("click", () => {
      if (box.classList.contains("show")) {
        closeWidget();
      } else {
        openWidget();
      }
    });

    function openWidget() {
      box.classList.remove("hide");
      box.classList.add("show");
      resetWidget();
      goToStep('step1');
      // Listen for outside clicks
      document.addEventListener("click", outsideClickListener);
    }

    function closeWidget() {
      box.classList.remove("show");
      box.classList.add("hide");
      resetWidget();
      // Remove outside click listener to avoid memory leaks
      document.removeEventListener("click", outsideClickListener);
    }

    // Reset widget to initial state
    function resetWidget() {
      goToStep('step1');

      // Reset selections on step 2
      selectedMain = null;
      document.getElementById("toService").disabled = true;
      document.querySelectorAll("#mainOptions .option-btn").forEach(btn => btn.classList.remove("active"));

      // Reset selections on step 3
      selectedServiceBtn = null;
      document.getElementById("toForm").disabled = true;
      document.getElementById("serviceOptions").innerHTML = "";
      document.getElementById("serviceHeader").textContent = "Select a service";
    }

    // Close widget if clicked outside of widget box or toggle button
    function outsideClickListener(event) {
      if (!box.contains(event.target) && !toggle.contains(event.target)) {
        closeWidget();
      }
    }

    function goToStep(stepId) {
      steps.forEach(step => step.classList.add("hide"));
      document.getElementById(stepId).classList.remove("hide");
    }

    // Step 2 logic
    const mainOptions = document.querySelectorAll("#mainOptions .option-btn");
    mainOptions.forEach(btn => {
      btn.addEventListener("click", () => {
        mainOptions.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedMain = btn.getAttribute("data-value");
        document.getElementById("toService").disabled = false;
        populateServiceOptions(selectedMain);
      });
    });

    // Step 3 logic
    function populateServiceOptions(key) {
      const services = {
        seo: ["On-page SEO", "Technical SEO", "Local SEO", "SEO Audit"],
        web: ["Landing Page", "Corporate Site", "eCommerce Site", "Maintenance"],
        smm: ["Instagram Strategy", "Post Design", "Hashtag Research", "Profile Optimization"],
        pm: ["Google Ads", "Meta Ads", "Retargeting", "Conversion Optimization"],
        graphic: ["Logo Design", "Brochure Design", "Social Media Banners", "Presentation Decks"],
        influencer: ["Instagram Collab", "Micro Influencer Campaign", "YouTube Review", "Event Shoutouts"],
        branding: ["Visual Identity", "Brand Guidelines", "Tone of Voice", "Positioning Strategy"],
        dm: ["Full Digital Strategy", "Email Marketing", "Funnel Setup", "Analytics & Insights"]
      };

      const serviceDiv = document.getElementById("serviceOptions");
      const header = document.getElementById("serviceHeader");

      header.textContent = "Select a service in " + key.toUpperCase();
      serviceDiv.innerHTML = "";

      services[key].forEach((s, index) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = `${index + 1}. ${s}`;
        btn.setAttribute("type", "button");

        btn.addEventListener("click", () => {
          // Remove active from all siblings
          Array.from(serviceDiv.children).forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          document.getElementById("toForm").disabled = false;
          selectedServiceBtn = s;
        });
        serviceDiv.appendChild(btn);
      });
    }



    
$(window).scroll(function () {
  var scrollTop = $(window).scrollTop();
  var docHeight = $(document).height();
  var windowHeight = $(window).height();
  var scrollBottom = docHeight - (scrollTop + windowHeight);

  var scale;

  if (scrollBottom < 200) {
    // Zoom out near bottom of page
    scale = Math.max(1, 1.3 - (200 - scrollBottom) / 300); // smoothly reduce
  } else {
    // Zoom in during normal scroll
    scale = Math.min(1.3, 1 + scrollTop / 1000);
  }

  $('.zoom img').css({
    transform: "scale(" + scale + ")"
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const target = document.querySelector("#image-left");

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
        target.classList.add("expand");
      } else {
        target.classList.remove("expand");
      }
    },
    {
      threshold: [0, 0.25, 0.5, 1]
    }
  );

  observer.observe(target);
});



  const indicators = document.querySelectorAll('#customIndicators button');
  const track = document.getElementById('carouselTrack');
  let currentIndex = 0;

  // Move to slide
  function goToSlide(index) {
    currentIndex = index;
    const slideWidth = window.innerWidth;
    track.style.transform = `translateX(-${slideWidth * index}px)`;

    indicators.forEach(btn => btn.classList.remove('active'));
    indicators[index].classList.add('active');

    animateSlide(index);
  }

  // Animate entry using GSAP
  function animateSlide(index) {
    const slide = track.children[index];
    const text = slide.querySelector('.carousel-text');
    const image = slide.querySelector('.carousel-image');

    gsap.fromTo(text, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
    gsap.fromTo(image, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
  }

  // Manual click navigation
  indicators.forEach(btn => {
    btn.addEventListener('click', () => {
      goToSlide(parseInt(btn.dataset.index));
    });
  });

  // Auto Slide
  setInterval(() => {
    currentIndex = (currentIndex + 1) % indicators.length;
    goToSlide(currentIndex);
  }, 5000); // Change every 5 seconds

  // Initial load animation
  window.addEventListener('load', () => {
    animateSlide(0);
  });


  // STICKY SECTION WITH GSAP AND INTERSECTION OBSERVER
gsap.registerPlugin(ScrollTrigger);

const fillEl = document.querySelector('.js-fill');

gsap.to(fillEl, {
  height: '100vh',
  width: '100vw',
  borderRadius: '10',
  scrollTrigger: {
    trigger: fillEl,
    start: 'top 80%',
    end: 'bottom top',
    scrub: 1.35,
    invalidateOnRefresh: true
  }
});

    document.addEventListener('DOMContentLoaded', function() {
    const stickySection = document.querySelector('.sticky');
    let isLocked = false;
    let hasPaused = false;

    function lockScroll() {
      if (!isLocked) {
        isLocked = true;
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
          document.body.style.overflow = '';
          isLocked = false;
        }, 1200); // Lock for 1.2 seconds
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasPaused) {
            hasPaused = true;
            stickySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            lockScroll();
            setTimeout(() => {
              hasPaused = false;
            }, 1300); // Prevent retriggering during/after lock
          }
        });
      },
      {
        threshold: [0.7] // Trigger when 70% of the section is visible
      }
    );

    observer.observe(stickySection);
  });

  // gsap
  window.addEventListener("DOMContentLoaded", () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    tl.from(".hero-section", { opacity: 0, y: 50, duration: 0.8 })
      .from(".tagline", { opacity: 0, y: 30 }, "-=0.5")
      .from(".headline", { opacity: 0, y: 30 }, "-=0.4")
  });


 window.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top 85%", // when top of .work-section hits 85% of viewport height
        toggleActions: "play none none none"
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

   window.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".digital-section",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // Animate the heading
    tl.from(".digital-section h2", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Animate each .digital-item with stagger
    tl.from(".digital-item", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2
    }, "-=0.5"); // start this part slightly before heading finishes
  });


   window.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#brand-parallax",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // Animate each icon from different directions
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
    }, "-=0.8");

    // Animate the main content
    tl.from(".brand-parallax-content span", {
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


  
