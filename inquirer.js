const fs = require("fs");
const inquirer = require("inquirer");

module.exports = {
  askQuestions: () => {
    const questions = [
      {
        type: "list",
        name: "mode",
        message: "Installer le starterkit...",
        choices: [
          { name: "dans un nouveau dossier", value: "new" },
          {
            name: "dans un dossier existant",
            value: "existing",
          },
        ],
        default: ["default"],
      },
      {
        when: (answers) => answers.mode === "new",
        name: "name",
        type: "input",
        message: "Nom du nouveau dossier:",
        validate: (value) => {
          if (!value.length) {
            return "Merci d'entrer le nom du dossier.";
          }
          if (value.includes(" ")) {
            return "Le nom du dossier ne doit pas contenir d'espaces.";
          }
          if (fs.existsSync(value)) {
            return `Le dossier ${value} existe déjà`;
          }

          return true;
        },
      },
      {
        when: (answers) => answers.mode === "existing",
        name: "name",
        type: "list",
        message: "Dossier existant:",
        choices: fs
          .readdirSync("./")
          .filter((dir) => fs.statSync(dir).isDirectory())
          .map((dir) => ({ name: dir, value: dir })),
        validate: (value) => {
          if (!value.length) {
            return "Merci d'entrer le nom du dossier.";
          }
          if (value.includes(" ")) {
            return "Le nom du dossier ne doit pas contenir d'espaces.";
          }
          if (!fs.existsSync(value)) {
            return `Le dossier ${value} est introuvable.`;
          }

          return true;
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
