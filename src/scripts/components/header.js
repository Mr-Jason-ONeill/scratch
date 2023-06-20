import ScrollMagic from "scrollmagic";
import { component } from "picoapp";

export default component((node, ctx) => {
  const menuTrigger = node.querySelector('#mobile-menu-trigger');
  const menu = document.querySelector('#mobile-menu');


  menuTrigger.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("active");

    if (!ctx.getState().backdrop) {
      menu.style.transform = "translateX(0)";
      ctx.emit("toggleBackdrop", { backdrop: true });
    } else {
      menu.style.transform = "translateX(-100%)";
      ctx.emit("toggleBackdrop", { backdrop: false });
    }
  })

  const container = node.querySelectorAll('.container')[0];
  document.documentElement.style.setProperty('--x-gutter', container.getBoundingClientRect().left + 28 + "px");

  // apply classes after scroll
  const controller = new ScrollMagic.Controller();
  new ScrollMagic.Scene({
    offset: 100,
  })
    .on("enter", (e) => {
      node.classList.add("border-b");
    })
    .on("leave", (e) => {
      node.classList.remove("border-b");
    })
    .addTo(controller);

  /**
   * Update on window resize
   */
  window.addEventListener("resize", function () {
    document.documentElement.style.setProperty('--x-gutter', container.getBoundingClientRect().left + 28 + "px");
  })
});