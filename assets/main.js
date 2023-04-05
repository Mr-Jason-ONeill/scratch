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

$('.shopify-product-form').on('submit', callback);


/**
 * ADDING A GIFT NOTE
 */
$('.gift-note').change(function(e) {
  const inputChecked = this.checked;
  const $input = $(this);
  
  if (inputChecked) {
    $input.next().next().show();
  } else {
    $input.next().next().hide();
  }
});


/** add and subtract buttons to edit quantity values.
$(this).val() having just this will without .prev() or .next() 
will revert the quantity back to one on click */

$(".qty-add").click(function() {
  const $input = $(this).prev();
  const maxValue = $input.attr("max");
  
  let currentValue = $(this).prev().val();
  if (currentValue <= parseInt(maxValue)) {
    $input.val(++currentValue);
    $input.trigger('change');
  }
});

$(".qty-sub").click(function() {
  const $input = $(this).next();
  let currentValue = $input.val();
  if (currentValue > 1) {
    $input.val(--currentValue);
    $input.trigger('change');
  }
});

/**
 * When the input changes, run an ajax call 
 * to update the quantity of the line item.
 */
$(".quantity").on("change", function (e) {
  const newValue = this.value;
  const key = this.dataset.key;

  $.post('/cart/update.js',
    {
      updates: {
        [key]: newValue
      }
    },
    function (data) {
      console.log(data);
      $('.current-total').html(data.total_price)

    },
    "json"
  )
})

/**
 * Remove button to clear line item without refreshing page
 * using ajax
 */

// TO DO:
// - Need to find the line item
// - Once remove button is clicked
// - Delete item or update quantity to 0 
// - Display a message box - to say item removed


$('#remove').on('click', function(removing) {
  removing.preventDefault();
  let lineItemId = $(this).data('line-item-id');
});
 
  function removeLineItem(lineItemId) {

    let data = {
      lineItemId,
      quantity: 0,
      location: '/cart'
    };
  
    $.post('/cart/change.js',
      data,
      function() {
      console.log(data);
    }, 
    "json"
    ); 
  }
