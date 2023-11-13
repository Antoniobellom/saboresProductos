import React, { useState ,useEffect} from 'react'

const Comunas = () => {
    const [comunas,setComunas]= useState([])
    const [selectComunas,setSelectComunas]=useState('')

    useEffect(() => {
        const cargarComunas = async () => {
          try {
            const respuesta = await fetch('http://localhost:3000/api/comunas');
            if (!respuesta.ok) {
              throw new Error(`HTTP error! status: ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            setComunas(datos)
            console.log(datos)
            if (datos.length > 0) {
              setSelectComunas(datos[0].nombre)
            }
          } catch (error) {
            console.error("No se pudieron cargar las comunas:", error);
          }
        }
        cargarComunas()
      }, [])

    const handleSelect=(event)=>{
        setSelectComunas(event.target.value)

    }
    

  return (
    <div>
    <h1>selecciona tu comuna</h1>
    <select
      value={selectComunas}
      onChange={handleSelect}
    >
      {comunas.map((comuna) => (
        <option key={comuna.id} value={comuna.nombre}>
          {comuna.nombre}
        </option>
      ))}
    </select>
    <p>Comuna seleccionada: {selectComunas}</p>
  </div>
)
}

export default Comunas