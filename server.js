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
        "View All Roles",
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

        case "View All Roles":
          viewAllRoles();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Department":
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
  console.clear();
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
  console.clear();
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;

    // Log all results of the SELECT statement in table formating
    console.table(res);
    startPrompts();
  });
};

const viewAllRoles = () => {
  console.clear();
  connection.query(
    "SELECT role.id, role.title, role.salary, department.name as department" +
      " FROM role" +
      " inner join department ON (role.department_id = department.id)",
    (err, res) => {
      if (err) throw err;

      // Log all results of the SELECT statement in table formating
      console.table(res);
      startPrompts();
    }
  );
};

const addEmployee = () => {
  console.clear();
  let roleArray = [];
  const sql = "SELECT * FROM role";

  connection.query(sql, function (err, res) {
    if (err) throw err;
    roleArray = res;
    let roleNames = roleArray.map((user) => user.id + " " + user.title);

    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the employee's first name?",
          validate: (first_name) => {
            if (first_name) {
              return true;
            } else {
              console.log("\n Please enter a first name...");
              return false;
            }
          },
        },

        {
          name: "last_name",
          type: "input",
          message: "What is the employee's last name?",
          validate: (last_name) => {
            if (last_name) {
              return true;
            } else {
              console.log("\n Please enter a last name...");
              return false;
            }
          },
        },

        {
          name: "role_id",
          type: "list",
          message: "What is the employee's role?",
          choices: roleNames,
        },

        {
          name: "manager_id",
          type: "list",
          message: "Who is the employee's manager?",
          choices: ["None", "Kasey Raymond", "Patrick Workurka"],
        },
      ])

      .then((answer) => {
        //these if statements assign an id number to the manager that is selected by the user
        if (answer.manager_id == "None") {
          managerID = 1;
        }
        if (answer.manager_id == "Kasey Raymond") {
          managerID = 2;
        }
        if (answer.manager_id == "Patrick Wokurka") {
          managerID = 3;
        }

        let result = JSON.stringify(answer.role_id);
        let resultId = result.replace(/\D/g, "");

        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: resultId,
            manager_id: managerID,
          },
          (err) => {
            if (err) throw err;
            console.table(
              `${answer.first_name} ${answer.last_name} added to the database.`
            );
            startPrompts();
          }
        );
      });
  });
};
