var splide = new Splide(".splide");

splide.on("autoplay:playing", function (rate) {
  console.log(rate); // 0-1
});

splide.mount();

document.addEventListener("DOMContentLoaded", function () {
  // Inicializar Splide para "Los 10 Imperdibles"
  const splideElement = document.querySelector(".hero__imperdibles-slider");

  if (splideElement) {
    const splide = new Splide(".hero__imperdibles-slider", {
      type: "loop",
      perPage: 4,
      perMove: 1,
      gap: "1rem",
      padding: "2rem",
      arrows: false,
      pagination: false,
      autoplay: true,
      interval: 3000,
      pauseOnHover: true,
      pauseOnFocus: true,
      breakpoints: {
        480: {
          perPage: 1,
          gap: "0.5rem",
          padding: "1rem",
        },
        768: {
          perPage: 2,
          gap: "0.75rem",
          padding: "1.5rem",
        },
        1024: {
          perPage: 3,
          gap: "1rem",
        },
      },
    });

    splide.mount();
  }

  // Menú hamburguesa para móviles
  const headerToggle = document.querySelector(".header__toggle");
  const headerNav = document.querySelector(".header__nav");

  if (headerToggle && headerNav) {
    headerToggle.addEventListener("click", function () {
      headerToggle.classList.toggle("is-active");
      headerNav.classList.toggle("is-active");
      document.body.classList.toggle("menu-open");
    });

    // Cerrar menú al hacer clic en un enlace
    const menuLinks = document.querySelectorAll(".header__menu-link");
    menuLinks.forEach((link) => {
      link.addEventListener("click", function () {
        headerToggle.classList.remove("is-active");
        headerNav.classList.remove("is-active");
        document.body.classList.remove("menu-open");
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", function (e) {
      if (
        !headerToggle.contains(e.target) &&
        !headerNav.contains(e.target) &&
        headerNav.classList.contains("is-active")
      ) {
        headerToggle.classList.remove("is-active");
        headerNav.classList.remove("is-active");
        document.body.classList.remove("menu-open");
      }
    });
  }
});
