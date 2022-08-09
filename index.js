#!/usr/bin/env node

const chalk = require("chalk");
const cli = require("clui");
const clear = require("clear");
const figlet = require("figlet");
const git = require("simple-git")();

const inquirer = require("./inquirer.js");
const recipes = require("./recipes.js");

clear();

console.log(
  chalk.yellow(figlet.textSync("eikon CLI", { horizontalLayout: "full" }))
);

const run = async () => {
  const data = await inquirer.askQuestions();
  global.__basedir = data.name;

  const status = new cli.Spinner("Installation en cours");
  status.start();

  try {
    await git.clone(
      "https://github.com/eikon-frontend/starterkit.git",
      data.name
    );
  } catch (error) {
    console.log(
      chalk.red(
        "⚠️ Impossible de se connecter à github. Véfifiez votre connexion internet."
      )
    );

    status.stop();
    return false;
  }

  recipes.removeGitDirectory();
  await recipes.installNpmPackages();
  recipes.createScaffolding(data.stylesheets, data.stylesheets_structure);

  status.stop();

  console.log(chalk.green("🥳 Projet installé avec succès!"));
  console.log(
    chalk.white(`🚀 Pour lancer le projet: \n  cd ${data.name} \n  npm run dev`)
  );
};

run();
