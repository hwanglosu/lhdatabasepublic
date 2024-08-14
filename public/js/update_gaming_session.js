// CITATION
// 3/16/2024
// All below Code is fully Adapted from nodejs-starter-app from CS340 Winter 2024 term
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateGamingSessionForm = document.getElementById('update-gaming-session-form-ajax');

// Modify the objects we need
updateGamingSessionForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputGamingSessionID = document.getElementById("update-gamingSessionID");
    let inputPlayerID = document.getElementById("update-playerID");
    let inputTableID = document.getElementById("update-tableID");
    let inputPlayerBet = document.getElementById("update-playerBet");
    let inputPlayerPayout = document.getElementById("update-playerPayout");
    let inputGameDate = document.getElementById("update-gameDate");

    // Get the values from the form fields
    let gamingSessionIDValue = inputGamingSessionID.value;
    let playerIDValue = inputPlayerID.value;
    let tableIDValue = inputTableID.value;
    let playerBetValue = inputPlayerBet.value;
    let playerPayoutValue = inputPlayerPayout.value;
    let gameDateValue = inputGameDate.value;
  
    
    // Verify entries are numbers (except date)
    if (isNaN(gamingSessionIDValue) || 
    isNaN(tableIDValue) || 
    isNaN(playerBetValue) || 
    isNaN(playerPayoutValue) 
    ) 
    {
        
        return;
    }

    if (playerIDValue === 'NULL') {
        playerIDValue = null
    } 

    // Put our data we want to send in a javascript object
    let data = {
        gamingSessionID: gamingSessionIDValue,
        playerID: playerIDValue,
        tableID: tableIDValue,
        playerBet: playerBetValue,
        playerPayout: playerPayoutValue,
        gameDate: gameDateValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-gaming-session-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, gamingSessionIDValue);
            
            // Reload page to format all rows the same and clear form
            location.reload();

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

function updateRow(data, gameSessionID){
    let parsedData = JSON.parse(data);
    // console.log(parsedData[0])
    let table = document.getElementById("gamingSessions-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == gameSessionID) {

            // Get the location of the row where we found the matching game session ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of playerID value
            let td = updateRowIndex.getElementsByTagName("td")[1];

            // Reassign playerID to our value we updated to
            td.innerHTML = parsedData[0].playerID; 
            
            // Get td of tableID value
            td = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign tableID to our value we updated to
            td.innerHTML = parsedData[0].tableID; 

            // Get td of playerBet value
            td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign tableID to our value we updated to
            td.innerHTML = parsedData[0].playerBet;

            // Get td of playerpayout value
            td = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign tableID to our value we updated to
            td.innerHTML = parsedData[0].playerPayout;            

            // Get td of gameDate value
            td = updateRowIndex.getElementsByTagName("td")[5];

            // Reassign tableID to our value we updated to
            td.innerHTML = parsedData[0].gameDate;          

       }
    }
}
