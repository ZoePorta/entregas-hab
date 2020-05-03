const path = require("path");
const chalkError = require("chalk").redBright;
const fs = require("fs");

const files = process.argv.slice(2);

function showFiles(filesList) {
  for (const file of filesList) {
    const filePath = path.resolve(file);
    try {
      if (fs.statSync(filePath).size < 10240) {
        const content = fs.readFileSync(filePath, "utf-8");
        console.log(content);
      } else {
        console.log(chalkError(`El archivo ${file} pesa más de 10Kb.`));
      }
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(chalkError(`El archivo ${file} no existe.`));
      } else {
        console.log(chalkError(error.message));
      }
    }
  }
}

showFiles(files);
