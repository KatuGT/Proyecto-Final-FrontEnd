import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SeccionIndividual.css";
import Navbar from "../Componentes/Navbar/Navbar";
import Footer from "../Componentes/Footer/Footer"
import axios from "axios";
import Comentarios from "../Componentes/Comentarios/Comentarios";

export default function SeccionIndividual() {
  let { id } = useParams();

  const [pelicula, setPelicula] = useState({});
  useEffect(() => {
    async function getPelicula() {
      try {
        const pelicula = await axios.get(
          `http://localhost:8800/api/films/${id}`
        );
        setPelicula(pelicula.data);
      } catch (err) {
        console.log("messaje", err);
      }
    }
    getPelicula();
  },[id]);

  console.log(id);
  return (
    <div>
      <Navbar />
      <section className="container-sm contenedor-pelicula mb-4">
        <figure className="header-pelicula">
          <div className="degrade"></div>
          <img src={pelicula.imagenHorizontal} alt="imagen" />
        </figure>
        <div className="contenedor-texto row">
          <div className="titulo-resenia col-xl-8">
            <div className="titulo">
              <h1>{pelicula.nombre}</h1>
            </div>
            <div className="resenia">
              <p>{pelicula.sinopsis}</p>
            </div>
          </div>

          <div className="datos col-xl-4">
            <div className="item-datos">
              <p className="titulo-dato">Director:</p>
              <p className="dato">{pelicula.director}</p>
            </div>
            <div className="item-datos">
              <p className="titulo-dato">Protagonistas:</p>
              <p className="dato">{pelicula.protagonistas}</p>
            </div>
            <div className="item-datos">
              <p className="titulo-dato">Estreno:</p>
              <p className="dato">{pelicula.fecha_de_Estreno}</p>
            </div>
            <div className="item-datos">
              <p className="titulo-dato">Duración:</p>
              <p className="dato">{pelicula.duracion}</p>
            </div>
            <div className="item-datos">
              <p className="titulo-dato">Género:</p>
              <p className="dato">{pelicula.genero}</p>
            </div>
          </div>
        </div>

        <div className="trailer ratio ratio-16x9">
          <iframe
            width="560"
            height="315"
            src={pelicula.trailer}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <Comentarios id={id}/>
      </section>
     <Footer/>
    </div>
  );
}
