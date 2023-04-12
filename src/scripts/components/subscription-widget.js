import { component } from "picoapp";

export default component((node, ctx) => {
  const sellingPlanSelect = node.querySelector("select[name=selling_plan]");
  const purchaseTypeInputs = node.querySelectorAll("[name=purchase_type]");
  purchaseTypeInputs.forEach((el) => {
    el.addEventListener("change", (e) => {
      sellingPlanSelect.selectedIndex = (e.currentTarget.id === "one-time") ? "-1" : "0";
      sellingPlanSelect.dispatchEvent(new Event('change', { bubbles: true }));
    })
  })
});
