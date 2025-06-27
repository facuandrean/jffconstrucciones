// Funcionalidad de zoom y pan para imágenes en modales
document.addEventListener('DOMContentLoaded', function () {
  // Seleccionar todas las imágenes dentro de modales
  const modalImages = document.querySelectorAll('.modal-body img');

  modalImages.forEach(img => {
    let isZoomed = false;
    let isDragging = false;
    let hasDragged = false;
    let startX, startY, translateX = 0, translateY = 0;
    let currentScale = 1;

    // Función para aplicar transformaciones
    function applyTransform() {
      img.style.transform = `scale(${currentScale}) translate(${translateX}px, ${translateY}px)`;
    }

    // Función para resetear transformaciones
    function resetTransform() {
      currentScale = 1;
      translateX = 0;
      translateY = 0;
      applyTransform();
    }

    // Función para limitar el desplazamiento
    function constrainPan() {
      const imgRect = img.getBoundingClientRect();
      const modalRect = img.closest('.modal-body').getBoundingClientRect();

      const maxTranslateX = (imgRect.width * currentScale - modalRect.width) / 2;
      const maxTranslateY = (imgRect.height * currentScale - modalRect.height) / 2;

      translateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, translateX));
      translateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, translateY));
    }

    // Evento de clic para zoom
    img.addEventListener('click', function (e) {
      // Solo hacer zoom si no se ha arrastrado
      if (!hasDragged) {
        e.preventDefault();

        if (isZoomed) {
          // Quitar zoom
          currentScale = 1;
          translateX = 0;
          translateY = 0;
          this.style.cursor = 'zoom-in';
          isZoomed = false;
        } else {
          // Aplicar zoom
          currentScale = 1.5;
          this.style.cursor = 'grab';
          isZoomed = true;
        }

        applyTransform();
        this.style.transition = 'transform 0.3s ease-in-out';
      }
    });

    // Eventos de mouse para arrastrar
    img.addEventListener('mousedown', function (e) {
      if (isZoomed && currentScale > 1) {
        isDragging = true;
        hasDragged = false;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        this.style.cursor = 'grabbing';
        this.style.transition = 'none';
        e.preventDefault();
      }
    });

    document.addEventListener('mousemove', function (e) {
      if (isDragging && isZoomed) {
        const deltaX = Math.abs(e.clientX - startX - translateX);
        const deltaY = Math.abs(e.clientY - startY - translateY);

        // Si se movió más de 5px, considerar que está arrastrando
        if (deltaX > 5 || deltaY > 5) {
          hasDragged = true;
        }

        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        constrainPan();
        applyTransform();
      }
    });

    document.addEventListener('mouseup', function () {
      if (isDragging) {
        isDragging = false;
        img.style.cursor = 'grab';
        img.style.transition = 'transform 0.1s ease-out';

        // Resetear hasDragged después de un pequeño delay
        setTimeout(() => {
          hasDragged = false;
        }, 100);
      }
    });

    // Eventos de touch para dispositivos móviles
    img.addEventListener('touchstart', function (e) {
      if (isZoomed && currentScale > 1 && e.touches.length === 1) {
        isDragging = true;
        hasDragged = false;
        const touch = e.touches[0];
        startX = touch.clientX - translateX;
        startY = touch.clientY - translateY;
        this.style.transition = 'none';
        e.preventDefault();
      }
    });

    img.addEventListener('touchmove', function (e) {
      if (isDragging && isZoomed && e.touches.length === 1) {
        const touch = e.touches[0];
        const deltaX = Math.abs(touch.clientX - startX - translateX);
        const deltaY = Math.abs(touch.clientY - startY - translateY);

        // Si se movió más de 5px, considerar que está arrastrando
        if (deltaX > 5 || deltaY > 5) {
          hasDragged = true;
        }

        translateX = touch.clientX - startX;
        translateY = touch.clientY - startY;
        constrainPan();
        applyTransform();
        e.preventDefault();
      }
    });

    img.addEventListener('touchend', function () {
      if (isDragging) {
        isDragging = false;
        this.style.transition = 'transform 0.1s ease-out';

        // Resetear hasDragged después de un pequeño delay
        setTimeout(() => {
          hasDragged = false;
        }, 100);
      }
    });

    // Establecer cursor inicial
    img.style.cursor = 'zoom-in';

    // Resetear zoom cuando se cierra el modal
    const modal = img.closest('.modal');
    if (modal) {
      modal.addEventListener('hidden.bs.modal', function () {
        resetTransform();
        img.style.cursor = 'zoom-in';
        isZoomed = false;
        isDragging = false;
        hasDragged = false;
      });
    }

    // Prevenir comportamiento por defecto del navegador
    img.addEventListener('dragstart', function (e) {
      e.preventDefault();
    });
  });
}); 