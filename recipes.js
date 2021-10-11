const files = require("./files.js");

module.exports = {
  setCss: async () => {
    await files.removeDirectory(`${__basedir}/src/scss`);
    await files.removeFile(`${__basedir}/src/index_scss.html`);
  },
  setScss: async () => {
    await files.removeDirectory(`${__basedir}/src/css`);
    await files.removeFile(`${__basedir}/src/index.html`);
    await files.renameFile(
      `${__basedir}/src/index_scss.html`,
      `${__basedir}/src/index.html`
    );
  },
  setDefaultStructure: async (stylesheets) => {
    await files.removeDirectory(`${__basedir}/src/${stylesheets}/smacss`);
  },
  setSmacssStructure: async (stylesheets) => {
    await files.removeFile(
      `${__basedir}/src/${stylesheets}/main.${stylesheets}`
    );
    await files.moveFiles(
      `${__basedir}/src/${stylesheets}/smacss`,
      `${__basedir}/src/${stylesheets}`
    );
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
