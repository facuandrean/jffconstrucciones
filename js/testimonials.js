document.addEventListener('DOMContentLoaded', () => {
    const testimonialContainer = document.getElementById('testimonial-container');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let testimonials = [];
    let currentIndex = 0;

    async function loadTestimonials() {
        try {
            const response = await fetch('data/testimonials.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            testimonials = await response.json();
            renderTestimonial(currentIndex);
        } catch (error) {
            console.error('Error loading testimonials:', error);
            testimonialContainer.innerHTML = '<p>No se pudieron cargar los testimonios en este momento.</p>';
        }
    }

    function renderTestimonial(index) {
        if (testimonials.length === 0) return;

        const testimonial = testimonials[index];
        
        // Generate stars
        let starsHtml = '';
        for (let i = 0; i < testimonial.rating; i++) {
            starsHtml += '<i class="fa-solid fa-star"></i>';
        }

        const html = `
            <div class="testimonial-card fade-in">
                <div class="testimonial-icon">
                    <i class="fa-solid fa-quote-right"></i>
                </div>
                <div class="testimonial-stars">
                    ${starsHtml}
                </div>
                <p class="testimonial-quote">"${testimonial.quote}"</p>
                <div class="testimonial-divider"></div>
                <h4 class="testimonial-author">${testimonial.author}</h4>
                <p class="testimonial-role">${testimonial.role}</p>
                <div class="testimonial-project-tag">${testimonial.project}</div>
            </div>
        `;

        testimonialContainer.innerHTML = html;
        
        // Remove fade-in class after animation to allow re-triggering
        const card = testimonialContainer.querySelector('.testimonial-card');
        card.addEventListener('animationend', () => {
            card.classList.remove('fade-in');
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (testimonials.length > 0) {
                currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                renderTestimonial(currentIndex);
            }
        });

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (testimonials.length > 0) {
                currentIndex = (currentIndex + 1) % testimonials.length;
                renderTestimonial(currentIndex);
            }
        });
    }

    loadTestimonials();
});
