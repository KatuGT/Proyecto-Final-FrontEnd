import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Configuracion from "./Componentes/Configuracion";
import MisDatos from "./Componentes/PaginasPanelAdmin/MisDatos/MisDatos";

import UsuariosLista from "./Componentes/PaginasPanelAdmin/Tablas/ListaUsuarios";
import ListasPeliculas from "./Componentes/PaginasPanelAdmin/Tablas/ListasPeliculas";
import Peliculas from "./Componentes/PaginasPanelAdmin/Tablas/Peliculas";
import ListasSeries from "./Componentes/PaginasPanelAdmin/Tablas/ListasSeries";
import Series from "./Componentes/PaginasPanelAdmin/Tablas/Series";

import PeliculaEditar from "./Componentes/PaginasPanelAdmin/Editar/PeliculaEditar";
import SerieEditar from "./Componentes/PaginasPanelAdmin/Editar/SerieEditar";
import ListaPeliculasEditar from "./Componentes/PaginasPanelAdmin/Editar/ListaPeliculasEditar";
import ListaSeriesEditar from "./Componentes/PaginasPanelAdmin/Editar/ListaSeriesEditar";

import UsuarioEditar from "./Componentes/PaginasPanelAdmin/Editar/UserEditar";
import SeccionIndividual from "../src/SeccionIndividual/SeccionIndividual";
import NotFound from "./Componentes/404/NotFound";
import Login from "../src/Login/Login";

export default function App() {
  const user = false
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={ user ? <Home /> : <Login/>} />
          <Route path="/peliculas" element={<Home tipo="pelicula" />} />
          <Route path="/series" element={<Home tipo="serie" />} />
          <Route path="/configuracion" element={<Configuracion />}>
            <Route index element={<MisDatos />} />
            <Route path="misdatos" element={<MisDatos />} />
            <Route path="usuarioslista" element={<UsuariosLista />}>
              <Route path="user/:userId" element={<UsuarioEditar />} />
            </Route>
            <Route path="peliculas" element={<Peliculas />}>
              <Route path="pelicula/:peliId" element={<PeliculaEditar />} />
            </Route>
            <Route path="listapeliculas" element={<ListasPeliculas />}>
              <Route path="listapelicula/:listaId" element={<ListaPeliculasEditar/>} />
            </Route>
            <Route path="series" element={<Series />}>
              <Route path="serie/:serieId" element={<SerieEditar />} />
            </Route>
            <Route path="listaseries" element={<ListasSeries />}>
              <Route path="listaseries/:listaId" element={<ListaSeriesEditar/>} />
            </Route>
          </Route>
          <Route path="/ver/:id"  element={<SeccionIndividual/>}/>
          <Route path="*"element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}
