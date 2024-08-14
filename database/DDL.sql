-- Group 57 Justin Holley Louis Hwang 
-- CS340 Final Project DDL.sql

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Table structures for all entities of the casino project
-- Table structure for Players
CREATE OR REPLACE TABLE `Players` (
    `playerID` int NOT NULL UNIQUE AUTO_INCREMENT,
    `firstName` varchar(55) NOT NULL,
    `lastName` varchar(55) NOT NULL,
    `email` varchar(55) UNIQUE,
    `birthdate` Date NOT NULL,
    `moneySpent` decimal(10,2) DEFAULT 0 NOT NULL,
    PRIMARY KEY (`playerID`)
);

-- Table structure for Employees
CREATE OR REPLACE TABLE `Employees` (
    `employeeID` int NOT NULL UNIQUE AUTO_INCREMENT,
    `firstName` varchar(55) NOT NULL,
    `lastName` varchar(55) NOT NULL,
    `birthdate` Date NOT NULL,
    `dailyWage` decimal(10,2) NOT NULL,
    `tableID` int,
    PRIMARY KEY (`employeeID`),
    FOREIGN KEY (`tableID`) REFERENCES Tables(`tableID`) ON DELETE SET NULL
);

-- Table structure for Tables
CREATE OR REPLACE TABLE `Tables` (
    `tableID` int NOT NULL UNIQUE AUTO_INCREMENT,
    `gameID` int NOT NULL,
    `employeesRequired` int NOT NULL,
    `moneyEarned` decimal(10,2) NOT NULL,
    `supplierID` int NOT NULL,
    PRIMARY KEY (`tableID`),
    FOREIGN KEY (`gameID`) REFERENCES Games(`gameID`) ON DELETE CASCADE,
    FOREIGN KEY (`supplierID`) REFERENCES Suppliers(`supplierID`) ON DELETE CASCADE
);

-- Table structure for Games
CREATE OR REPLACE TABLE `Games` (
    `gameID` int NOT NULL UNIQUE AUTO_INCREMENT,
    `gameName` varchar(55) NOT NULL,
    PRIMARY KEY (`gameID`)
);

-- Table structure for Suppliers
CREATE OR REPLACE TABLE `Suppliers` (
    `supplierID` int NOT NULL UNIQUE AUTO_INCREMENT,
    `supplierName` varchar(55) NOT NULL,
    `dailyCost` decimal(10,2) NOT NULL,
    PRIMARY KEY (`supplierID`)
);

-- Table structure for the intersection table GamingSessions
CREATE OR REPLACE TABLE `GamingSessions` (
    `gamingSessionID` int NOT NULL UNIQUE AUTO_INCREMENT,
    `playerID` int,
    `tableID` int NOT NULL,
    `playerBet` decimal(10,2) NOT NULL,
    `playerPayout` decimal(10,2) DEFAULT 0 NOT NULL,
    `gameDate` date NOT NULL,
    PRIMARY KEY (`GamingSessionID`),
    FOREIGN KEY (`playerID`) REFERENCES Players(`playerID`) ON DELETE SET NULL,
    FOREIGN KEY (`tableID`) REFERENCES Tables(`tableID`) ON DELETE CASCADE
);

-- Add 3-5 sample data into each table 
-- Adding sample data to Players table
INSERT INTO `Players` (`firstName`, `lastName`, `email`, `birthdate`, `moneySpent`)
VALUES ('John', 'Jay', 'jayj@hello.com', '1990-01-02', 0.0),
('Michael', 'Smith', 'smithm@hello.com', '1995-06-10', 0.0),
('Bob', 'Cabrera', 'cabrerab@hello.com', '1997-10-15', 0.0),
('Ashley', 'Brown', 'browna@hello.com', '1992-11-13', 0.0),
('Mary', 'Jane', 'janem@hello.com', '2001-07-09', 0.0);

-- Adding sample data to Games table
INSERT INTO `Games` (`gameName`)
VALUES ('Blackjack'),
('Poker'),
('Roulette');

-- Adding sample data to Suppliers table
INSERT INTO `Suppliers` (`supplierName`, `dailyCost`)
VALUES ('Card Game Supplier', 100.0),
('Slots Supplier', 200.0),
('Roulette Supplier', 150.0);

-- Adding sample data to Tables table
INSERT INTO `Tables` (`gameID`, `employeesRequired`, `moneyEarned`, `supplierID`)
VALUES (1, 2, 0.0, 1),
(1, 2, 0.0, 1),
(2, 1, 0.0, 1),
(3, 1, 0.0, 3);

-- Adding sample data to Employees table
INSERT INTO `Employees` (`firstName`, `lastName`, `birthdate`, `dailyWage`, `tableID`)
VALUES ('Lou', 'Gehrig', '1988-01-13', 102.0, 1),
('George', 'Costanza', '2001-04-17', 105.0, 1),
('Brian', 'Green', '1999-12-31', 130.0, 2),
('Nancy', 'Drew', '1986-03-29', 170.0, 3);

-- Adding sample data to GamingSessions table
INSERT INTO `GamingSessions` (`playerID`, `tableID`, `playerBet`, `playerPayout`, `gameDate`)
VALUES (1, 1, 100.0, 50.0, '2024-01-03'),
(1, 1, 200.0, 250.0, '2024-01-03'),
(2, 3, 300.0, 80.0, '2024-01-03'),
(3, 3, 200.0, 150.0, '2024-01-04'),
(4, 2, 50.0, 100.0, '2024-01-05');

SELECT * FROM Players;
SELECT * FROM Games;
SELECT * FROM Suppliers;
SELECT * FROM Tables;
SELECT * FROM Employees;
SELECT * FROM GamingSessions;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;