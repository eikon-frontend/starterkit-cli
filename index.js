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

  await git.clone(
    "https://github.com/eikon-frontend/starterkit.git",
    data.name
  );

  await recipes.removeGitDirectory();
  await recipes.installNpmPackages();

  switch (data.stylesheets) {
    case "css":
      await recipes.setCss();
      break;
    case "scss":
      await recipes.setScss();
      break;
  }

  switch (data.stylesheets_structure) {
    case "default":
      await recipes.setDefaultStructure(data.stylesheets);
      break;
    case "smacss":
      await recipes.setSmacssStructure(data.stylesheets);
      break;
  }

  status.stop();

  console.log(chalk.green("🥳 Projet installé avec succès!"));
  console.log(
    chalk.white(`🚀 Pour lancer le projet: \n  cd ${data.name} \n  npm run dev`)
  );
};

run();
