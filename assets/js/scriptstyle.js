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