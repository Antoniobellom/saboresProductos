import React, { useState, useEffect } from 'react';

function Regiones() {
    const [regiones, setRegiones] = useState([]);
    const [regionSeleccionada, setRegionSeleccionada] = useState('');
 
  
    useEffect(() => {
      // Función para cargar las regiones desde el servidor
      const cargarRegiones = async () => {
        try {
          const respuesta = await fetch('http://localhost:3000/api/regiones');
          if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
          }
          const datos = await respuesta.json();
          setRegiones(datos);
          // Opcional: seleccionar una región por defecto
          if (datos.length > 0) {
            setRegionSeleccionada(datos[0].id);
          }
        } catch (error) {
          console.error("No se pudieron cargar las regiones:", error);
        }
      };
  
      // Llamar a la función cargarRegiones
      cargarRegiones();
    }, []);
  
    // Manejador para cuando se selecciona una nueva región
    const handleRegionChange = (event) => {
      setRegionSeleccionada(event.target.value);
    };
  
    return (
      <div>
        <h1>Selecciona una Región</h1>
        <select value={regionSeleccionada} onChange={handleRegionChange}>
          {regiones.map((region) => (
            <option key={region.id} value={region.id}>
              {region.nombre}
            </option>
          ))}
        </select>
        <p>Región seleccionada: {regionSeleccionada}</p>
      </div>
    );
  }
export default Regiones;
