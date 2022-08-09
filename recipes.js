const files = require("./files.js");

module.exports = {
  setCss: async () => {
    await files.removeDirectory(`${__basedir}/src/scss`);
    await files.removeFile(`${__basedir}/src/index_scss.html`);
  },
  setScss: async () => {
    await files.replaceInFile(
      `${__basedir}/src/index.html`,
      "css/main.css",
      "scss/main.scss"
    );
  },
  setDefaultStructure: async (stylesheets) => {
    await files.removeDirectory(`${__basedir}/src/${stylesheets}/smacss`);
  },
  setSmacssStructure: async (stylesheets) => {
    const basePath = `${__basedir}/src/${stylesheets}`;

    await files.createScaffolding([
      { type: "file", path: `${basePath}/_base.${stylesheets}` },
      { type: "file", path: `${basePath}/_layout.${stylesheets}` },
      { type: "directory", path: `${basePath}/modules` },
      { type: "file", path: `${basePath}/modules/_example.${stylesheets}` },
    ]);

    const importRules =
      stylesheets === "css"
        ? '@import "./_base.css";\n@import "./_layout.css";\n@import "./modules/_example.css";'
        : '@import "base";\n@import "layout";\n@import "modules/example";';

    await files.writeInFile(`${basePath}/main.${stylesheets}`, importRules);
  },
  removeGitDirectory: async () => {
    await files.removeDirectory(`${__basedir}/.git`);
  },
  installNpmPackages: () => {
    return new Promise((resolve) => {
      const exec = require("child_process").exec;

      exec(`npm install --prefix ${__basedir}`, () => {
        resolve();
      });
    });
  },
};
