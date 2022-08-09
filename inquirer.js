const fs = require("fs");
const inquirer = require("inquirer");

module.exports = {
  askQuestions: () => {
    const questions = [
      {
        name: "name",
        type: "input",
        message: "Nom du projet:",
        validate: (value) => {
          if (!value.length) {
            return "Merci d'entrer le nom du projet.";
          }
          if (fs.existsSync(value)) {
            return `Le dossier ${value} existe déjà`;
          } else {
            return true;
          }
        },
      },
      {
        type: "list",
        name: "stylesheets",
        message: "Feuilles de style:",
        choices: [
          { name: "CSS", value: "css" },
          { name: "SCSS", value: "scss" },
        ],
        default: ["css"],
      },
      {
        type: "list",
        name: "structure",
        message: "Structure des feuilles de style:",
        choices: [
          { name: "Un seul fichier", value: "default" },
          { name: "SMACSS", value: "smacss" },
        ],
        default: ["default"],
      },
    ];

    return inquirer.prompt(questions);
  },
};
