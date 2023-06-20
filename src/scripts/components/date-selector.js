import VMasker from 'vanilla-masker';
import Datepicker from 'flowbite-datepicker/Datepicker';
import { component } from "picoapp";

export default component((node, ctx) => {
  const datepickerElements = node.querySelectorAll('[custom-datepicker]');

  datepickerElements.forEach(dateInput => {
    VMasker(dateInput).maskPattern("99-99-9999")
  
    const datepicker = new Datepicker(dateInput, {
      autohide: true,
      format: "mm-dd-yyyy",
    });

    datepicker.inputField.addEventListener("change", () => {
      // console.log(datepicker)
    })  
  });
  
});