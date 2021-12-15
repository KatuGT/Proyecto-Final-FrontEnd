import React from "react";

function CardItems() {
  return (
    <>
      <div className="card-contenedor">
        <img
          src="https://i.blogs.es/4a9cb1/titanic/840_560.jpeg"
          alt="imagen pelicula"
        />
        <div className="card-info">
          <p className="card-titulo">TITULO</p>
          <p className="card-estreno">Estreno 2021</p>
        </div>
      </div>
    </>
  );
}

export default CardItems;
