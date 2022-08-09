const fs = require("fs");
const mv = require("mv");
const replace = require("replace-in-file");

module.exports = {
  createFile: (file) => {
    return fs.writeFile(file, "", (error) => {
      if (error) {
        console.log(`Impossible de créer le fichier "${file}"`);
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
  replaceInFile: async (files, from, to) => {
    try {
      const results = await replace({ files, from, to });
    } catch (error) {
      console.log(
        `Impossible de remplacer la chaîne dans le fichier "${files}"`
      );
    }
  },
  createDirectory: (directory) => {
    return fs.mkdirSync(directory, (error) => {
      if (error) {
        console.log(`Impossible de créer le dossier "${directory}"`);
      }
    });
  },
  removeDirectory: (directory) => {
    return fs.rmdir(directory, { recursive: true }, (error) => {
      if (error) {
        console.log(`Impossible d'effacer le dossier "${directory}"`);
      }
    });
  },
  createScaffolding(tree) {
    tree.forEach((item) => {
      switch (item.type) {
        case "file":
          this.createFile(item.path);
          break;
        case "directory":
          this.createDirectory(item.path);
          break;
      }
    });
  },
};
