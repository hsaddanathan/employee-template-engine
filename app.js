const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamArray = [];

//Initial Prompt for Employee Roles

const positionSelect = [
    {
        type: "list",
        name: "position",
        message: "What is your position?",
        choices: ["Manager", "Engineer", "Intern"],
    }
];

function newTeamPositionPrompt (){
    inquirer.prompt(positionSelect).then(function(response){
        if(response.position === "Manager"){
            console.log("Manager");
            //Call Manager Function
            return createManager();
        }else if(response.position === "Engineer"){
            console.log("Engineer");
            //Call Engineer Function
            return createEngineer();
        } else if(response.position === "Intern"){
            console.log("Intern");
            //Call Intern Function
            return createIntern();
        }
    });
}

//Manager Questions and Function
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is your ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your email address?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is your office number?",
      },
]

function createManager(){
    inquirer.prompt(managerQuestions).then(function(response){
        // console.log(response);
        const manager = new Manager(
            response.name,
            response.id,
            response.email,
            response.officeNumber
        );
        // console.log(manager);
        teamArray.push(manager);
        console.log(teamArray);
        //Function Call to Loop if user wants to add another team member
        addNewTeamMember();
    });
}

// Engineer Questions and Function
const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is your ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your email address?",
      },
      {
        type: "input",
        name: "github",
        message: "What is your Github Username?",
      },
]
function createEngineer(){
    inquirer.prompt(engineerQuestions).then(function(response){
        // console.log(response);
        const engineer = new Engineer(
            response.name,
            response.id,
            response.email,
            response.github
        );
        // console.log(manager);
        teamArray.push(engineer);
        console.log(teamArray);
        //Function Call to Loop if user wants to add another team member
        addNewTeamMember();
    });
}

// Intern Questions and Function
const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is your ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your email address?",
      },
      {
        type: "input",
        name: "school",
        message: "What school do you attend?",
      },
]
function createIntern(){
    inquirer.prompt(internQuestions).then(function(response){
        // console.log(response);
        const intern = new Intern(
            response.name,
            response.id,
            response.email,
            response.school
        );
        // console.log(manager);
        teamArray.push(intern);
        console.log(teamArray);
        //Function Call to Loop if user wants to add another team member
        addNewTeamMember();
    });
}

//Adding the next team member questions and function
const addMemberQuestion = [
    {
    type: "list",
    name: "newMember",
    message: "Would you like to add another team memeber?",
    choices: ["YES","NO"]    
    }
]

function addNewTeamMember(){
    inquirer.prompt(addMemberQuestion).then(function(response){
        console.log(response);
        if(response.newMember === "YES"){
            return newTeamPositionPrompt();
        }
        else{
            console.log(teamArray);
            createTeamPage();
            console.log("Your team is complete!");
        }

    })
}

function createTeamPage(){
    fs.writeFile(outputPath,render(teamArray),err =>{
        if (err){
            throw err;
        } else {
            console.log("Success");
        }
    })
}

//Starts App
newTeamPositionPrompt();