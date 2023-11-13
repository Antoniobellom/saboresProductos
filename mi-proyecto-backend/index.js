const express = require("express");
const cors = require("cors");
const { db, insertarRegiones, insertarComunas } = require("./database");
const leerCSV = require("./csv-reader");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

const PORT = 3000;

Promise.all([
  leerCSV("./data/regions.csv").then(insertarRegiones),
  leerCSV("./data/communes.csv").then(insertarComunas)
]).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("Error al iniciar el servidor:", error);
});

app.get("/api/regiones", (req, res) => {
  db.all("SELECT * FROM regiones", [], (err, filas) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(filas);
  });
});

app.get("/api/sabores", (req, res) => {
    db.all("SELECT * FROM sabores", [], (err, filas) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      res.json(filas);
    });
  });

app.get("/api/comunas", (req, res) => {
  db.all("SELECT * FROM comunas", [], (err, filas) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(filas);
  });
});

const newLocal = "/api/productos";
app.get(newLocal, (req, res) => {
    db.all("SELECT * FROM productos", [], (err, filas) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      res.json(filas);
    });
  });
