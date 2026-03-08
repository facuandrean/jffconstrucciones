export function slider() {
    const $slides = document.querySelectorAll('.slider-slide');
    const $nextBtn = document.querySelector('.slider-btns .next');
    const $prevBtn = document.querySelector('.slider-btns .prev');

    let i = 0;
    let time = 8000;
    let touchStartX;
    let touchEndX;

    function autoSlide() {
        $slides[i].classList.remove('active');
        i++;

        if (i >= $slides.length) {
            i = 0;
        }

        $slides[i].classList.add('active');
        resetTimer();
    }

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(() => {
            autoSlide();
        }, time);
    }

    let timer = setInterval(() => {
        autoSlide();
    }, time);


    function prevSlide() {
        $slides[i].classList.remove('active');
        i--;

        if (i < 0) {
            i = $slides.length - 1;
        }

        $slides[i].classList.add('active');
        resetTimer();
    }

    function nextSlide() {
        $slides[i].classList.remove('active');
        i++;

        if (i >= $slides.length) {
            i = 0;
        }

        $slides[i].classList.add('active');
        resetTimer();
    }

    $prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
    });

    $nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
    });

    document.addEventListener('touchstart', (event) => {
        if (event.target.offsetParent.classList[0] === "slider-slide") {
            touchStartX = event.touches[0].clientX;
        }
    });

    document.addEventListener('touchend', (event) => {
        if (event.target.offsetParent.classList[0] === "slider-slide") {
            
            touchEndX = event.changedTouches[0].clientX;
            const gestureDistance = touchStartX - touchEndX;
            
            if (gestureDistance > 50) {
                nextSlide();
            } else if (gestureDistance < -50) {
                prevSlide();
            }
        }
    });



}