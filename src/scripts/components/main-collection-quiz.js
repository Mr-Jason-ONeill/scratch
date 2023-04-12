import { component } from "picoapp";

export default component((node, ctx) => {
  const closeButton = node.querySelectorAll(".close-trigger")[0];
  closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    node.style.display = "none"
  })
});
