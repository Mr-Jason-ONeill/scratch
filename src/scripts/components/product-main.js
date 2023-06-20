import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { component } from "picoapp";
import customSelect from 'custom-select';
import Swiper, { Thumbs, Pagination } from 'swiper';
import 'swiper/css';
import ScrollMagic from "scrollmagic";

export default component((node, ctx) => {
  /**
   * Run to initialize gallery carousel
   * 
   */
  const intializeGallery = () => {
    // initialize swiper
    const thumbnails = new Swiper(node.querySelector('.swiper-thumbnails'), {
      modules: [ Thumbs ],
      slidesPerView: 4,
    })

    const swiper = new Swiper(node.querySelector('.swiper'), {
      modules: [ Thumbs, Pagination ],
      thumbs: {
        swiper: thumbnails
      },
      pagination: {
        el: node.querySelector('.swiper-pagination'),
        type: 'bullets',
        clickable: true,
      },
    })

    const lightbox = new PhotoSwipeLightbox({
      gallery: '#product-main-gallery',
      mainClass: 'pswp--custom-bg',
      children: '.swiper-slide',
      bgOpacity: 0.6,
      pswpModule: () => import('photoswipe')
    });
    lightbox.init();
  }

  /**
   * Handle Variant selectors
   * 
   */
  const handleVariants = () => {
    customSelect(node.querySelectorAll('.select__select'))
    const parsedProduct = JSON.parse(node.querySelector('[type="application/json"]').textContent);

    const selectCallback = (variant, product) => {
      const productId = product.id;
      const price = Shopify.formatMoney(variant.price, '${{amount}}');
      ctx.hydrate({ currentVariant: variant });
  
      // update prices
      node.querySelectorAll(`.product-price-${productId} .price`).forEach((priceNode) => {
        priceNode.innerHTML = price;
      })

      // update master select id
      const input = node.querySelector('input[name="id"]');
      input.value = variant.id;
      input.dispatchEvent(new Event('change', { bubbles: true }));

      // update url
      if (!variant) return;
      window.history.replaceState({ }, '', `?variant=${variant.id}`);
    }
  
    // stop if only one variant
    if (parsedProduct.variants.length === 1) {
      ctx.hydrate({ currentVariant: parsedProduct.variants[0] });
      return;
    }

    // find current variant
    node.querySelector('.select__select').addEventListener("change", function (e) {
      const selectedOptions = Array.from(node.querySelectorAll('.select__select'), (select) => select.value);
  
      const currentVariant = parsedProduct.variants.find((variant) => {
        return !variant.options.map((option, index) => {
          return selectedOptions[index] === option;
        }).includes(false);
      });
  
      selectCallback(currentVariant, parsedProduct)
    })
  }

  /**
   * Handle read more button in the product description
   */
  const handleReadmore = () => {
    const readMoreBtn = document.querySelector(".read-more");
    const truncatedText = document.querySelector('.product-description-truncated');
    const fullText = document.querySelector('.product-description-full');

    readMoreBtn.addEventListener('click', function() {
      if (fullText.style.display === 'none') {
        fullText.style.display = 'block';
        truncatedText.style.display = 'none';
        readMoreBtn.textContent = 'Read less';
      } else {
        fullText.style.display = 'none';
        truncatedText.style.display = 'block';
        readMoreBtn.textContent = 'Read more';
      }
    });
  }

  /**
   * Handle showing/hiding key points like 
   * free shipping and cancel anytime based on 
   * selected purchase type and price.
   */
  const handleKeyPoints = () => {
    // get selected purchase price
    const sellingPlanSelect = node.querySelector("select[name=selling_plan]");
    const freeShipping = node.querySelector(".free-shipping");
    const cancelAnytime = node.querySelector(".cancel-anytime");

    sellingPlanSelect.addEventListener("change", (e) => {
      const { price } = ctx.getState().currentVariant;

      const selling_plan_id = e.currentTarget.value;
      if (!selling_plan_id) {
        freeShipping.style.display = price < 5800 ? "none" : "flex"
        cancelAnytime.style.display = "none"
      } else {
        freeShipping.style.display = "flex"
        cancelAnytime.style.display = "flex"
      }
    })
  }

  /**
   * Handle sticky submit button on mobile
   */
  const handleStickySubmit = () => {
    const stickyATC = document.querySelector(".sticky-atc");
    const controller = new ScrollMagic.Controller();
    new ScrollMagic.Scene({
      triggerElement: document.querySelector("#primary-submit-button"),
      offset: -300,
      triggerHook: "onLeave",
      duration: document.querySelector("#MainContent").clientHeight
    })
      .on("enter", (e) => {
        stickyATC.classList.remove("translate-y-full")
      })
      .on("leave", (e) => {
        stickyATC.classList.add("translate-y-full")
      })
      .addTo(controller);
  }
  

  intializeGallery();
  handleVariants();
  // handleReadmore();
  handleKeyPoints();
  handleStickySubmit();
});