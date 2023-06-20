import { handleFormSubmit } from "../components/product-form";
import { component } from "picoapp";
import { Drawer } from 'flowbite';


export default component((node, ctx) => {
  /**
   * Handle drawer
   */
  const drawer = new Drawer(document.getElementById('cart-drawer'), {
    placement: 'right',
    backdropClasses: 'bg-gray-900 opacity-50 fixed inset-0 z-40 transition-all duration-500',
  });

  document.querySelectorAll('[data-custom-drawer-show="cart-drawer"').forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      drawer.show();
    })
  })

  document.querySelectorAll('[data-custom-drawer-hide="cart-drawer"').forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      drawer.hide();
    })
  })

  ctx.on("cart-open", state => { drawer.show() });
  ctx.on("cart-render", ({ data }) => { renderSections(data) });

  const selectors = {
    remove: ".remove-btn",
    subscribe: ".subscribe-btn",
    upsell: ".cart-drawer-upsell-form",
  }

  const sectionsToRender = [
    {
      id: "cart-drawer-items", // id of the shopify section
      section: "cart-drawer-items", // the name of the section to collect
      selector: ".shopify-section", // class name where the section will be rendered
    },
    {
      id: "cart-drawer-footer",
      section: "cart-drawer-footer",
      selector: ".shopify-section",
    },
    {
      id: "cart-item-count",
      section: "cart-item-count",
      selector: ".shopify-section",
    }
  ]

  /**
   * Helper functions
   * 
   * @param {*} html 
   * @param {*} selector 
   * @returns 
   */
  const getSectionInnerHTML = (html, selector) => {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  const attachEvents = () => {
    // attach events for product remove
    document.querySelectorAll(selectors.remove).forEach((el) => 
      el.addEventListener("click", handleProductRemove));

    document.querySelectorAll(selectors.subscribe).forEach((el) => 
      el.addEventListener("click", handleSellingPlanSwitch));

    document.querySelectorAll(selectors.upsell).forEach((el) => 
      el.addEventListener("submit", (e) => handleFormSubmit(e, ctx)));
  }

  const renderSections = (parseData) => {
    sectionsToRender.forEach((section) => {
      const elementToUpdate = document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
      elementToUpdate.innerHTML = getSectionInnerHTML(parseData.sections[section.section], section.selector)
    });

    attachEvents();
  }

  /**
   * Handle product remove
   * 
   */
  const handleProductRemove = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({
      updates: {[e.currentTarget.dataset.key]: 0},
      sections: sectionsToRender.map(section => section.section),
      sections_url: window.location.pathname
    });

    try {
      const response = await fetch(`${window.Shopify.routes.root}cart/update.js`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body
      });

      const data = await response.json();
      renderSections(data);

    } catch (error) {
      console.warn("Could not remove product")
    }
  }

  /**
   * 
   * 
   * @param {*} e 
   */
  const handleSellingPlanSwitch = async (e) => {
    const body = JSON.stringify({
      id: e.currentTarget.dataset.key,
      selling_plan: e.currentTarget.dataset.sellingPlanId,
      sections: sectionsToRender.map(section => section.section),
      sections_url: window.location.pathname
    });

    try {
      const response = await fetch(`${window.Shopify.routes.root}cart/change.js`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body
      });

      const data = await response.json();
      renderSections(data);

    } catch (error) {
      console.warn("Could not remove product")
    }
  }

  /** 
   * Attach all event listeners after sections have been re-rendered
   */
  attachEvents();
});