const minimist = require("minimist");

const chalk = require("chalk");
const homedir = require("os").homedir();
const path = require("path");

const cError = chalk.redBright;
const argument = chalk.blueBright;

const { todoList } = require("./lib/actions.js");

const filePath = path.join(homedir, "/.tasks.json");

const { _, priority, list, done, undone, clean } = minimist(
  process.argv.slice(2)
);

myTodoList = new todoList(filePath);

//procesamos argumentos
if (_.length > 0) {
  myTodoList.addTodo({ text: _, priority, filePath: filePath });
}

if (clean) {
  myTodoList.cleanTodos();
  process.exit();
}

if (list) {
  myTodoList.listTodos(filePath);
}

if (done || done === 0) {
  myTodoList.markAsDone(done);
}

if (undone || undone === 0) {
  myTodoList.markAsUndone(undone);
}

if (
  !(
    _.length > 0 ||
    clean ||
    list ||
    done ||
    done === 0 ||
    undone ||
    undone === 0
  )
) {
  console.log(`${cError("Faltan argumentos.")}
  Argumentos disponibles:
  
  ${argument('"Descripcion de la tarea"')} -> Añade una nueva tarea a la lista. 
              Si incluye ${argument(
                "--priority"
              )} se registra con prioridad alta.
  ${argument("--list")} -> Muestra la lista de tareas.
  ${argument(
    "--done={índice}"
  )} -> Marca como finalizada la tarea correspondiente al índice.
  ${argument(
    "--undone={índice}"
  )} -> Marca como inacabada la tarea correspondiente al índice.
  ${argument("--clean")} -> Borra de la lista las tareas finalizadas.`);
}
