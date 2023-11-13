const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('miBaseDeDatos.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS regiones (id INTEGER PRIMARY KEY, nombre TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS comunas (id INTEGER PRIMARY KEY, nombre TEXT, id_region INTEGER)");
  db.run("CREATE TABLE IF NOT EXISTS sabores (id INTEGER PRIMARY KEY, nombre TEXT, descripcion TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS productos(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, sabor_id INTEGER, precio REAL NOT NULL, FOREIGN KEY(sabor_id) REFERENCES sabores(id))")
});

const insertarSabor = db.prepare("INSERT INTO sabores (nombre, descripcion) VALUES (?, ?)");
insertarSabor.run('Chocolate', 'Sabor chocolate intenso y dulce');
insertarSabor.finalize();

// Insertar un producto en la tabla Productos
const insertarProducto = db.prepare("INSERT INTO productos (nombre, sabor_id, precio) VALUES (?, ?, ?)");
// Asumiendo que el sabor Chocolate tiene id 1
insertarProducto.run('Proteína de Chocolate', 1, 19.99);
insertarProducto.finalize();


db.run("DELETE FROM regiones", (err) => {
    if (err) {
      console.error("Error al vaciar la tabla regiones:", err.message);
    }
  });

function insertarComunas(datos) {
    const stmt = db.prepare("INSERT OR IGNORE INTO comunas (id, nombre, id_region) VALUES (?, ?, ?)");
    db.serialize(() => {
      for (const { ID, commune, id_region } of datos) {
        stmt.run(ID, commune, id_region, (err) => {
          if (err) {
            console.error(err.message);
          }
        });
      }
      stmt.finalize();
    });
  }
 

function agregarColumnaIdRegionSiNoExiste() {
  db.run("ALTER TABLE regiones ADD COLUMN id_region INTEGER", (err) => {
    if (err && !err.message.includes("duplicate column name")) {
      console.error("Error al agregar la columna 'id_region':", err.message);
    } else if (!err) {
      console.log("Columna 'id_region' agregada a la tabla 'regiones'");
    }
  });
}
agregarColumnaIdRegionSiNoExiste();



  function insertarRegiones(datos) {
    const stmt = db.prepare("INSERT OR IGNORE INTO regiones (id, nombre) VALUES (?, ?)");
    db.serialize(() => {
      for (const { ID, region} of datos) {
        stmt.run(ID, region, (err) => {
          if (err) {
            console.error("Error al insertar región:", err.message);
          }
        });
      }
      stmt.finalize();
    });
  }
  
  module.exports = {
    db,
    insertarRegiones,
    insertarComunas,
  };
