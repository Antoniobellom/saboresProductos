const fs = require('fs');
const csv = require('csv-parser');

function leerCSV(rutaArchivo) {
  const resultados = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(rutaArchivo)
      .pipe(csv())
      .on('data', (data) => resultados.push(data))
      .on('end', () => {
        resolve(resultados);
      });
  });
}

module.exports = leerCSV;