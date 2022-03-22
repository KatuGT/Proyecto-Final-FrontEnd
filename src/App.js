import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Configuracion from "./Componentes/Configuracion";
import MisDatos from "./Componentes/PaginasPanelAdmin/MisDatos/MisDatos";

import UsuariosLista from "./Componentes/PaginasPanelAdmin/Tablas/ListaUsuarios";
import UsuarioEditar from "./Componentes/PaginasPanelAdmin/Editar/UserEditar";
import ListasPeliculas from "./Componentes/PaginasPanelAdmin/Tablas/ListasPeliculas";
import Peliculas from "./Componentes/PaginasPanelAdmin/Tablas/Peliculas";
import ListasSeries from "./Componentes/PaginasPanelAdmin/Tablas/ListasSeries";
import Series from "./Componentes/PaginasPanelAdmin/Tablas/Series";
import Destacados from "./Componentes/PaginasPanelAdmin/Tablas/ListaDestacados";

import PeliculaEditar from "./Componentes/PaginasPanelAdmin/Editar/PeliculaEditar";
import SerieEditar from "./Componentes/PaginasPanelAdmin/Editar/SerieEditar";
import ListaPeliculasEditar from "./Componentes/PaginasPanelAdmin/Editar/ListaPeliculasEditar";
import ListaSeriesEditar from "./Componentes/PaginasPanelAdmin/Editar/ListaSeriesEditar";
import MisDatosEditar from "./Componentes/PaginasPanelAdmin/Editar/MisDatosEditar";

import SeccionIndividual from "../src/SeccionIndividual/SeccionIndividual";
import NotFound from "./Componentes/404/NotFound";
import LoginRegistro from "../src/LoginRegistro/LoginRegistro";
import RegsitroExitoso from "./RegistroExitoso/RegsitroExitoso";
import { Context } from "./Context/Context";
import RutasPrivadas from "./RutasPrivadas";

export default function App() {
  const { user } = useContext(Context);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={user && user.estaActivo ? <Home /> : <LoginRegistro />}
          />
          <Route path="/registro-exitoso" element={<RegsitroExitoso />} />
          <Route element={<RutasPrivadas />}>
            <Route path="/peliculas" element={<Home tipo="pelicula" />} />
            <Route path="/series" element={<Home tipo="serie" />} />
            <Route path="/configuracion" element={<Configuracion />}>
              {/* <Route index element={<MisDatos />} /> */}
              <Route  path="misdatos/:userId" element={<MisDatos />}>
                <Route path="datos/" element={<MisDatosEditar />} />
              </Route>
              {user?.esAdmin && (
                <>
                  <Route path="usuarioslista" element={<UsuariosLista />}>
                    <Route path="user/:userId" element={<UsuarioEditar />} />
                  </Route>
                  <Route path="peliculas" element={<Peliculas />}>
                    <Route
                      path="pelicula/:peliId"
                      element={<PeliculaEditar />}
                    />
                  </Route>
                  <Route path="listapeliculas" element={<ListasPeliculas />}>
                    <Route
                      path="listapelicula/:listaId"
                      element={<ListaPeliculasEditar />}
                    />
                  </Route>
                  <Route path="series" element={<Series />}>
                    <Route path="serie/:serieId" element={<SerieEditar />} />
                  </Route>
                  <Route path="listaseries" element={<ListasSeries />}>
                    <Route
                      path="listaseries/:listaId"
                      element={<ListaSeriesEditar />}
                    />
                  </Route>
                  <Route path="filmsDestacados" element={<Destacados/>}></Route>
                </>
              )}
            </Route>

            <Route path="/ver/:id" element={<SeccionIndividual />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}
