const files = require("./files.js");
const settings = require("./settings.js");

module.exports = {
  removeGitDirectory: () => {
    files.removeDirectory("/.git");
  },
  installNpmPackages: () => {
    return new Promise((resolve) => {
      const exec = require("child_process").exec;

      exec(`npm install --prefix ${__basedir}`, () => {
        resolve();
      });
    });
  },
  createScaffolding: async (stylesheets, stylesheets_structure) => {
    const resetRules = files.readFile("/src/css/main.css");

    files.removeDirectory("/src/css");
    files.createScaffolding(
      settings.scaffolding[stylesheets][stylesheets_structure]
    );

    files.writeInFile(
      settings.reset_rules[stylesheets][stylesheets_structure].path,
      resetRules
    );

    if (stylesheets === "scss") {
      files.replaceInFile("/src/index.html", "css/main.css", "scss/main.scss");
    }

    if (stylesheets_structure === "smacss") {
      files.writeInFile(
        settings.import_rules[stylesheets].path,
        settings.import_rules[stylesheets].data
      );
    }
  },
};
