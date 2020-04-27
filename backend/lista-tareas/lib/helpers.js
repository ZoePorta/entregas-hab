const fs = require("fs-extra");
const chalk = require("chalk");
const { format } = require("date-fns");
const { es } = require("date-fns/locale");

const chalkError = chalk.red;

function readData(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);

    const todoList = JSON.parse(buffer.toString());

    return todoList;
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(chalkError("Aun no existe una lista de tareas"));
    } else {
      console.error(error);
    }
    process.exit();
  }
}

function formatDate(date) {
  date = new Date(date);
  return format(date, "cccc d 'de' MMMM 'del' yyyy 'a las' H:mm", {
    locale: es,
  });
}

module.exports = {
  readData,
  formatDate,
};
