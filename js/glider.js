export function carousel() {
    new Glider(document.querySelector('.glider .glider-list'), {
        slidesToShow: 3,
        slidesToScroll: 3,
        draggable: false,
        dots: '.glider-indicators',
        arrows: {
            prev: '.glider-prev',
            next: '.glider-next'
        }
    });
};

export function carouselBefore () {
    new Glider(document.querySelector('#glider-before .glider-list'), {
        slidesToShow: 3,
        slidesToScroll: 3,
        draggable: false,
        dots: '#glider-before .glider-indicators',
        arrows: {
            prev: '#glider-before .glider-prev',
            next: '#glider-before .glider-next'
        }
    });
};

export function carouselAfter () {
    new Glider(document.querySelector('#glider-after .glider-list'), {
        slidesToShow: 3,
        slidesToScroll: 3,
        draggable: false,
        dots: '#glider-after .glider-indicators',
        arrows: {
            prev: '#glider-after .glider-prev',
            next: '#glider-after .glider-next'
        }
    })
};