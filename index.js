#!/usr/bin/env node

const chalk = require("chalk");
const cli = require("clui");
const clear = require("clear");
const figlet = require("figlet");

const inquirer = require("./inquirer.js");
const recipes = require("./recipes.js");

clear();

console.log(
  chalk.yellow(figlet.textSync("eikon CLI", { horizontalLayout: "full" }))
);

const run = async () => {
  const data = await inquirer.askQuestions();

  global.__basedir = data.mode === "current" ? "./" : data.name;

  const status = new cli.Spinner("Installation en cours");
  status.start();

  try {
    await recipes.cloneGitRepository();
  } catch (error) {
    console.log(chalk.red(error.message));
    status.stop();
    return false;
  }

  try {
    recipes.removeGitDirectory();
  } catch (error) {
    console.log(chalk.red(error.message));
    status.stop();
    return false;
  }

  try {
    await recipes.moveFilesFromTmp();
  } catch (error) {
    console.log(chalk.red(error.message));
    status.stop();
    return false;
  }

  try {
    await recipes.installNpmPackages();
  } catch (error) {
    console.log(chalk.red(error.message));
    status.stop();
    return false;
  }

  recipes.createScaffolding(data.stylesheets, data.structure);

  status.stop();

  console.log(chalk.green("🥳 Projet installé avec succès!"));
  console.log(
    chalk.white(`🚀 Pour lancer le projet: \n  cd ${data.name} \n  npm run dev`)
  );
};

run();
