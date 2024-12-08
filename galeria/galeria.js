document.addEventListener("DOMContentLoaded", () => {
    // Selecciona todos los enlaces de la galería
    const links = document.querySelectorAll("#galeria a");
    const popUps = document.querySelectorAll(".PopUp");
    const closeButtons = document.querySelectorAll(".close");
  
    // Añade un evento click a cada enlace
    links.forEach((link, index) => {
      link.addEventListener("click", (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del enlace
        const popupId = `im-${index + 1}`;
        const popup = document.getElementById(popupId);
  
        if (popup) {
          popup.classList.remove("ocultar"); // Muestra el popup
        }
      });
    });
  
    // Añade un evento click a cada botón de cierre
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const popup = button.closest(".PopUp");
        if (popup) {
          popup.classList.add("ocultar"); // Oculta el popup
        }
      });
    });
  });
  