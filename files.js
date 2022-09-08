const { dir } = require("console");
const fs = require("fs");
const mv = require("mv");
const replace = require("replace-in-file");

module.exports = {
  moveAllFiles(source, destination) {
    mv(source, destination, { mkdirp: false, clobber: false }, (error) => {
      if (error) {
        console.log(
          `Impossible de déplacer les fichiers de "${source}" vers "${destination}"`
        );
      }
    });
  },
  removeDirectory(directory) {
    fs.rmSync(__basedir + directory, { recursive: true }, (error) => {
      if (error) {
        console.log(`Impossible d'effacer le dossier "${directory}"`);
      }
    });
  },
  createFile(file) {
    fs.writeFileSync(__basedir + file, "", (error) => {
      if (error) {
        console.log(`Impossible de créer le fichier "${file}"`);
      }
    });
  },
  createDirectory(directory) {
    fs.mkdirSync(__basedir + directory, (error) => {
      if (error) {
        console.log(`Impossible de créer le dossier "${directory}"`);
      }
    });
  },
  readFile(file) {
    return fs.readFileSync(__basedir + file, "utf8");
  },
  writeInFile(file, data) {
    fs.appendFileSync(__basedir + file, data, (error) => {
      if (error) {
        console.log(`Impossible d'écrire dans le fichier "${file}"`);
      }
    });
  },
  async replaceInFile(file, from, to) {
    replace({ files: __basedir + file, from, to });
  },
  createScaffolding(tree) {
    tree.forEach((item) => {
      if (item.type === "directory") {
        this.createDirectory(item.path);
      } else {
        this.createFile(item.path);
      }
    });
  },
};
