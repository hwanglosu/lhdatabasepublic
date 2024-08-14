// CITATION
// 3/16/2024
// All below Code is fully Adapted from nodejs-starter-app from CS340 Winter 2024 term
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addSupplierForm = document.getElementById('add-supplier-form-ajax');

// Modify the objects we need
addSupplierForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSupplierName = document.getElementById("input-supplierName");
    let inputDailyCost = document.getElementById("input-dailyCost");


    // Get the values from the form fields
    let supplierNameValue = inputSupplierName.value;
    let dailyCostValue = inputDailyCost.value;


    // Put our data we want to send in a javascript object
    let data = {
        supplierName: supplierNameValue,
        dailyCost: dailyCostValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-supplier-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputSupplierName.value = '';
            inputDailyCost.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from
// gamingSessions
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("suppliers-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 6 cells
    let row = document.createElement("TR");
    let supplierIDCell = document.createElement("TD");
    let supplierNameCell = document.createElement("TD");
    let dailyCostCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    supplierIDCell.innerText = newRow.supplierID;
    supplierNameCell.innerText = newRow.supplierName;
    dailyCostCell.innerText = newRow.dailyCost;
    
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteSupplier(newRow.supplierID);
    };
    
    // Add the cells to the row 
    row.appendChild(supplierIDCell);
    row.appendChild(supplierNameCell);
    row.appendChild(dailyCostCell);
    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.supplierID);

    // Add the row to the table
    currentTable.appendChild(row);

    // Reload page to format all rows the same
    location.reload();

}