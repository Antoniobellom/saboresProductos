import React, { useState ,useEffect} from 'react'

const Productos = () => {
  const [productos,setProducto]=useState([])
  const [selectProductos,setSelectProductos]=useState('')
  
  useEffect(() => {
    // Función para cargar las regiones desde el servidor
    const cargarProductos = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/api/productos');
        if (!respuesta.ok) {
          throw new Error(`HTTP error! status: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        setProducto(datos);
  
        if (datos.length > 0) {
          setSelectProductos(datos[0].id);
        }
      } catch (error) {
        console.error("No se pudieron cargar los productos:", error);
      }
    };
    cargarProductos();
  }, []);
  
  const handleSelect=(e)=>{
      setSelectProductos(e.target.value)
  }

  return (
    <div>
      <select
        value={selectProductos}
        onChange={handleSelect}
      >
        {productos.map((producto)=>(
          <option 
          key={producto.id}
          value={producto.id}
          >
            {producto.nombre}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Productos