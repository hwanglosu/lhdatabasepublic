// CITATION
// 3/16/2024
// All below Code is fully Adapted from nodejs-starter-app from CS340 Winter 2024 term
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addTableForm = document.getElementById('add-table-form-ajax');

// Modify the objects we need
addTableForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputGameID = document.getElementById("input-gameID");
    let inputEmployeesRequired = document.getElementById("input-employeesRequired");
    let inputMoneyEarned = document.getElementById("input-moneyEarned");
    let inputSupplierID = document.getElementById("input-supplierID");
   
    // Get the values from the form fields
    let gameIDValue = inputGameID.value;
    let employeesRequiredValue = inputEmployeesRequired.value;
    let moneyEarnedValue = inputMoneyEarned.value;
    let supplierIDValue = inputSupplierID.value;

    // Put our data we want to send in a javascript object
    let data = {
        gameID: gameIDValue,
        employeesRequired: employeesRequiredValue,
        moneyEarned: moneyEarnedValue,
        supplierID: supplierIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-table-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputGameID.value = '';
            inputEmployeesRequired.value = '';
            inputMoneyEarned.value = '';
            inputSupplierID.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from
// Tables
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("tables-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 6 cells
    let row = document.createElement("TR");
    let tableIDCell = document.createElement("TD");
    let gameIDCell = document.createElement("TD");
    let employeesRequiredCell = document.createElement("TD");
    let moneyEarnedCell = document.createElement("TD");
    let supplierIDCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    tableIDCell.innerText = newRow.tableID;
    gameIDCell.innerText = newRow.gameID;
    employeesRequiredCell.innerText = newRow.employeesRequired;
    moneyEarnedCell.innerText = newRow.moneyEarned;
    supplierIDCell.innerText = newRow.supplierID;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteTable(newRow.tableID);
    };
    
    // Add the cells to the row 
    row.appendChild(tableIDCell);
    row.appendChild(gameIDCell);
    row.appendChild(employeesRequiredCell);
    row.appendChild(moneyEarnedCell);
    row.appendChild(supplierIDCell);
    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.tableID);

    // Add the row to the table
    currentTable.appendChild(row);

    // Reload page to format all rows the same
    location.reload();

}