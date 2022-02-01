import { useState, useEffect, useCallback } from "react";
import ListaCards from "./Componentes/ListaCards";
import axios from "axios";
import Footer from "./Componentes/Footer/Footer";
import Navbar from "./Componentes/Navbar/Navbar";
import Cargando from "./Imagenes/Cargando-icon.svg";
import Slider from "./Componentes/Slider/Slider";

export default function Home({ tipo }) {
  const [listas, setListas] = useState([]);
  const [genero, setGenero] = useState(null);
  //const [films, setFilms] = useState([]);
  // const [contenido, setContenido] = useState([]);

  const getListas = useCallback(async () => {

    
    try {
      await axios
        .get(
          `http://localhost:4001/api/listapeliculas/filterList${
            tipo ? "?tipo="+tipo : ""
          }${genero ? "&genero=" + genero : "" }`
        )
        .then((response) => {
          setListas(response.data);
          // setContenido(response.data.contenido);
        });
      await axios
        .get(`http://localhost:4001/api/peliculas/`)
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

  const listasMostrar = listas.filter((lista) => lista.contenido.length > 1);

  return (
    <div className="contenedor-navbar-configuacion">
      <Navbar />
      <Slider tipo={tipo} setGenero={setGenero} />
      {listasMostrar.map((lista) => (
        <ListaCards lista={lista} genero={genero}/>
      ))}
      <Footer />

      {listas.length <= 0 && (
        <div className="loading">
          <img src={Cargando} alt="cargando-icono" />
        </div>
      )}
    </div>
  );
}
