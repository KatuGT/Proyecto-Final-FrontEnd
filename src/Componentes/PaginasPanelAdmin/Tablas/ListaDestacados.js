import "./Tabla.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Cargando from "../../../Imagenes/Cargando-icon.svg";

export default function ListasSeries({ Lista }) {
  //MOSTRAR LISTAS
  const [filmsDestacados, setFilmDestacados] = useState([]);

  const getFilmsDestacados = async () => {
    try {
      axios.get(`https://rollflix-back.herokuapp.com/api/films/`).then((response) => {
        setFilmDestacados(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFilmsDestacados();
  }, [Lista]);

  //FILTRAR LISTAR PARA MOSTRAR EN LA TABLA
  const [destacadas, setDestacadas] = useState([]);

  useEffect(() => {
    if (filmsDestacados) {
      setDestacadas(filmsDestacados.filter((film) => film.destacada === true));
    }
  }, [filmsDestacados]);

  const cardsDestacadas = destacadas.map((lista) => {
    const listaActual = {
      id: lista._id,
      nombre: lista.nombre,
      imagen: lista.imagenVertical,
    };
    return listaActual;
  });

  

  return (
    <div className="tabla-contenido">
      <div className="contenedor-info-destacados">
        <h2>Films destacados</h2>
        <p>
          Los films que ven aqui son los que se muestran en el slider de la
          pagina principal.
        </p>
      </div>

      <section className="contenedor-film-destadas">
        {cardsDestacadas.map((destacada, index) => (
          <div className="card-film-destacado" key={index}>
            <img src={destacada?.imagen || Cargando} alt="Film Destacado" />
            <div className="datos-film-destacado">
              <h4>{destacada?.nombre}</h4>
            </div>
          </div>
        ))}
      </section>
  </div>
  );
}
