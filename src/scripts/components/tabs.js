import { Tabs } from 'flowbite';
import { component } from "picoapp";

export default component((node, ctx) => {
  const triggerElements = node.querySelectorAll("button.trigger");
  if (!triggerElements) return;

  const triggerElementArray = Array.prototype.slice.call(triggerElements);

  const tabElements = triggerElementArray.map((el) => {
    return (
      {
        id: el.id,
        triggerEl: el,
        targetEl: document.querySelector(el.dataset.tabsTarget)
      }
    )
  })


  // options with default values
  const options = {
    activeClasses: '!text-black hover:text-black border-yellowMedium',
    inactiveClasses: 'text-gray-900 hover:text-black !border-transparent',
  };

  const tabs = new Tabs(tabElements, options);
});