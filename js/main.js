// Inicializar Swiper para el slider de Los 10 Imperdibles
const imperdiblesSwiper = new Swiper(".hero__imperdibles-slider", {
  slidesPerView: "auto",
  spaceBetween: 20,
  loop: true,
  loopedSlides: 6,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  speed: 800,
  freeMode: {
    enabled: true,
    momentum: true,
  },
  grabCursor: true,
  breakpoints: {
    320: {
      spaceBetween: 15,
    },
    768: {
      spaceBetween: 20,
    },
    1024: {
      spaceBetween: 20,
    },
  },
});
