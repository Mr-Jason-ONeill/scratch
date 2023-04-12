import { component } from "picoapp";
import Swiper, { Pagination } from 'swiper';
import 'swiper/css';

export default component((node, ctx) => {
  // get dataset values
  const carouselEnabled = node.dataset.carouselEnabled === "true";
  const carouselEnabledDesktop = node.dataset.carouselEnabledLg === "true";
  const slidesPerView = node.dataset.slidesPerView === "full" ? 1 : node.dataset.slidesPerView;
  const slidesPerViewDesktop = node.dataset.slidesPerViewLg === "full" ? 1 : node.dataset.slidesPerViewLg;

  var swiper = null;

  const handleResize = () => {
    const isDesktop = window.innerWidth > 960;

    if (
      !swiper && ((isDesktop && carouselEnabledDesktop) || (!isDesktop && carouselEnabled))
    ) {
      swiper = new Swiper(node.querySelector('.swiper'), {
        slideClass: "multi-column-slide",
        slidesPerView: slidesPerView,
        modules: [ Pagination ],
        pagination: {
          el: node.querySelector('.swiper-pagination'),
          type: 'bullets',
          clickable: true,
        },
        breakpoints: {
          960: {
            slidesPerView: slidesPerViewDesktop,
          }
        }
      })
    }

    if (isDesktop && !carouselEnabledDesktop && swiper) {
      swiper.destroy( true, true );
      swiper = null;
    }

    if (!isDesktop && !carouselEnabled && swiper) {
      swiper.destroy( true, true );
      swiper = null;
    }
  }

  // set up a listener
  window.addEventListener('resize', handleResize)
  handleResize();
});