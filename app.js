// CITATION
// 3/16/2024
// All below Code is fully Adapted from nodejs-starter-app Readme file from CS340 Winter 2024 term
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// App.js
/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 24131;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


/*
    ROUTES
*/

    // Read for index
app.get('/', function(req, res)
    {
        res.render('index')
    });    

// Read For employees
app.get('/employees', function(req, res)
    {  
        let query1 = "SELECT * FROM Employees;";               // Define our query

        let query2 = "SELECT * FROM Tables;"

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            let employee = rows;

            db.pool.query(query2, (error, rows, fields) => {

                let tables = rows;

                return res.render('employees', {data: employee,  
                    tables: tables}); // Return the Render to the index.hbs file
                })
            })                  
        });                                                     
   

// Read for games
app.get('/games', function(req, res)
    {
        let query1 = "SELECT * FROM Games;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('games', {data: rows});
        })
    });    

// Read For Gaming Sessions
app.get('/gamingSessions', function(req, res)
    {  
        let query1 = "SELECT * FROM GamingSessions;";               // Define our query

        let query2 = "SELECT * FROM Players;";

        let query3 = "SELECT * FROM Tables;"

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            let gameSession = rows;

            db.pool.query(query2, (error, rows, fields) => {

                let players = rows;

                return db.pool.query(query3, (error, rows, fields) => {
                    let tables = rows;
                    return res.render('gamingSessions', {data: gameSession, 
                        players: players, 
                        tables: tables});  // Return the Render to the index.hbs file
                })
            })                  
        })                                                     
    });                                                         

// Read for Players
app.get('/players', function(req, res)
    {
        let query1 = "SELECT * FROM Players;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('players', {data: rows});
        })
    });    



// Read for Suppliers
app.get('/suppliers', function(req, res)
    {
        let query1 = "SELECT * FROM Suppliers;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('suppliers', {data: rows});
        })
    });    

// Read For Tables
app.get('/tables', function(req, res)
    {  
        let query1 = "SELECT * FROM Tables;";               // Define our query

        let query2 = "SELECT * FROM Games;";

        let query3 = "SELECT * FROM Suppliers;"

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            let tables = rows;

            db.pool.query(query2, (error, rows, fields) => {

                let games = rows;

                return db.pool.query(query3, (error, rows, fields) => {
                    let suppliers = rows;
                    return res.render('tables', {data: tables, 
                        games: games, 
                        suppliers: suppliers});  // Return the Render to the tables.hbs file
                })
            })                  
        })                                                     
    });           


