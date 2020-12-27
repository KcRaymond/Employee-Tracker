//Require Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
//Set up Server connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Dsmh2020!",
  database: "employees_db",
});

// Connect to the DB
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  //   startPrompts();
});
