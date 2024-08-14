// CITATION
// 3/16/2024
// All below Code is fully Adapted from nodejs-starter-app from CS340 Winter 2024 term
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addGamingSessionForm = document.getElementById('add-gaming-session-form-ajax');

// Modify the objects we need
addGamingSessionForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPlayerID = document.getElementById("input-playerID");
    let inputTableID = document.getElementById("input-tableID");
    let inputPlayerBet = document.getElementById("input-playerBet");
    let inputPlayerPayout = document.getElementById("input-playerPayout");
    let inputGameDate = document.getElementById("input-gameDate");

    // Get the values from the form fields
    let playerIDValue = inputPlayerID.value;
    let tableIDValue = inputTableID.value;
    let playerBetValue = inputPlayerBet.value;
    let playerPayoutValue = inputPlayerPayout.value;
    let gameDateValue = inputGameDate.value;

    // Put our data we want to send in a javascript object
    let data = {
        playerID: playerIDValue,
        tableID: tableIDValue,
        playerBet: playerBetValue,
        playerPayout: playerPayoutValue,
        gameDate: gameDateValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-gaming-session-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputPlayerID.value = '';
            inputTableID.value = '';
            inputPlayerBet.value = '';
            inputPlayerPayout.value = '';
            inputGameDate.value = '';
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
    let currentTable = document.getElementById("gamingSessions-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 6 cells
    let row = document.createElement("TR");
    let gamingSessionIDCell = document.createElement("TD");
    let playerIDCell = document.createElement("TD");
    let tableIDCell = document.createElement("TD");
    let playerBetCell = document.createElement("TD");
    let playerPayoutCell = document.createElement("TD");
    let gameDateCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    gamingSessionIDCell.innerText = newRow.gamingSessionID;
    playerIDCell.innerText = newRow.playerID;
    tableIDCell.innerText = newRow.tableID;
    playerBetCell.innerText = newRow.playerBet;
    playerPayoutCell.innerText = newRow.playerPayout;
    gameDateCell.innerText = newRow.gameDate;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteGamingSession(newRow.gamingSessionID);
    };
    
    // Add the cells to the row 
    row.appendChild(gamingSessionIDCell);
    row.appendChild(playerIDCell);
    row.appendChild(tableIDCell);
    row.appendChild(playerBetCell);
    row.appendChild(playerPayoutCell);
    row.appendChild(gameDateCell);
    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.gamingSessionID);

    // Add the row to the table
    currentTable.appendChild(row);


    // Find drop down menu, create a new option, fill data in the option (gamingSessionID),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("update-gamingSessionID");
    let option = document.createElement("option");
    option.text = newRow.gamingSessionID;
    option.value = newRow.gamingSessionID;
    selectMenu.add(option);

    // Reload page to format all rows the same
    location.reload();

}