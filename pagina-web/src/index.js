import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Comunas from './modulos/comunas';
import Productos from './modulos/productos';
import Regiones from './modulos/regiones';
import Sabores from './modulos/sabores';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Regiones/>
   <Comunas />
   <Sabores />
   <Productos/>
  </React.StrictMode>
);

