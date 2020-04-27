const chalk = require("chalk");
const fs = require("fs-extra");

const cError = chalk.red;

const { readData, formatDate } = require("./helpers.js");

class todoList {
  constructor(filePath) {
    this.filePath = filePath;

    this.data;
  }

  //añadir una nueva tarea
  addTodo({ text, priority }) {
    const cleanText = text.join(" ");

    if (!fs.pathExistsSync(this.filePath)) {
      fs.writeJsonSync(this.filePath, { tasks: [] });
    }
    this.data = readData(this.filePath);

    const newTask = {
      text: cleanText,
      added: new Date(),
      priority: priority ? "high" : "normal",
      done: false,
    };

    this.data.tasks.unshift(newTask);

    this.saveTodosToFile();
  }

  markAsDone(index) {
    this.data = readData(this.filePath);
    if (this.data.tasks[index]) {
      this.data.tasks[index].done = true;
      this.saveTodosToFile();
    } else {
      console.log(cError(`No existe ninguna tarea en el índice ${index}`));
    }
  }

  markAsUndone(index) {
    this.data = readData(this.filePath);
    if (this.data.tasks[index]) {
      this.data.tasks[index].done = false;
      this.saveTodosToFile();
    } else {
      console.log(cError(`No existe ninguna tarea en el índice ${index}`));
    }
  }

  listTodos() {
    this.data = readData(this.filePath);

    const normal = chalk.blueBright;
    const prioritary = chalk.underline.greenBright;
    const done = chalk.strikethrough;

    console.log(`${normal("normal")}    ${prioritary("importante")}     ${done(
      "completada"
    )}
  
  `);

    let index = 0;
    for (const task of this.data.tasks) {
      let style = normal;

      if (task.priority === "high") {
        style = prioritary;
      }
      if (task.done) {
        style = done;
      }
      console.log(
        `${index} - ${style(task.text)}
      Añadida el ${formatDate(task.added)} `
      );
      index++;
    }
    console.log(
      chalk.blue(
        `Lista modificada por última vez el ${formatDate(this.data.lastUpdate)}`
      )
    );
  }

  cleanTodos() {
    this.data = readData(this.filePath);
    const tasks = this.data.tasks;

    for (let i = tasks.length - 1; i >= 0; i--) {
      if (tasks[i].done) {
        tasks.splice(i, 1);
      }
    }

    this.saveTodosToFile();
  }

  saveTodosToFile() {
    this.data.lastUpdate = new Date();
    try {
      fs.writeJsonSync(this.filePath, this.data);

      console.log(`
        ${chalk.greenBright("La lista fue actualizada correctamente. ")}
        Utiliza el argumento --list para ver las tareas.
      `);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = {
  todoList,
};
