// CITATION
// 3/16/2024
// All below Code is fully Adapted from nodejs-starter-app from CS340 Winter 2024 term
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteSupplier(supplierID) {
    let link = '/delete-supplier-ajax/';
    let data = {
      id: supplierID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(supplierID);
      }
    });
  }
  
function deleteRow(supplierID){

    let table = document.getElementById("suppliers-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == supplierID) {
            table.deleteRow(i);
            break;
       }
    }
}
