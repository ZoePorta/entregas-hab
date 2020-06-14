//IMPORTANDO LO NECESARIO PARA LA CONEXIÓN/API; express, cors, body-parser, mysql
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

// JSONWEBTOKEN DEPENDENCIAS
const jwt = require("jsonwebtoken");
const config = require("./config");

//DECLARO LA 'APP'
const app = express();

//APP USES
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("llave", config.llave);

//DATOS DE CONEXIÓN
const connection = mysql.createConnection({
  host: "localhost", //HOST
  user: "usuario", //USUARIO
  password: "1234567890", //CONSTRASEÑA
  database: "hackamarket", //BBDD QUE VOY A USAR
});

//CONEXIÓN
connection.connect((error) => {
  if (error) throw error; //SI HAY UN ERROR...
  console.log("DATABASE UP"); //SI NO HAY ERROR.
});

//PUERTO
const PORT = 3050;

app.listen(PORT, () => console.log("API UP"));

//
//
//
/////// CLIENTES ////////////////////////////////

//FUNCIÓN PARA RECUPERAR TODOS LOS CLIENTES DE LA BBDD
app.get("/clientes", (req, res) => {
  //secuencia sql
  const sql = "SELECT * FROM clientes";

  //conexión
  connection.query(sql, (error, results) => {
    //si sale mal
    if (error) throw error;
    //si hay resultados
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No hay clientes");
    }
  });
});

//FUNCION PARA CREAR CLIENTES
app.post("/clientes/add", (req, res) => {
  //secuencia sql
  const sql = "INSERT INTO clientes SET ?";
  const newClient = req.body;

  //conexión
  connection.query(sql, newClient, (error) => {
    //si sale mal
    if (error) throw error;
    res.send("Cliente creado");
  });
});

//FUNCION PARA EDITAR UN CLIENTE
app.put("/clientes/edit/:id", (req, res) => {
  const { id } = req.params;
  const client = req.body;

  //Secuencia SQL
  const sql = `UPDATE clientes SET ? WHERE id=${id}`;

  connection.query(sql, client, (error) => {
    if (error) throw error;
    res.send("Cliente actualizado");
  });
});

//FUNCION PARA BORRAR CLIENTES
app.delete("/clientes/del/:id", (req, res) => {
  //secuencia sql
  const { id } = req.params;
  const sql = `DELETE FROM clientes WHERE id = ${id}`;

  //conexión
  connection.query(sql, (error) => {
    //si sale mal
    if (error) throw error;

    //si sale bien
    res.send("Cliente borrado");
  });
});

//
//
//
/////// USUARIOS ////////////////////////////////

//FUNCION PARA CREAR USUARIOS
app.post("/usuarios/add", (req, res) => {
  //secuencia sql
  const sql = "INSERT INTO usuarios SET ?";

  /* Solo recibe los campos email y password, 
  el campo "admin" está fijado a 0 por defecto en la BBDD */
  const newUser = req.body;

  //conexión
  connection.query(sql, newUser, (error) => {
    //si sale mal
    if (error) throw error;
    res.send("Usuario creado");
  });
});

//MÉTODO LOGIN QUE CREA EL TOKEN
app.post("/usuarios/auth", (req, res) => {
  //datos que llegan, user y pass
  const { email, password } = req.body;

  //secuencia sql
  const sql = `SELECT * FROM usuarios WHERE email ='${email}' AND  password='${password}'`;

  //CONEXION A LA BBDD
  connection.query(sql, (error, results) => {
    let admin = null;
    let name;
    if (error) throw error;

    //Si los datos coinciden con la BBDD
    if (results.length > 0) {
      const payload = { check: true };

      name = results[0].email;

      if (results[0].admin) {
        admin = true;
      } else {
        admin = false;
      }

      const token = jwt.sign(payload, app.get("llave"), {
        expiresIn: "1 day",
      });

      res.json({
        mensjae: "Te has autenticado correctamente",
        token: token,
        isAdmin: admin,
        name: name,
      });
    }
    //Si no hay resultados
    else {
      console.log("Datos incorrectos");
      res.send("Datos incorrectos");
    }
  });
});

//
//
//
/////// PRODUCTOS ////////////////////////////////

//FUNCIÓN PARA RECUPERAR TODOS LOS PRODUCTOS DE LA BBDD
app.get("/productos", (req, res) => {
  //secuencia sql
  const sql = "SELECT * FROM productos";

  //conexión
  connection.query(sql, (error, results) => {
    //si sale mal
    if (error) throw error;
    //si hay resultados
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No hay productos");
    }
  });
});
