
     const toggle = document.getElementById("toggleWidget");
  const box = document.getElementById("widgetBox");
  const steps = document.querySelectorAll(".widget-step");
  const wrapper = document.querySelector(".widget-wrapper");

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
    wrapper.classList.add("expand");
    resetWidget();
    goToStep('step2');
    document.addEventListener("click", outsideClickListener);
  }

  function closeWidget() {
    box.classList.remove("show");
    setTimeout(() => {
      box.classList.add("hide");
      wrapper.classList.remove("expand");
    }, 300);
    resetWidget();
    document.removeEventListener("click", outsideClickListener);
  }

  function resetWidget() {
    goToStep('step2');
    selectedMain = null;
    document.getElementById("toService").disabled = true;
    document.querySelectorAll("#mainOptions .option-btn").forEach(btn => btn.classList.remove("active"));
    selectedServiceBtn = null;
    document.getElementById("toForm").disabled = true;
    document.getElementById("serviceOptions").innerHTML = "";
    document.getElementById("serviceHeader").textContent = "Select a service";
  }

  function outsideClickListener(event) {
    if (!box.contains(event.target) && !toggle.contains(event.target)) {
      closeWidget();
    }
  }

  function goToStep(stepId) {
    steps.forEach(step => step.classList.add("hide"));
    document.getElementById(stepId).classList.remove("hide");
  }

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
        Array.from(serviceDiv.children).forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById("toForm").disabled = false;
        selectedServiceBtn = s;
      });

      serviceDiv.appendChild(btn);
    });
  }

  let lastScrollTop = window.scrollY;
  let openTimeout;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const scrollPosition = window.innerHeight + scrollTop;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop > lastScrollTop) {
      if (scrollPosition >= documentHeight - 5) {
        clearTimeout(openTimeout);
        openTimeout = setTimeout(() => {
          if (!box.classList.contains("show")) openWidget();
        }, );
      }
    }

    if (scrollTop < lastScrollTop) {
      clearTimeout(openTimeout);
      if (box.classList.contains("show")) closeWidget();
    }

    lastScrollTop = scrollTop;
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




 const track = document.getElementById('track');
        const indicators = document.querySelectorAll('.carousel-indicators li');
        const slides = document.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;
        let currentIndex = 0;
        const slideWidth = 100;

        function animateSlide(index) {
            const slide = slides[index];
            const heading = slide.querySelector('.text h2');
            const para = slide.querySelector('.text p');
            const button = slide.querySelector('.text a');
            const image = slide.querySelector('.image img');

            // Kill previous animations
            gsap.killTweensOf([heading, para, button, image]);

            gsap.set([heading, para, button], { opacity: 0, y: 40 });
            gsap.set(image, { opacity: 0, scale: 0.9 });

            const tl = gsap.timeline();
            tl.to(heading, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
                .to(para, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.6")
                .to(button, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");

            gsap.to(image, {
                opacity: 1,
                scale: 1.3,
                duration: 1.5,
                ease: "power2.out"
            });
        }

        function moveToSlide(index, animate = true) {
            currentIndex = index;

            if (animate) {
                track.style.transition = "transform 0.8s ease";
            } else {
                track.style.transition = "none";
            }

            track.style.transform = `translateX(-${index * slideWidth}%)`;

            animateSlide(index % 5);
            indicators.forEach(i => i.classList.remove('active'));
            indicators[currentIndex % 5].classList.add('active');
        }

        function nextSlide() {
            currentIndex++;
            moveToSlide(currentIndex);

            if (currentIndex === totalSlides - 1) {
                setTimeout(() => moveToSlide(0, false), 850);
            }
        }

        indicators.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                currentIndex = idx;
                moveToSlide(currentIndex);
                resetAutoplay();
            });
        });

        let autoplay = setInterval(nextSlide, 5000);
        function resetAutoplay() {
            clearInterval(autoplay);
            autoplay = setInterval(nextSlide, 5000);
        }

        moveToSlide(0);

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

  

  
