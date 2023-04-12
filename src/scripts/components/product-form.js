import { Modal } from 'flowbite';
import { findTrimesterFromDate } from "../utils/findTrimesterFromData.ts";
import { component } from "picoapp";

export default component((node, ctx) => {
  let parsedProduct = false;
  if (document.getElementById("main-product-wrapper")) {
    parsedProduct = JSON.parse(
      document.getElementById("main-product-wrapper")
        .querySelector('[type="application/json"]')
        .textContent
      );
  }
  

  /**
   * Attach submission event to form element
   */
  node.addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const loaders = form.querySelectorAll(".loader");
    loaders.forEach((loader) => loader.style.display = "inline")

    // check due date first
    if (await handleProductSuggestion(e) === false) {
      loaders.forEach((loader) => loader.style.display = "none")
      return;
    }

    // submit the form
    await handleFormSubmit(e, ctx);
  })

  /**
   * Handles product suggestion when a due
   * date is not suitable for current product
   * 
   * Return true or false to indicate whether to 
   * continue to form submission
   */
  const handleProductSuggestion = async (e) => {
    const expectedDate = e.currentTarget.querySelector("#expected-date");
    if (!expectedDate) return true;

    // if entry found but not filled in
    // focus on input and add an error? 
    if (!expectedDate.value) {
      return false;
    }

    // get the recommended products for the current trimester
    const date = new Date(expectedDate.value);
    const recommendedTrimesterProductsAll = findTrimesterFromDate(date.toISOString());
    const recommendedTrimesterProducts = recommendedTrimesterProductsAll.filter((handle) => 
      handle != parsedProduct.handle
    );

    if (!recommendedTrimesterProducts.length) return true;

    // get recommended product information here
    const response = await fetch (`${window.Shopify.routes.root}products/${recommendedTrimesterProducts[0]}.json`);
    const { product } = await response.json();

    const template = document.querySelector("#trimester-switch-modal");
    const toAdd = document.createDocumentFragment(); // prep
    const modalDomEl = template.content.cloneNode(true);

    // update template values 
    modalDomEl.querySelectorAll('.product-name').forEach((el) => el.innerHTML = product.title);
    modalDomEl.querySelector('.variant-image').src = product.image.src;
    modalDomEl.querySelector('.variant-image').alt = product.image.alt;
    modalDomEl.querySelector('.variant-link').href = `/products/${product.handle}`;
    modalDomEl.querySelector('.close-modal').addEventListener("click", () => { modal.hide() })

    toAdd.append(modalDomEl);
    document.body.appendChild(toAdd);

    const options = {
      placement: 'center-center',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900 bg-opacity-50 fixed inset-0 z-50',
      closable: true,
    };

    // the modal is now added to the DOM
    const modal = new Modal(document.getElementById("modalEl"), options);

    modal.show();
    
    return false;
  }
});

export const handleFormSubmit = async (e, ctx) => {
  e.preventDefault();

  // update asyncrounously
  const form = e.currentTarget || e.target;
  const loaders = form.querySelectorAll(".loader");
  loaders.forEach((loader) => loader.style.display = "inline")

  // convert form data to object
  const formData = new FormData(form);
  const formDataObj = {};
  formData.forEach((value, key) => {
    formDataObj[key] = value
  });

  formDataObj['sections'] = ["cart-drawer-items", "cart-drawer-footer", "cart-item-count"];
  formDataObj['sections_url'] = window.location.pathname;

  const params = new URLSearchParams();
  Object.keys(formDataObj).forEach(key => {
    params.append(key, formDataObj[key]);
  });

  const serializedString = params.toString();

  try {
    const response = await fetch(`${window.Shopify.routes.root}cart/add.js?${serializedString}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    ctx.emit("cart-render", { data })
    ctx.emit("cart-open");

  } catch (error) {
    console.warn("Could not add product")
  } finally {
    loaders.forEach((loader) => loader.style.display = "none")
  }
}