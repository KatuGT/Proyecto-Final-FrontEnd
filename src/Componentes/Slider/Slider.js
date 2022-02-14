import React, { useEffect, useState } from "react";
import axios from "axios";
import "./slider.css";
import RollflixHeader from "../../Imagenes/ROLLFLIX-HEADER.jpg";
import { Link } from "react-router-dom";

export default function Slider({tipo, setGenero}) {
  const [films, setFilms] = useState([]);
const [lista, setLista] = useState("");

  useEffect(() => {
    async function getFilms() {
      await axios
        .get(`http://localhost:8800/api/listafilms/filterList${
          tipo ? "?tipo="+tipo : ""
        }`)
        .then((response) => {
          setLista(response.data);         
        });
      try {
        const film = await axios.get(`http://localhost:8800/api/films/`);
        setFilms(film.data);
      } catch (err) {
        console.log("messaje", err);
      }
    }
    getFilms();
  }, [tipo]);

  const listaCategorias = []

  for (let i = 0; i < lista.length; i++) {
    const element = lista[i].genero;
    listaCategorias.push(element)
  }


 // const [destacadas, setDestacadas] = useState([]);

  // useEffect(() => {
  //   if (films) {
  //     setDestacadas(films.filter((film) => film.destacada === true));
  //   }
  // }, [films]);

  //   const header = destacadas.map((element) => {
  //     const mostrarDestacada = {
  //       id: element._id,
  //       nombre: element.nombre,
  //       sinopsis: element.sinopsis,
  //       imagenHorizontal: element.imagenHorizontal
  //     };
  //     return mostrarDestacada;
  //   });

  return (
    <div className="contenedor-slider">
      {tipo && (
        <div className="categorias">
          <select
            name="genero"
            id="genero"
            aria-label="Default select example"
            className="form-select"
            onChange={(e) => setGenero(e.target.value)}
          >
            <option disabled selected>Genero</option>
            {listaCategorias.map((categoria) => <option value={categoria}>{categoria}</option>)}
          </select>
        </div>
      )}

      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="4"
            aria-label="Slide 5"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="5"
            aria-label="Slide 6"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="6"
            aria-label="Slide 7"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={RollflixHeader} className="d-block w-100" alt="..." />
          </div>
          {films.map((element) =>
            element.destacada === true ? (
              <div className="carousel-item">
                <img
                  src={element.imagenHorizontal}
                  className="d-block"
                  alt="Imagen de film destacado"
                />
                <section className="contenedor-info-header">
                  <div className="titulo-header">
                    <p>{element.nombre}</p>
                  </div>
                  <div className="sinopsis-header">
                    <p>{element.sinopsis.slice(0, 200)}... <Link to={{ pathname: `/ver/${element?._id}` }} className="link-header">VER MAS</Link></p>
                  </div>
                </section>
              </div>
            ) : (
              ""
            )
          )}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
