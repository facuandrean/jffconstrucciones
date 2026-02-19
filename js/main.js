import { btnNav } from './btn-nav.js';
import { slider } from './carousel.js';
import { formFS } from './form-FS.js';
import { header } from './header.js';
import { scroll } from './scroll.js';
import { nav } from './nav.js';
import { scrollSpy } from './scroll-spy.js';
import { carousel, carouselAfter, carouselBefore } from './glider.js';

document.addEventListener('DOMContentLoaded', () => {
    header();
    btnNav();
    slider();
    formFS();
    scroll();
    nav();
    scrollSpy();
    carousel();
})