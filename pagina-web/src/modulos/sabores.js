import React, { useState, useEffect } from "react";

const Sabores = () => {
  const [sabores, setSabores] = useState([]);
  const [selectSabores, setSelectSabores] = useState("");
  
  useEffect(() => {
    const cargarSabores = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/api/sabores');
        console.log(respuesta)
        if (!respuesta.ok) {
          throw new Error(`HTTP error! status: ${respuesta.status}`);
        }
        const data = await respuesta.json();
        setSabores(Array.isArray(data) ? data : []);
        
        // Asegúrate de que 'data' sea un array antes de actualizar el estado
        if (Array.isArray(data)) {
          setSabores(data);
          if (data.length > 0) {
            setSelectSabores(data[0].id); // Asegúrate que 'data[0]' tenga una propiedad 'id'
          }
        } else {
          // Manejar el caso en el que 'data' no sea un array
          console.error('La respuesta no es un array:', data);
        }
      } catch (error) {
        console.error("No se pudieron cargar los sabores:", error);
      }
    };
  
    cargarSabores();
  }, []);

  const handleSelect = (e) => {
    setSelectSabores(e.target.value);
  };

  return (
    <div>
      <select value={selectSabores} onChange={handleSelect}>
        {sabores.map((sabor) => (
          <option key={sabor.id} value={sabor.nombre}>
            {sabor.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sabores;
