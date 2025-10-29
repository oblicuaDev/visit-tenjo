// Inicializar Swiper solo si existe el slider
const swiperElement = document.querySelector(".hero__imperdibles-slider");
if (swiperElement) {
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
}

// Aplicar background-image a paneles desde data-bg
console.log("🔍 Iniciando configuración de backgrounds...");

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM cargado, buscando filas con data-bg...");

  const rows = document.querySelectorAll(".imperdible-row[data-bg]");
  console.log(`📊 Encontradas ${rows.length} filas con data-bg`);

  rows.forEach((row, index) => {
    const bgImage = row.getAttribute("data-bg");
    const panel = row.querySelector(".imperdible-row__panel");

    console.log(`\n🔧 Fila ${index + 1}:`, {
      bgImage,
      panelEncontrado: !!panel,
      elemento: row,
    });

    if (panel && bgImage) {
      // Establecer custom property CSS con ruta relativa al CSS (no al HTML)
      // CSS está en css/styles.css, por eso usamos ../img/ para subir al directorio raíz
      panel.style.setProperty("--panel-bg", `url('../img/${bgImage}')`);

      // Verificar que se aplicó
      const valorAplicado = panel.style.getPropertyValue("--panel-bg");
      console.log(`✅ Fila ${index + 1} → --panel-bg:`, valorAplicado);
    } else {
      console.warn(`❌ Fila ${index + 1}: panel o bgImage no encontrado`);
    }
  });

  console.log("\n🏁 Configuración de backgrounds completada");
});
