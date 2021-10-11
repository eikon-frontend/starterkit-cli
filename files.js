var fs = require("fs");
var mv = require("mv");

module.exports = {
  removeDirectory: (directory) => {
    return fs.rmdir(directory, { recursive: true }, (error) => {
      if (error) {
        console.log(`Impossible d'effacer le dossier "${directory}"`);
      }
    });
  },
  removeFile: (file) => {
    return fs.unlink(file, (error) => {
      if (error) {
        console.log(`Impossible de supprimer le fichier "${file}"`);
      }
    });
  },
  renameFile: (oldName, newName) => {
    fs.rename(oldName, newName, (error) => {
      if (error) {
        console.log(`Impossible de renommer le fichier "${oldName}"`);
      }
    });
  },
  moveFiles: (oldPath, newPath) => {
    mv(oldPath, newPath, { mkdirp: false, clobber: false }, (error) => {
      if (error) {
        console.log(`Impossible de déplacer le dosser "${oldPath}"`);
      }
    });
  },
};
