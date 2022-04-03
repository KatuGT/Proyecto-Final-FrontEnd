import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Cargando from "../../Imagenes/Cargando-icon.svg";

function CardItems({ item }) {
  const [pelicula, setPelicula] = useState({});

  const getFilms = useCallback(async () => {
    try {
      await axios.get("https://rollflix-back.herokuapp.com/api/films/" + item).then((response) => {
        setPelicula(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, [item]);

  useEffect(() => {
    getFilms();
  }, [getFilms]);

  const mostrar = item ? (
    <Link to={{ pathname: `/ver/${pelicula?._id}` }} className="link-card">
      <div className="card-contenedor">
        <img src={pelicula?.imagenVertical || Cargando} alt="imagen pelicula" />
        <div className="card-info">
          <p className="card-titulo">{pelicula?.nombre}</p>
          <hr />
          <p className="card-subinfo">{pelicula?.sinopsis}</p>
        </div>
      </div>
    </Link>
  ) : (
    ""
  );

  return mostrar;
}

export default CardItems;
