#!/usr/bin/env node

import chalk from "chalk";
import cli from "clui";
import clear from "clear";
import figlet from "figlet";

import inquirer from "./inquirer.js";
import recipes from "./recipes.js";

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
  console.log(chalk.white("🚀 Pour lancer le projet:"));
  if (data.mode !== "current") {
    console.log(chalk.white(`cd ${data.name}`));
  }
  console.log(chalk.white("npm run dev"));
};

run();
