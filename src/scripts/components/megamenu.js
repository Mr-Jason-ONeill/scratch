import { component } from "picoapp";

export default component((node, ctx) => {
  const hoverTrigger = document.querySelector(`[data-link-handle=${node.dataset.megamenuId}]`);

  hoverTrigger.addEventListener("mouseenter", () => {
    node.style.opacity = 1;
    node.style.pointerEvents = "all";
    if (!ctx.getState().backdrop) {
      ctx.emit("toggleBackdrop", { backdrop: true });
    }
  })

  hoverTrigger.addEventListener("mouseleave", () => {
    node.style.opacity = 0;
    node.style.pointerEvents = "none";
    if (ctx.getState().backdrop) {
      ctx.emit("toggleBackdrop", { backdrop: false });
    }
  })
});