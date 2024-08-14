-- Group 57 Justin Holley Louis Hwang 
-- CS340 Final Project DML.sql


-- #### DROP DOWN LISTS ####

-- gets list of players full names for a potential Player drop down (if needed)
-- Sorts by last name
SELECT CONCAT(firstName, ' ', lastName) as playerName FROM Players
ORDER BY lastName ASC;

-- gets the list of game names for Game Drop down
SELECT gameName FROM Games;

-- gets the list of supplierNames for a supplier Drop down
SELECT supplierName FROM Suppliers;

-- gets the list of table ID's for Table ID drop down
SELECT tableID From Tables; 

-- gets a table of playerID based on full name so that we can later refrence 
-- the playerID based on the name alone. May not use this since a player
-- will know their playerID, so that names don't need to be fully unique. 
SELECT playerID, CONCAT(firstName, ' ', lastName) as playerName FROM Players;



-- #### RETRIEVE in CRUD: i.e. BROWSE/SELECT QUERIES FOR ALL TABLES ####

-- get all information from Games table
SELECT gameID, gameName FROM Games;

-- get all information from Players table
SELECT playerID, firstName, lastName, email, birthdate, moneySpent FROM Players;

-- get all information from Suppliers table. 
SELECT supplierID, supplierName, dailyCost FROM Suppliers;

-- get all information from Employees 
SELECT employeeID, firstName, lastName, birthdate, dailyWage, tableID FROM Employees;

-- get all information from Tables table. Shows gameName instead of gameID
-- and shows supplierName instead of supplierID. 
SELECT tableID, Games.gameName AS gameName, employeesRequired, moneyEarned, 
Suppliers.supplierName 
FROM Tables
INNER JOIN Games on Tables.gameID = Games.gameID
INNER JOIN Suppliers on Tables.supplierID = Suppliers.supplierID;

-- get all information from GamingSessions table, includes Player full name
SELECT gamingSessionID, GamingSessions.playerID, 
CONCAT(Players.firstName,' ',Players.lastName) AS playerName, 
tableID, playerBet, playerPayout, gameDate 
FROM GamingSessions
INNER JOIN Players ON GamingSessions.playerID = Players.playerID;


-- #### CREATE in CRUD: i.e., INSERT STATEMENTS ####

-- Insert into Players
INSERT INTO Players (firstName, lastName, email, birthdate, moneySpent)
VALUE (:firstNameInput, :lastNameInput, :emailInput, :birthdateInput, 
moneySpentInput);

-- Insert into Games
INSERT INTO Games (gameName) 
VALUES (:gameNameInput);

-- Insert into Suppliers
INSERT INTO Suppliers (supplierName, dailyCost)
VALUES (:supplierNameInput, :dailyCostInput);

-- Insert into Employees
INSERT INTO Employees (firstName, lastName, birthdate, dailyWage, tableID)
VALUES (:firstNameInput, :lastNameInput, :birthdateInput, :dailyWageInput, 
:tableID_from_dropdown);

-- Insert into GamingSessions
INSERT INTO GamingSessions (playerID, tableID, playerBet, playerPayout, gameDate)
VALUES (:playerIDInput, :tableID_from_dropdown, :playerBetInput, :playerPayoutInput, :gameDateInput)

-- Insert into Tables
INSERT INTO Tables (gameID, employeesRequired, moneyEarned, supplierID)
VALUE (:gameID_from_dropdown, :employeesRequiredInput, :moneyEarnedInput, :supplierIDInput)



-- #### Update Statements ####

-- Update for Games
UPDATE Games
SET gameName = :gameNameInput
WHERE gameID = :gameID_selected;

-- Update for Players
UPDATE Players
SET firstName = :firstNameInput, lastName = :lastNameInput, 
email = :emailInput, birthdate = :birthdateInput, 
moneySpent = :moneySpentInput
WHERE playerID = playerID_selected;

-- Update for Employees 
UPDATE Employees
SET firstName = :firstNameInput, lastName = :lastNameInput, 
birthdate = :birthdateInput, dailyWage = :dailyWageInput,
tableID = :tableID_from_dropdown
WHERE employeeID = :employeeID_selected;

-- Update for Suppliers
UPDATE Suppliers
SET supplierName = :supplierNameInput, dailyCost = :dailyCostInput
WHERE supplierID = :supplierID_selected;

-- Update Tables
UPDATE Tables
SET gameID = :gameID_from_dropdown,
employeesRequired = :employeesRequiredInput,
moneyEarned = :moneyEarnedInput,
supplierID = :supplierID_from_dropdown
WHERE tableID = :tableID_selected;

-- Update for GamingSessions
UPDATE GamingSessions 
SET playerID = :playerIDInput, tableID = :tableIDInput, 
playerBet = :playerBetInput, playerPayout = :playerPayoutInput, 
gameDate = :gameDateInput
WHERE gamingSessionID = :gamingSessionID_selected;



-- #### Delete Statments ####

-- Delete GamingSessions item
DELETE FROM GamingSessions 
WHERE gamingSessionID = :gamingSessionID_selected;

-- Delete from Players (NOTE: we've made the GamingSession use of the Player 
-- ID CASCADE to NULL if a player is deleted)
DELETE FROM Players 
WHERE playerID = :playerID_selected;

-- Delete from Tables (not likely to be used on website)
DELETE FROM Tables
WHERE tableID = :tableID_selected;

-- Delete from Suppliers (not likely to be used on website)
DELETE FROM Suppliers
WHERE supplierID = :supplierID_selected;

-- Delete from Employees (not likely to be used on Website)
DELETE FROM Employees
WHERE employeeID = :employeeID_selected;

-- Delete from Games
DELETE FROM Games
WHERE gameID = :gameID_selected;