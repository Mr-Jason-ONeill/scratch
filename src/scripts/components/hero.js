import { component } from "picoapp";
import Swiper, { Pagination } from 'swiper';
import 'swiper/css';

export default component((node, ctx) => {
  // get data attributes
  const slideshowEnabled = (node.dataset.slideshowEnabled === 'true');
  if (!slideshowEnabled) return;

  // initialize swiper
  const swiper = new Swiper(node.querySelector('.swiper-container'), {
    modules: [ Pagination ],
    pagination: {
      el: node.querySelector('.swiper-pagination'),
      type: 'bullets',
      clickable: true,
    },
  })
});