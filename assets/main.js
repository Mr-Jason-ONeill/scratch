const callback = function (e) {
  e.preventDefault();

  const $form = $(e.currentTarget);
  const id = $form.find('select[name=id]').val();

  /**
   * Add product as serialized string
   */
  const serializedData = $form.serialize();

  /**
   * Add product as object
   */
  const objectData = {
    items: [
      {
       id: id,
       quantity: 1
      }
    ]
  }
  

  $.post(
    '/cart/add.js', 
    objectData,
    function (data) {
      $('.on-success-form').show();
    },
    "json"
  );
}

$('.shopify-product-form').on('submit', callback)