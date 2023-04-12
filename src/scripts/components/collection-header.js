import ScrollMagic from "scrollmagic";
import { component } from "picoapp";

export default component((node, ctx) => {
  /**
   * Pin the nav bar on scroll
   */
  const controller = new ScrollMagic.Controller();
  new ScrollMagic.Scene({
    // duration: 1000,
    offset: 0 - document.querySelector("#shopify-section-header").clientHeight,
    triggerElement: node.querySelector(".sticky-filters"),
    triggerHook: "onLeave",
  })
    .setClassToggle(node.querySelector(".sticky-filters"), "!border-lightGreyWarm")
    .on("enter", (e) => {
      setTimeout(() => {
        document.querySelector("#primary-header").classList.remove("border-b")
      }, 300)
    })
    .on("leave", (e) => {
      document.querySelector("#primary-header").classList.add("border-b")
    })
    .setPin(
      node.querySelector(".sticky-filters"),
      { pushFollowers: false }
    )
    .addTo(controller);

  // track which section is in view
  const sections = document.querySelectorAll(".collection-section");
  sections.forEach((section, i) => {
    
    new ScrollMagic.Scene({
      triggerElement: section,
      offset: -50,
      triggerHook: "onLeave",
      reverse: true,
    })
      .on("enter", (e) => {
        node.querySelectorAll(".pills .pill").forEach((elm) => elm.classList.remove("active"))
        node.querySelector(`#pill-${section.id}`).classList.add("active")
      })
      .on("leave", (e) => {
        node.querySelectorAll(".pills .pill").forEach((elm) => elm.classList.remove("active"))
        // get previous section
        let previousIndex = i - 1;
        (previousIndex >= 0)
          ? node.querySelector(`#pill-${sections[previousIndex].id}`).classList.add("active")  
          : node.querySelector(`#pill-${sections[0].id}`).classList.add("active")  ;
      })
      .addTo(controller);
  })
});