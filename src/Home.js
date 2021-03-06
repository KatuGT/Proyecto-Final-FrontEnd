import { useState, useEffect, useCallback } from "react";
import ListaCards from "./Componentes/ListasCard/ListaCards";
import axios from "axios";
import Navbar from "./Componentes/Navbar/Navbar";
import Footer from "./Componentes/Footer/Footer";

import cargando from "./Imagenes/Cargando-icon.svg";
import Slider from "./Componentes/Slider/Slider";

export default function Home({ tipo }) {
  const [listas, setListas] = useState([]);
  const [genero, setGenero] = useState(null);

  const getListas = useCallback(async () => {
    try {
      await axios
        .get(
          `https://rollflix-back.herokuapp.com/api/listafilms/filterList${
            tipo ? "?tipo=" + tipo : ""
          }${genero ? "&genero=" + genero : ""}`
        )
        .then((response) => {
          setListas(response.data);
        });
      await axios
        .get(`https://rollflix-back.herokuapp.com/api/films/`)
        .then((response) => {
          // setFilms(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, [tipo, genero]);

  useEffect(() => {
    getListas();
  }, [getListas]);

  const listasMostrar = listas.filter((lista) => lista.contenido.length > 0);

  return (
    <div className="main-container">
      <Navbar />
      <Slider tipo={tipo} setGenero={setGenero} />
      {listasMostrar.map((lista, index) => (
        <ListaCards key={index} lista={lista} genero={genero} />
      ))}
      {listas.length <= 0 && (
        <div className="loading">
          <img src={cargando} alt="cargando-icono" />
        </div>
      )}
      <Footer />
    </div>
  );
}
