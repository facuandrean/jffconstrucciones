import { header } from './header.js';
import { btnNav } from './btn-nav.js';
import { nav } from './nav.js';
import { loader } from './img.js';
import { gallery } from './gallery.js';

document.addEventListener('DOMContentLoaded', () => {
    header();
    btnNav();
    nav();
    gallery();
    loader();
})
