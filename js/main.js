document.addEventListener("DOMContentLoaded", function () {
  // Inicializar Splide para "Los 10 Imperdibles"
  const splideElement = document.querySelector(".hero__imperdibles-slider");

  if (splideElement) {
    const splide = new Splide(".hero__imperdibles-slider", {
      type: "loop", // Loop infinito
      perPage: 4, // 4 slides visibles en desktop
      perMove: 1, // Mueve 1 slide a la vez
      gap: "1rem", // Espacio entre slides
      padding: "2rem", // Padding lateral
      arrows: false, // Mostrar flechas
      pagination: false, // Mostrar paginación (puntos)

      // Configuración de autoplay
      autoplay: true, // Activa autoplay
      interval: 5000, // 5 segundos entre transiciones
      pauseOnHover: true, // Pausa al pasar el mouse
      pauseOnFocus: true, // Pausa al enfocar

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
});

var splide = new Splide(".splide");

splide.on("autoplay:playing", function (rate) {
  console.log(rate); // 0-1
});

splide.mount();
