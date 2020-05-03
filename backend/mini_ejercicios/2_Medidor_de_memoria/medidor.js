const { totalmem, freemem } = require("os");
const chalk = require("chalk");

console.log(
  `Tienes un ${chalk.greenBright(
    (freemem() * 100) / totalmem(),
    "%"
  )} de memoria libre.`
);
