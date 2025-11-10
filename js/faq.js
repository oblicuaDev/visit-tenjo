document.addEventListener("DOMContentLoaded", function () {
  // Verificar que estamos en la página de FAQ
  const faqSection = document.querySelector(".faq");
  if (!faqSection) return;

  // Seleccionar todos los botones de preguntas
  const faqQuestions = document.querySelectorAll(".faq__question");

  // Función para cerrar todos los acordeones
  function closeAllAccordions() {
    faqQuestions.forEach((question) => {
      const item = question.closest(".faq__item");
      question.setAttribute("aria-expanded", "false");
      item.classList.remove("is-active");
    });
  }

  // Función para abrir un acordeón específico
  function openAccordion(question) {
    const item = question.closest(".faq__item");
    question.setAttribute("aria-expanded", "true");
    item.classList.add("is-active");
  }

  // Agregar event listener a cada pregunta
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true";

      // Cerrar todos los acordeones
      closeAllAccordions();

      // Si el acordeón estaba cerrado, abrirlo
      if (!isExpanded) {
        openAccordion(this);
      }
    });
  });

  // Opcional: Abrir el primer acordeón por defecto
  // if (faqQuestions.length > 0) {
  //   openAccordion(faqQuestions[0]);
  // }

  // Animación suave al hacer scroll a una pregunta desde un enlace
  const faqItems = document.querySelectorAll(".faq__item");
  faqItems.forEach((item, index) => {
    item.style.animation = `fadeIn 0.4s ease ${index * 0.1}s both`;
  });

  // Añadir animación CSS
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
});
