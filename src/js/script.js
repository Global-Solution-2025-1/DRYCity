document.addEventListener("DOMContentLoaded", function () {
  const allMains = document.querySelectorAll("main");
  const tracker = document.createElement("div");
  tracker.className = "tracker";
  document.body.appendChild(tracker);
  const firstMainSections = allMains[0].querySelectorAll("section");
  const dots = [];

  for (let i = 0; i < firstMainSections.length; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    tracker.appendChild(dot);
    dots.push(dot);
  }

  function updatePageDots() {
    dots.forEach((dot) => dot.classList.remove("active"));
    const activeMain = document.querySelector('main[style*="display: flex"]') || allMains[0];
    const visibleSections = Array.from(activeMain.querySelectorAll("section"));

    visibleSections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
        if (dots[index]) {
          dots[index].classList.add("active");
        }
      }
    });
  }

  let currentMainIndex = 0;

  function navigateToSection(index) {
    if (index < 0 || index >= allMains.length) return;

    const currentMain = allMains[currentMainIndex];
    currentMain.classList.add("main-exiting");

    setTimeout(() => {
      currentMain.style.display = "none";
      currentMain.classList.remove("main-exiting");
      currentMainIndex = index;
      const nextMain = allMains[currentMainIndex];
      nextMain.classList.add("main-entering");
      nextMain.style.display = "flex";
      void nextMain.offsetHeight;

      requestAnimationFrame(() => {
        nextMain.classList.remove("main-entering");
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "instant",
          });
        }, 10);
      });

      updateDotsForCurrentMain();
      setupIntersectionObserver();
      updateActiveMenuItem(currentMainIndex);
    }, 300);
  }

  const nextButtons = document.querySelectorAll(".proxima-secao");
  nextButtons.forEach((button) => {
    button.style.cursor = "pointer";
    button.addEventListener("click", function () {
      navigateToSection((currentMainIndex + 1) % allMains.length);
    });
  });

  function updateActiveMenuItem(index) {
    const menuItems = document.querySelectorAll(".header__list-item, .header__list-item--active");
    menuItems.forEach((item) => {
      item.className = "header__list-item";
    });
    if (menuItems[index]) {
      menuItems[index].className = "header__list-item--active";
    }
  }

  function updateDotsForCurrentMain() {
    tracker.innerHTML = "";
    dots.length = 0;
    const currentMainSections = allMains[currentMainIndex].querySelectorAll("section");
    for (let i = 0; i < currentMainSections.length; i++) {
      const dot = document.createElement("div");
      dot.className = "dot";
      tracker.appendChild(dot);
      dots.push(dot);
    }
    updatePageDots();
  }

  const homeArrows = document.querySelectorAll(".section--home__cta img");
  homeArrows.forEach((arrow) => {
    arrow.style.cursor = "pointer";
    arrow.addEventListener("click", function () {
      const currentSection = this.closest("section");
      const nextSection = currentSection.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  window.addEventListener("scroll", updatePageDots);

  function setupIntersectionObserver() {
    if (window.currentObserver) {
      window.currentObserver.disconnect();
    }

    const activeMain = allMains[currentMainIndex];
    const linhas = activeMain.querySelectorAll(".linha");
    const marca_texto = activeMain.querySelectorAll(".marca-texto");
    const slideCards = activeMain.querySelectorAll(".slide-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 1 }
    );

    linhas.forEach((linha) => observer.observe(linha));
    if (marca_texto.length > 0) {
      marca_texto.forEach((marca) => observer.observe(marca));
    }
    if (slideCards.length > 0) {
      slideCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.3}s`;
        observer.observe(card);
      });
    }

    window.currentObserver = observer;
  }

  allMains.forEach((main, index) => {
    if (index === 0) {
      main.classList.remove("main-entering");
      main.style.display = "flex";
    } else {
      main.style.display = "none";
    }
  });
  updateDotsForCurrentMain();
  setupIntersectionObserver();

  const navMenu = document.querySelector(".header__nav");
  const menuItems = document.querySelectorAll(".header__list-item, .header__list-item--active");
  const clonedNav = navMenu.cloneNode(true);
  navMenu.parentNode.replaceChild(clonedNav, navMenu);
  const newNavMenu = document.querySelector(".header__nav");
  const newMenuItems = document.querySelectorAll(".header__list-item, .header__list-item--active");

  document.addEventListener("click", function (e) {
    const activeItem = document.querySelector(".header__list-item--active");
    if (e.target === activeItem) {
      e.stopPropagation();
      newNavMenu.classList.toggle("active");
      return;
    }
    if (!newNavMenu.contains(e.target)) {
      newNavMenu.classList.remove("active");
    }
  });

  newMenuItems.forEach((item, index) => {
    item.addEventListener("click", function (e) {
      if (this.classList.contains("header__list-item--active")) {
        return;
      }
      e.preventDefault();
      if (!this.classList.contains("header__list-item--active")) {
        newNavMenu.classList.remove("active");
        navigateToSection(index);
      }
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 767) {
      newNavMenu.classList.remove("active");
    }
  });
});
