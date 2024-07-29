import { exec } from "child_process";
import { simpleGit } from "simple-git";
const git = simpleGit();

import files from "./files.js";
import settings from "./settings.js";

export default {
  cloneGitRepository: async () => {
    try {
      await git.clone(
        "https://github.com/eikon-frontend/starterkit.git",
        `${__basedir}/tmp`
      );
    } catch (error) {
      console.error(error);
      throw new Error(
        "⚠️ Impossible de se connecter à github. Véfifiez votre connexion internet."
      );
    }
  },
  moveFilesFromTmp: () => {
    try {
      files.moveAllFiles(`${__basedir}/tmp`, __basedir);
    } catch {
      throw new Error("⚠️ Impossible de déplacer les fichiers.");
    }
  },
  removeGitDirectory: () => {
    try {
      files.removeDirectory(`/tmp/.git`);
    } catch {
      throw new Error(
        "⚠️ Impossible de supprimer le dossier du repository git."
      );
    }
  },
  installNpmPackages: () => {
    return new Promise((resolve) => {
      exec(`npm install --prefix ${__basedir}`, (error) => {
        if (error) {
          throw new Error("⚠️ Impossible d'installer les dépendances via NPM.");
        } else {
          resolve();
        }
      });
    });
  },
  createScaffolding: async (stylesheets, structure) => {
    const resetRules = files.readFile("/src/css/main.css");

    files.removeDirectory("/src/css");
    files.createScaffolding(settings.scaffolding[stylesheets][structure]);

    files.writeInFile(
      settings.reset_rules[stylesheets][structure].path,
      resetRules
    );

    if (stylesheets === "scss") {
      files.replaceInFile("/src/index.html", "css/main.css", "scss/main.scss");
    }

    if (structure === "smacss") {
      files.writeInFile(
        settings.import_rules[stylesheets].path,
        settings.import_rules[stylesheets].data
      );
    }
  },
};