// Create/Add for Employee
app.post('/add-employee-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let first_Name = data.firstName;
    let last_Name = data.lastName;
    let birthdate = data.birthdate;

    let dailyWage = parseFloat(data.dailyWage);
    if (isNaN(dailyWage))
    {
        dailyWage = 'NULL'
    }

    let tableID = parseInt(data.tableID);
    if (isNaN(tableID))
    {
        tableID = 'NULL'
    }


    

    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (firstName, lastName, birthdate, dailyWage, tableID) VALUES ('${first_Name}', '${last_Name}', '${birthdate}', ${dailyWage}, ${tableID})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on GamingSessions
            query2 = `SELECT * FROM Employees;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});




// Create/Add for games
app.post('/add-game-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let gameName = data.gameName;

    // Create the query and run it on the database
    query1 = `INSERT INTO Games (gameName) VALUES ('${gameName}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on games
            query2 = `SELECT * FROM Games;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// Create/Add for Gaming Sessions
app.post('/add-gaming-session-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let playerID = parseInt(data.playerID);
    if (isNaN(playerID))
    {
        playerID = 'NULL'
    }

    let tableID = parseInt(data.tableID);
    if (isNaN(tableID))
    {
        table = 'NULL'
    }

    let playerBet = parseFloat(data.playerBet);
    if (isNaN(playerBet))
    {
        playerBet = 'NULL'
    }

    let playerPayout = parseFloat(data.playerPayout);
    if (isNaN(playerPayout))
    {
        playerPayout = 'NULL'
    }

    let game_Date = data.gameDate;

    // Create the query and run it on the database
    query1 = `INSERT INTO GamingSessions (playerID, tableID, playerBet, playerPayout, gameDate) VALUES ('${playerID}', '${tableID}', ${playerBet}, ${playerPayout}, '${game_Date}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on GamingSessions
            query2 = `SELECT * FROM GamingSessions;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// Create/Add for Players
app.post('/add-player-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let first_Name = data.firstName;
    let last_Name = data.lastName;
    let email = data.email;
    let birthdate = data.birthdate;
    
    let money_Spent = parseFloat(data.moneySpent);
    if (isNaN(money_Spent))
    {
        money_Spent = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Players (firstName, lastName, email, birthdate, moneySpent) VALUES ('${first_Name}', '${last_Name}', '${email}', '${birthdate}', ${money_Spent})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on GamingSessions
            query2 = `SELECT * FROM Players;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// Create/Add for Suppliers
app.post('/add-supplier-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let supplierName = data.supplierName;


    let dailyCost = parseFloat(data.dailyCost);
    if (isNaN(dailyCost))
    {
        console.log('dailyCost must be a number')
        res.sendStatus(400);
    }


    // Create the query and run it on the database
    query1 = `INSERT INTO Suppliers (supplierName, dailyCost) VALUES ('${supplierName}', '${dailyCost}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Suppliers
            query2 = `SELECT * FROM Suppliers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// Create/Add for Tables
app.post('/add-table-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Capture NULL values
    let gameID = parseInt(data.gameID);
    if (isNaN(gameID))
    {
        gameID = 'NULL'
    }

    let employeesRequired = parseInt(data.employeesRequired);
    if (isNaN(employeesRequired))
    {
        table = 'NULL'
    }

    let moneyEarned = parseFloat(data.moneyEarned);
    if (isNaN(moneyEarned))
    {
        moneyEarned = 'NULL'
    }

    let supplierID = parseInt(data.supplierID);
    if (isNaN(supplierID))
    {
        supplierID = 'NULL'
    }


    // Create the query and run it on the database
    query1 = `INSERT INTO Tables (gameID, employeesRequired, moneyEarned, supplierID) VALUES (${gameID}, ${employeesRequired}, ${moneyEarned}, ${supplierID})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on GamingSessions
            query2 = `SELECT * FROM Tables;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});




// Delete for Employees
app.delete('/delete-employee-ajax/', function(req,res,next){
    let data = req.body;
    let employeeID = parseInt(data.id);
    let deleteEmployee = `DELETE FROM Employees WHERE employeeID = ?`;
  
  
          // Run the query
          db.pool.query(deleteEmployee, [employeeID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else
              {
                res.sendStatus(204);
              }

        })
});


// Delete for games
app.delete('/delete-game-ajax/', function(req,res,next){
    let data = req.body;
    let gameID = parseInt(data.id);
    let deleteGame = `DELETE FROM Games WHERE gameID = ?`;
  
  
          // Run the query
          db.pool.query(deleteGame, [gameID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else
              {
                res.sendStatus(204);
              }

        })
});

// Delete for Gaming Sessions
app.delete('/delete-gaming-session-ajax/', function(req,res,next){
    let data = req.body;
    let gamingSessionID = parseInt(data.id);
    let deleteGamingSession = `DELETE FROM GamingSessions WHERE gamingSessionID = ?`;
  
  
          // Run the query
          db.pool.query(deleteGamingSession, [gamingSessionID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else
              {
                res.sendStatus(204);
              }

        })
});

// Delete for Players
app.delete('/delete-player-ajax/', function(req,res,next){
    let data = req.body;
    let playerID = parseInt(data.id);
    let deletePlayer = `DELETE FROM Players WHERE playerID = ?`;
  
  
          // Run the query
          db.pool.query(deletePlayer, [playerID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else
              {
                res.sendStatus(204);
              }

        })
});


// Delete for Suppliers
app.delete('/delete-supplier-ajax/', function(req,res,next){
    let data = req.body;
    let supplierID = parseInt(data.id);
    let deleteSupplier = `DELETE FROM Suppliers WHERE supplierID = ?`;
  
  
          // Run the query
          db.pool.query(deleteSupplier, [supplierID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else
              {
                res.sendStatus(204);
              }

        })
});

// Delete for Tables
app.delete('/delete-table-ajax/', function(req,res,next){
    let data = req.body;
    let tableID = parseInt(data.id);
    let deleteTables = `DELETE FROM Tables WHERE tableID = ?`;
  
  
          // Run the query
          db.pool.query(deleteTables, [tableID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else
              {
                res.sendStatus(204);
              }

        })
});


// Update for Gaming Sessions
app.put('/put-gaming-session-ajax', function(req,res,next){
    let data = req.body;
    
    let playerID = data.playerID
    if (playerID != null){
        playerID = parseInt(data.playerID);
    }

    let gamingSessionID = parseInt(data.gamingSessionID);
    let tableID = parseInt(data.tableID);
    let playerBet = parseFloat(data.playerBet);
    let playerPayout = parseFloat(data.playerPayout);
    let gameDate = data.gameDate;
   
    let queryUpdateGamingSession = `UPDATE GamingSessions SET 
    playerID = ?,
    tableID = ?,
    playerBet = ?,
    playerPayout = ?,
    gameDate = ?  
    WHERE GamingSessions.gamingSessionID = ?`;
    let selectGamingSession = `SELECT * FROM GamingSessions WHERE gamingSessionID = ?`
  
          // Run the 1st query
          db.pool.query(queryUpdateGamingSession, 
            [playerID, tableID, playerBet, playerPayout, gameDate, gamingSessionID], 
            function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                // Run the second query
                db.pool.query(selectGamingSession, [gamingSessionID], function(error, rows, fields) {
        
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })                    
              }
  })});


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});