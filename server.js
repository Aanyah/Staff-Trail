const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql2 = require('mysql2');
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'staff_db'
});
connection.connect(function(err){
    if (err) throw err;
    console.log ("connection as id " + connection.threadId);

    startScreen();
});

// Start Screen
function startScreen() {
    inquirer.prompt({
        type: "list",
        choices: [
            "Add department",
            "Add role",
            "Add employee",
            "View departments",
            "View employees",
            "View Roles",
            "Update employees",
            "Quit"
        ],
        message: "What would you like to do?",
        name: "options"
    })
    .then(function(result){
        console.log("You entered: " + result.options);

        switch(result.options) {
            case "Add department":
                addDepartment();
                break;
            case "Add role":
                addRole();
                break;
            case "Add employee":
                addEmployee();
                break;
            case "View departments":
                viewDepartment();
                break;
            case "View roles":
                viewRoles();
                break;
            case "View employees":
                viewEmployees();
                break;
            case "Update employees":
                updateEmployees();
                break;
            case "quit":
                quit();
                break;
        }
    });
}

// case functions
function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "What is the name of the department?",
        name: "dept_name"
    })
    .then(function(answer){
        connection.query("INSERT INTO department (dept_name) VALUES (?)", [answer.dept_name], function(err,res){
            if(err) throw err;
            console.table(res)
            startScreen();
        })
    })
}
function addRole(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the role?",
            name: "job_title"
        },
        {
            type: "input",
            message: "What is the salary for this role?",
            name: "job_salary"
        },
        {
            type: "input",
            message: "What is the department id #?",
            name: "department_id" 
        }
    ])
    .then(function(answer) {
        connection.query("INSERT INTO role (job_title, job_salary, department_id) VALUES (?,?,?)", [answer.job_title, answer.job_salary, answer.department_id], function(err, res) {
            if(err) throw err;
            console.table(res);
            startScreen();
        });
    });
}
function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            message: "What's the first name of the employee?",
            name: "first_name" 
        },
        {
            type: "input",
            message: "What's the last name of the employee?",
            name: "last_name"
        },
        {
            type: "input",
            message: "What is the employee's role id number?",
            name: "role_id"
        },
        {
            type: "input",
            message: "What is the manager id number?",
            name: "manager_id"
        }

    ])
    .then(function(answer) {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], function(err, res) {
            if(err) throw err;
            console.table(res);
            startScreen();
        });
    });
}
function updateEmployees() {
    inquirer.prompt([
        {
            type: "input",
            message: "Which employee would you like to update?",
            name: "employee_update"
        },
        {
            type: "input",
            message: "What do you want to update the Role_id to?",
            name: "role_update"
        }
    ])
    .then(function(answer) {
        connection.query('UPDATE employee SET role_id=? WHERE first_name=?', [answer.role_update, answer.employee_update], function(err, res) {
            if(err) throw err;
            console.table(res);
            startScreen();
        });
    });
}
function viewDepartment() {
    let query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
    });
}
function viewRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
    });
}
function viewEmployees() {
    let query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
    });
}
function quit() {
    connection.end();
    process.exit();
}