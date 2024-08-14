// CITATION
// 3/16/2024
// All below Code is fully Adapted from nodejs-starter-app from CS340 Winter 2024 term
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteGamingSession(gamingSessionID) {
    let link = '/delete-gaming-session-ajax/';
    let data = {
      id: gamingSessionID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(gamingSessionID);
      }
    });
  }
  
function deleteRow(gamingSessionID){

    let table = document.getElementById("gamingSessions-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == gamingSessionID) {
            table.deleteRow(i);
            deleteDropDownMenu(gamingSessionID);
            break;
       }
    }
}


function deleteDropDownMenu(gamingSessionID){
  let selectMenu = document.getElementById("update-gamingSessionID");
  for (let i = 0; i < selectMenu.length; i++){
    if (Number(selectMenu.options[i].value) === Number(gamingSessionID)){
      selectMenu[i].remove();
      break;
    } 
  }
}