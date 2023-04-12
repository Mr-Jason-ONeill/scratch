import { component } from "picoapp";
import Swiper, { Pagination, Navigation } from 'swiper';
import 'swiper/css';

export default component(async (node, ctx) => {
  // initialize swiper
  const swiper = new Swiper(node, {
    slideClass: "slide",
    slidesPerView: 2,
    modules: [ Navigation ],
    navigation: {
      nextEl: node.querySelector(".btn-next"),
      prevEl: node.querySelector(".btn-prev")
    },
    breakpoints: {
      1190: {
        slidesPerView: 3
      }
    }
  })
});
