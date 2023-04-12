export const inializeFormValidations = async () => {
  // get all forms
  document.querySelectorAll('form').forEach((form) => {
    // if form has novalidate on it, return here...

    // form.addEventListener("submit", (e) => {
    //   form.querySelectorAll('input, textarea').forEach((formElement) => {
    //     if (formElement.validity.valid) {
    //       formElement.classList.remove("invalid")
    //     } else {
    //       formElement.classList.add("invalid")
    //     }

    //     handleErrors(formElement);
    //   })
    // })

    // get all inputs, selects and textareas inside form=
    form.querySelectorAll('input, textarea').forEach((formElement) => {
      // add change event
      formElement.addEventListener("input", (e) => {
        // check validation
        if (formElement.validity.valid) {
          formElement.classList.remove("invalid")
        } else {
          formElement.classList.add("invalid")
        }

        handleErrors(formElement);
      })
    })
  })

  const handleErrors = (input) => {
    let errorNode = input.nextElementSibling;
    if (!errorNode || errorNode && !errorNode.classList.contains("error")) {
      errorNode = document.createElement("span");
      input.after(errorNode)
    }

    // hide error node
    errorNode.style.display = input.validity.valid ? "none" : "inline-block";

    if (input.validity.valueMissing) {
      errorNode.textContent = "This is a required field.";
    } else if (input.validity.typeMismatch) {
      errorNode.textContent = "Entered value needs to be an email address.";
    } else if (input.validity.tooShort) {
      errorNode.textContent = `Field should be at least ${input.minLength} characters; you entered ${input.value.length}.`;
    }
  }
}