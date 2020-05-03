const express = require("express");
const getHours = require("date-fns/getHours");
const app = express();

app.use((req, res, next) => {
  if (getHours(new Date()) < 14 && getHours(new Date()) > 6) {
    res.send("<h1>Hola</h1>");
  } else {
    next();
  }
});

app.use((req, res) =>
  res.status(404).send("<h1>Error 404</h1><h2>Página no encontrada</h2>")
);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("hubo un error");
});

app.listen(3000);
