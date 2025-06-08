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




  const widgetButton = document.getElementById("openWidget");
  const widgetForm = document.getElementById("widgetForm");
  const progressCircle = document.getElementById("progressCircle");

  let progress = 0;
  let lastSelected = "";

  widgetButton.addEventListener("click", () => {
    widgetForm.classList.toggle("show");
  });

  function updateProgress(p) {
  progress = p;
  progressCircle.setAttribute("data-progress", p); // Add this line
  progressCircle.textContent = `${p}%`;
  progressCircle.style.background = `conic-gradient(#F70d1a 0% ${p}%, #444 ${p}% 100%)`;
}


  function nextStep(id) {
    document.querySelectorAll(".tab-pane").forEach(el => el.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    let prog = 0;
    switch (id) {
      case 'step1': prog = 0; break;
      case 'step2': prog = 20; break;
      case 'hire':
      case 'build':
      case 'redesign': prog = 50; break;
      case 'finalForm': prog = 100; break;
    }
    updateProgress(prog);
  }

  // Step 2 logic
  const options = document.querySelectorAll("#step2 .list-group-item");
  let selectedOption = null;

  options.forEach(item => {
    item.addEventListener("click", () => {
      options.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      selectedOption = item.getAttribute("data-next");
      lastSelected = selectedOption;
      document.getElementById("step2Continue").disabled = false;
    });
  });

  document.getElementById("step2Continue").addEventListener("click", () => {
    if (selectedOption) {
      nextStep(selectedOption);
    }
  });