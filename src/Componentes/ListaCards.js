import { useRef, useState } from "react";
import BtnAgragarCard from "./BtnAgragarCard";
import CardItems from "./CardItems";

// const contenedorLista = document.querySelector('.contenedor-lista-items')
// const flechaIzquierda = document.getElementById('flecha-izquierda')
// const flechaDerecha = document.getElementById('flecha-derecha')

// flechaDerecha.addEventListener('click', () =>{
//     contenedorLista.scrollLeft +=  contenedorLista.offsetWidth
// })

// flechaIzquierda.addEventListener('click', () =>{
//     contenedorLista.scrollLeft -=  contenedorLista.offsetWidth
// })

function ListaCards() {
  const listRef = useRef();
  const [contador, setContador] = useState(0)

  const handleClick = (direccion) => {
    const anchoPantalla = listRef.current.offsetWidth / 5;

    if (direccion === "left") {
      setContador((contador - 1) < 0 ? 0 : contador - 1)
      listRef.current.style.transform = `translateX(-${contador * anchoPantalla}px)`;
      
     // listRef.current.scrollLeft +=  listRef.current.offsetWidth
    }

    if (direccion === "right") {
      console.log(listRef.current.offsetWidth);
      setContador((contador * anchoPantalla) >  listRef.current.offsetWidth ? contador : contador + 1)

      listRef.current.style.transform = `translateX(-${contador * anchoPantalla}px)`;

       //listRef.current.scrollLeft -=  listRef.current.offsetWidth
    }
  };

  return (
    <section className="contenedor-principal">
      <h3 className="categoria-lista">Peliculas</h3>
      <button
        id="flecha-izquierda"
        className="flecha-izquierda"
        onClick={() => handleClick("left")}
      >
        <i className="fas fa-caret-left"></i>
      </button>
      <section className="contenedor-lista-items" >
        <section className="lista-items" ref={listRef}>
          <BtnAgragarCard />
          <CardItems />
          <CardItems />
          <CardItems />
          <CardItems />
          <CardItems />
          <CardItems />
          <CardItems />
          <CardItems />
          <CardItems />
        </section>
      </section>
      <button
        id="flecha-derecha"
        className="flecha-derecha"
        onClick={() => handleClick("right")}
      >
        <i className="fas fa-caret-right"></i>
      </button>
    </section>
  );
}

export default ListaCards;
