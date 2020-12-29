//Require Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const logo = require("asciiart-logo");
const config = require("./package.json");

//ANSII ARTWORK COOOOOL!!
const longText = "A simple app to track the employees @ KLR Designs";

console.log(
  logo({
    name: "KLR Designs Employee Tracker",
    font: "Calvin S",
    lineChars: 10,
    padding: 2,
    margin: 3,
    borderColor: "bold-green",
    logoColor: "bold-blue",
    textColor: "bold-green",
  })
    .emptyLine()
    .right("version 3.7.123")
    .emptyLine()
    .center(longText)
    .render()
);

// console.log(logo(config).render());

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
  //   console.log(`connected as id ${connection.threadId}\n`);
  startPrompts();
});

//create functions to start prompts and switch statements

const startPrompts = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update employee role",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
          viewAllEmployees();
          break;

        case "View All Departments":
          viewAllDepartments();
          break;

        case "Add Employee":
          rangeSearch();
          break;

        case "Search for a specific song":
          songSearch();
          break;

        case "Find artists with a top song and top album in the same year":
          songAndAlbumSearch();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};
//function to view all employees
const viewAllEmployees = () => {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary" +
      " FROM employee" +
      " inner join role ON (employee.role_id = role.id)" +
      " inner join department on role.department_id = department.id",
    (err, res) => {
      if (err) throw err;

      // Log all results of the SELECT statement in table formating
      console.table(res);
      startPrompts();
    }
  );
};

const viewAllDepartments = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;

    // Log all results of the SELECT statement in table formating
    console.table(res);
    startPrompts();
  });
};
