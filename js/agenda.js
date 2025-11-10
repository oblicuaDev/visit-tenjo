document.addEventListener("DOMContentLoaded", function () {
  // Verificar que estamos en la página de agenda
  const filtrosEventos = document.querySelector(".filtros-eventos");
  if (!filtrosEventos) return; // Salir si no estamos en agenda.html

  // Elementos del filtro
  const inputBuscar = document.getElementById("buscar");
  const selectCategoria = document.getElementById("categoria");
  const inputFechaDesde = document.getElementById("fecha-desde");
  const inputFechaHasta = document.getElementById("fecha-hasta");
  const tarjetasEventos = document.querySelectorAll(".evento-card");

  // Función para normalizar texto (quitar tildes, mayúsculas y caracteres especiales)
  function normalizarTexto(texto) {
    return texto
      .toLowerCase() // Convertir a minúsculas
      .normalize("NFD") // Descomponer caracteres con tildes
      .replace(/[\u0300-\u036f]/g, "") // Eliminar tildes
      .replace(/[^a-z0-9\s]/g, "") // Eliminar caracteres especiales (excepto letras, números y espacios)
      .trim(); // Eliminar espacios al inicio y final
  }

  // Función para filtrar eventos
  function filtrarEventos() {
    const textoBusqueda = normalizarTexto(inputBuscar.value);
    const categoriaSeleccionada = normalizarTexto(selectCategoria.value);
    const fechaDesde = inputFechaDesde.value
      ? new Date(inputFechaDesde.value)
      : null;
    const fechaHasta = inputFechaHasta.value
      ? new Date(inputFechaHasta.value)
      : null;

    let eventosVisibles = 0;

    tarjetasEventos.forEach((tarjeta) => {
      const titulo = normalizarTexto(
        tarjeta.querySelector(".evento-card__title").textContent
      );
      const categoria = normalizarTexto(
        tarjeta.querySelector(".evento-card__category").textContent
      );
      const fechaEventoStr = tarjeta.getAttribute("data-fecha");
      const fechaEvento = fechaEventoStr ? new Date(fechaEventoStr) : null;

      let mostrar = true;

      // Filtro por texto (busca en título Y categoría)
      if (
        textoBusqueda &&
        !(titulo.includes(textoBusqueda) || categoria.includes(textoBusqueda))
      ) {
        mostrar = false;
      }

      // Filtro por categoría
      if (categoriaSeleccionada && categoria !== categoriaSeleccionada) {
        mostrar = false;
      }

      // Filtro por fecha desde
      if (fechaDesde && fechaEvento) {
        const fechaDesdeNormalizada = new Date(
          fechaDesde.getFullYear(),
          fechaDesde.getMonth(),
          fechaDesde.getDate()
        );
        const fechaEventoNormalizada = new Date(
          fechaEvento.getFullYear(),
          fechaEvento.getMonth(),
          fechaEvento.getDate()
        );

        if (fechaEventoNormalizada < fechaDesdeNormalizada) {
          mostrar = false;
        }
      }

      // Filtro por fecha hasta
      if (fechaHasta && fechaEvento) {
        const fechaHastaNormalizada = new Date(
          fechaHasta.getFullYear(),
          fechaHasta.getMonth(),
          fechaHasta.getDate()
        );
        const fechaEventoNormalizada = new Date(
          fechaEvento.getFullYear(),
          fechaEvento.getMonth(),
          fechaEvento.getDate()
        );

        if (fechaEventoNormalizada > fechaHastaNormalizada) {
          mostrar = false;
        }
      }

      // Mostrar u ocultar tarjeta con animación
      if (mostrar) {
        tarjeta.style.display = "flex";
        tarjeta.style.animation = "fadeIn 0.3s ease";
        eventosVisibles++;
      } else {
        tarjeta.style.display = "none";
      }
    });

    // Mensaje si no hay eventos
    mostrarMensajeSinResultados(eventosVisibles);

    // Actualizar contador de resultados (opcional)
    actualizarContador(eventosVisibles, tarjetasEventos.length);
  }

  // Función para mostrar mensaje cuando no hay resultados
  function mostrarMensajeSinResultados(cantidad) {
    let mensaje = document.querySelector(".agenda-eventos__sin-resultados");

    if (cantidad === 0) {
      if (!mensaje) {
        mensaje = document.createElement("div");
        mensaje.className = "agenda-eventos__sin-resultados";
        mensaje.innerHTML = `
          <div class="sin-resultados-content">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <p>No se encontraron eventos que coincidan con los filtros aplicados.</p>
            <button onclick="limpiarFiltros()" class="evento-card__btn">Limpiar todos los filtros</button>
          </div>
        `;
        document
          .querySelector(".agenda-eventos__container")
          .appendChild(mensaje);
      }
      mensaje.style.display = "flex";
    } else {
      if (mensaje) {
        mensaje.style.display = "none";
      }
    }
  }

  // Función para actualizar contador de resultados (OPCIONAL)
  function actualizarContador(visibles, total) {
    let contador = document.querySelector(".filtros-eventos__contador");

    if (!contador) {
      contador = document.createElement("div");
      contador.className = "filtros-eventos__contador";
      document.querySelector(".filtros-eventos").appendChild(contador);
    }

    contador.textContent = `Mostrando ${visibles} de ${total} eventos`;
    contador.style.display = visibles === total ? "none" : "block";
  }

  // Event listeners - SIN LIMPIAR OTROS FILTROS
  if (inputBuscar) {
    // Usar debounce para mejor performance (esperar 300ms después de que el usuario deje de escribir)
    let timeoutBuscar;
    inputBuscar.addEventListener("input", function () {
      clearTimeout(timeoutBuscar);
      timeoutBuscar = setTimeout(() => {
        filtrarEventos();
      }, 300);
    });
  }

  if (selectCategoria) {
    selectCategoria.addEventListener("change", filtrarEventos);
  }

  if (inputFechaDesde) {
    inputFechaDesde.addEventListener("change", filtrarEventos);
  }

  if (inputFechaHasta) {
    inputFechaHasta.addEventListener("change", filtrarEventos);
  }

  // Función global para limpiar TODOS los filtros
  window.limpiarFiltros = function () {
    inputBuscar.value = "";
    selectCategoria.value = "";
    inputFechaDesde.value = "";
    inputFechaHasta.value = "";
    filtrarEventos();
  };

  // Animación fadeIn y estilos adicionales
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .agenda-eventos__sin-resultados {
      grid-column: 1 / -1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3rem;
      background: white;
      border-radius: 8px;
      margin: 2rem 0;
      min-height: 300px;
    }
    
    .sin-resultados-content {
      text-align: center;
      max-width: 400px;
    }
    
    .sin-resultados-content svg {
      color: #999;
      margin-bottom: 1.5rem;
    }
    
    .agenda-eventos__sin-resultados p {
      font-size: 18px;
      color: #666;
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }
    
    .filtros-eventos__contador {
      grid-column: 1 / -1;
      text-align: center;
      padding: 0.75rem;
      background: #f0f0f0;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      color: #666;
      margin-bottom: 1rem;
    }
  `;
  document.head.appendChild(style);
});
