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
      $('.current-total').html(Shopify.formatMoney(data.total_price, '${{amount}}'))

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

$('.remove').on('click', function(e) {
  e.preventDefault();
  let lineItemKey = $(this).data('line-item-key');
  if (lineItemKey) removeLineItem(lineItemKey);
});
 
function removeLineItem(lineItemKey) {
  const $lineItemRow = $(".line-item-area[data-line-item-key=\"" + lineItemKey + "\"]");

  let data = {
    id: lineItemKey,
    quantity: 0,
  };

  const onSuccess = function (data) {
    $lineItemRow.remove();
    $('.current-total').html(Shopify.formatMoney(data.total_price, '${{amount}}')); 
  }

  $.post(
    '/cart/change.js',
    data,
    onSuccess,
    "json"
  );
}

$(document).ready(function(){
  $('.carousel-inner').slick({
    slidesToShow: 3, // Number of blocks to display at once
    slidesToScroll: 1, // Number of blocks to scroll at a time
    autoplay: true, // Autoplay the carousel
    autoplaySpeed: 2000 // Autoplay speed in milliseconds
  });
});
