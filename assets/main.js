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

/** add and subtract buttons to edit quantity values.
$(this).val() having just this will without .prev() or .next() 
will revert the quantity back to one on click */

$("#add").click(function() {
  let currentValue = $(this).prev().val();
  if (currentValue <= 99) {
    $(this).prev().val(++currentValue);
  }
});

$("#sub").click(function() {
  let currentValue = $(this).next().val();
  if (currentValue > 1) {
    $(this).next().val(--currentValue);
  }
});


 $('#gift-note').change(function(showGiftCard) {
  if($(this).checked) {
    $('#gift-card').show();
  } else {
    $('#gift-card').hide();
  }
});

