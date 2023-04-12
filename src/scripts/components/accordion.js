import { Accordion } from 'flowbite';
import { component } from "picoapp";

export default component((node, ctx) => {
  const showMoreBtn = node.querySelector(".show-more");

  showMoreBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    // remove all hidden classes
    node.querySelectorAll(".accordion-wrapper").forEach(element => {
      element.classList.remove("hidden")
    });

    e.currentTarget.classList.add("hidden");
  })
});