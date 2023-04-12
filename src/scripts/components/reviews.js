import { component } from "picoapp";
import Swiper, { Pagination } from 'swiper';
import 'swiper/css';

export default component(async (node, ctx) => {
  // collect the reviews
  const appKey = window.keys.yotpoPublicKey;
  const response = await fetch(`https://api-cdn.yotpo.com/v1/reviews/${appKey}/filter.json`, {
    method: "POST",
    headers: { "content-type": "application/json"},
    body: JSON.stringify({
      domain_key: "yotpo_site_reviews",
      scores: [5],
      per_page: 8
    })
  })

  if (response.ok) {
    // return;
    const data = await response.json();

    // get template
    const template = node.querySelector("#reviews-article-template");
    const toAdd = document.createDocumentFragment(); // prep
    
    data.response.reviews.forEach(review => {
      const reviewDomEl = template.content.cloneNode(true);
      reviewDomEl.querySelector('.review-body').innerHTML = review.content;
      reviewDomEl.querySelector('.review-author').innerHTML = review.user.display_name;
      toAdd.appendChild(reviewDomEl);
    });

    // remove loading
    node.querySelectorAll('.loading').forEach((loadingNode) => loadingNode.remove());
    node.querySelector('.swiper-wrapper').appendChild(toAdd);

    // after appending - initialize swiper
    const swiper = new Swiper(node.querySelector('.swiper'), {
      slideClass: "slide",
      slidesPerView: 1,
      modules: [ Pagination ],
      pagination: {
        el: node.querySelector('.swiper-pagination'),
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {
        1160: {
          slidesPerView: 3
        }
      }
    })
  }
});