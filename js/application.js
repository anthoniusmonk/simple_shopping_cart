$(document).ready(function() {
  // Function to update the totals and total price for the cart
  function updateTotals() {
    let totalCartValue = 0;

    // Iterate over each row in the table body
    $('tbody tr').each(function() {
      var price = parseFloat($(this).find('.price').text().replace('$', ''));
      var quantity = parseInt($(this).find('input[type="number"]').val());

      // Calculate the total for the current row
      var total = price * quantity;

      // Update the total price for the current row
      $(this).find('.total').text(`$${total.toFixed(2)}`);
      
      totalCartValue += total;
    });
    
    // Update the total cart value in the DOM
    $('#shoppingCartValue').text(totalCartValue.toFixed(2));
  }

  // Initial call to update the totals when the page loads
  updateTotals();

  // Event listener for changes in quantity inputs
  $('tbody').on('input', 'input[type="number"]', function() {
    updateTotals();
  });

  // Event listener for clicks on the remove buttons
  $('tbody').on('click', '.remove', function() {
   $(this).closest('tr').remove();
   updateTotals(); 
  });

  // Event Listener for the form submission to add new items
  $('#addItem').on('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Extract the item name and price from the form inputs
    var item = $(this).find('input[name="item"]').val();
    var price = parseFloat($(this).find('input[name="price"]').val());

    // // Create a new row for the table with the new item details
    if (item && !isNaN(price)) {
      var newRow = `
      <tr>
          <td class="item">${item}</td>
          <td class="price">$${price.toFixed(2)}</td>
          <td class="quantity">QTY<input type="number" value="1" /><button class="btn btn-light btn-sm remove">remove</button></td>
          <td class="total"></td>
      </tr>
      `;
      // Append the new row to the table body
      $('tbody').append(newRow);

      // Update the new totals after adding the new item
      updateTotals();

      // Reset the form inputs
      $(this).trigger('reset');
    } else {
      alert("Please enter a valid item and price.");
    }
  });
});