
export function gallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    // Si no existe la galería en esta página, salimos
    if (!galleryGrid) return;

    const loadMoreBtn = document.getElementById('load-more-btn');
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.modal-nav.prev');
    const nextBtn = document.querySelector('.modal-nav.next');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    
    // Configuración inicial basada en el ancho de la pantalla
    const isDesktop = window.innerWidth >= 1024;
    let itemsPerLoad = isDesktop ? 10 : 6;
    let visibleCount = itemsPerLoad;
    let currentImageIndex = 0;

    // --- Paginación / Cargar Más ---
    function updateVisibility() {
        galleryItems.forEach((item, index) => {
            if (index < visibleCount) {
                item.classList.remove('hidden');
                // Simular lazy load visual suave
                item.style.opacity = '1'; 
            } else {
                item.classList.add('hidden');
                item.style.opacity = '0';
            }
        });

        // Ocultar botón si ya no hay más imagenes
        if (visibleCount >= galleryItems.length) {
            if(loadMoreBtn) loadMoreBtn.style.display = 'none';
        } else {
            if(loadMoreBtn) loadMoreBtn.style.display = 'block';
        }
    }

    // Inicializar estado
    updateVisibility();

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleCount = Math.min(visibleCount + itemsPerLoad, galleryItems.length);
            updateVisibility();
        });
    }

    // --- Lightbox / Modal ---
    
    function openModal(index) {
        currentImageIndex = index;
        const imgElement = galleryItems[index].querySelector('img');
        // Usar data-src si existiera, o src
        const imgSrc = imgElement.getAttribute('src');
        
        modalImg.src = imgSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll de fondo
    }

    function closeModalFunc() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { modalImg.src = ''; }, 300); // Limpiar después de la transición
    }

    function showNext(e) {
        if(e) e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        // Pequeño efecto de fade para cambiar imagen
        modalImg.style.opacity = '0.5';
        setTimeout(() => {
            const imgSrc = galleryItems[currentImageIndex].querySelector('img').src;
            modalImg.src = imgSrc;
            modalImg.style.opacity = '1';
        }, 150);
    }

    function showPrev(e) {
        if(e) e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        modalImg.style.opacity = '0.5';
        setTimeout(() => {
            const imgSrc = galleryItems[currentImageIndex].querySelector('img').src;
            modalImg.src = imgSrc;
            modalImg.style.opacity = '1';
        }, 150);
    }

    // Event Listeners para items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openModal(index);
        });
    });

    if (closeModal) closeModal.addEventListener('click', closeModalFunc);
    if (nextBtn) nextBtn.addEventListener('click', showNext);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);

    // Cerrar al hacer click fuera de la imagen
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalFunc();
            }
        });
    }

    // Teclado
    document.addEventListener('keydown', (e) => {
        if (!modal || !modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModalFunc();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
}
