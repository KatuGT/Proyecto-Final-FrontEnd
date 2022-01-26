import { useState, useEffect } from "react";
import ListaCards from "./Componentes/ListaCards";
import axios from "axios";
import Footer from "./Componentes/Footer/Footer";
import Navbar from "./Componentes/Navbar/Navbar";
import Cargando from "./Imagenes/Cargando-icon.svg";
import Comentarios from "./Componentes/Comentarios/Comentarios";

export default function Home({ tipo }) {
  const [listas, setListas] = useState([]);

  useEffect(() => {
    const getListaRandom = async () => {
      try {
        const res = await axios.get(
          `listapeliculas${tipo ? "?tipo=" + tipo : ""}`
        );
        setListas(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getListaRandom();
  }, [tipo]);

 const listasMostrar = listas.filter(
  (lista) => lista.contenido.length > 1
);

  return (
    <div>
      <Navbar />
      <h2>Aqui va el slider</h2>
      {listasMostrar.map((lista) => (
        <ListaCards lista={lista} />
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
