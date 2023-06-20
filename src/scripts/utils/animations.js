import ScrollMagic from "scrollmagic";

export const inializeAnimations = () => {
  const controller = new ScrollMagic.Controller();

  document.querySelectorAll("[data-animate]").forEach((element) => {
    const className = element.dataset.animate;

    if (className === "fade-in") {
      element.classList.add("opacity-0");
      element.classList.add("transition-opacity");
      element.classList.add("duration-700");
    }

    if (className === "grow-width") {
      element.classList.add("w-0");
      element.style.setProperty('--width', element.dataset.animateWidth);
    }

    new ScrollMagic.Scene({
      offset: element.dataset.animateOffset || 100,
      triggerElement: element,
      triggerHook: "onEnter",
    })
      .setClassToggle(element, className)
      .addTo(controller);
  })
}