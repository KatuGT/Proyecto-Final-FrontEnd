import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Configuracion from "./Componentes/Configuracion";
import MisDatos from "./Componentes/PaginasPanelAdmin/MisDatos";
import Peliculas from "./Componentes/PaginasPanelAdmin/Peliculas";
import UsuariosLista from "./Componentes/PaginasPanelAdmin/UsuariosLista";
import User from "./Componentes/PaginasPanelAdmin/User";
import Pelicula from "./Componentes/PaginasPanelAdmin/Pelicula";
import LogIn from "./Componentes/LogIn";
import Register from "./Componentes/Register";


export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/configuracion" element={<Configuracion />}>
            <Route index element={<MisDatos />} />
            <Route path="misdatos" element={<MisDatos />} />
            <Route path="usuarioslista" element={<UsuariosLista />}>
              <Route path="user/:userId" element={<User />} />
            </Route>
            <Route path="peliculas" element={<Peliculas />}>
              <Route path="pelicula/:peliId" element={<Pelicula />} />
            </Route>
          </Route>
          <Route path="Register" element={<Register />}/>
        </Routes>
      </Router>
    </div>
  );
}
