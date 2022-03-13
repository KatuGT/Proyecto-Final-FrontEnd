import { useState } from "react";
import CardItems from "./CardItems";
import "./EstilosCard.css";

function ListaCards({ lista, genero }) {
  const [scrollX, setScrollX] = useState(-500);

  const handleLeft = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRight = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);

    if (window.innerWidth > 900) {
      let listaWidth = lista.contenido.length * 250;
      if (window.innerWidth - listaWidth > x) {
        x = window.innerWidth - listaWidth;
      }
      setScrollX(x);
    } else {
      let listaWidth = lista.contenido.length * 150;
      if (window.innerWidth - listaWidth > x) {
        x = window.innerWidth - listaWidth;
      }
      setScrollX(x);
    }
  };

 

  return (
    <section className="contenedor-principal">
      <h3 className="categoria-lista">{lista.nombre}</h3>
      <button
        id="flecha-izquierda"
        className={`${genero !== null ? "flecha-izquierda d-none" : "flecha-izquierda " }`}
        onClick={handleLeft}
      >
        <i className="fas fa-caret-left"></i>
      </button>
      <section className="contenedor-lista-items">
        <section className={`${genero !== null ? "lista-con-genero" : "lista-sin-genero"}`} style={{ left: scrollX }}>
          {lista.contenido.length > 0
            ? lista.contenido.map((item, index) => <CardItems key={index} item={item} />)
            : ""}
        </section>
      </section>
      <button
        id="flecha-derecha"
        className= {`${genero !== null ? "flecha-derecha d-none" : "flecha-derecha " }`}
        onClick={handleRight}
      >
        <i className="fas fa-caret-right"></i>
      </button>
    </section>
  );
}

export default ListaCards;
