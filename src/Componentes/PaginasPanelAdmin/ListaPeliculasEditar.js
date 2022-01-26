import "../../Estilos/Pelicula.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Pelicula() {
  //MUESTRA EN INPUTS INFORMACION DE LA PELICULA SLECCIONADA PARA EDITAR
  let { listaId } = useParams();

  const [lista, setLista] = useState([]);
  useEffect(() => {
    async function getLista() {
      try {
        const lista = await axios.get(
          `http://localhost:4001/api/listapeliculas/${listaId}`
        )
        setLista(lista.data);
      } catch (err) {
        console.log("messaje", err);
      }
    }
    getLista();
  }, [listaId]);


  //ACTUALIZAR INFORMACION

  const [updatedItem, setUpdatedItem] = useState({
    nombre: "",
    tipo: "",
    genero: "",
    contenido: "",
  });

  function handleUpdate(event) {
    const { name, value } = event.target;
    setUpdatedItem(() => {
      return {
        [name]: value,
      };
    });

    console.log(setUpdatedItem);
  }

  function actualizarItem(event) {
    event.preventDefault();
    const informacionActualizada = {
      nombre: updatedItem.nombre,
      tipo: updatedItem.tipo,
      genero: updatedItem.genero,
      contenido: updatedItem.contenido,
    };
    axios.put(`/listapeliculas/${listaId}`, informacionActualizada);
    window.location.reload();
  }

  return (
    <div className="contenedor-editar-pelicula">
      <div className="pelicula">
        <div className="contenedor-titulo-pelicula">
          <h2>Editar Pelicula</h2>
        </div>
      </div>
      <div className="contenedor-info-editar">
        {/* FORMULARIO PARA EDITAR  */}
        <form className="row" onSubmit={actualizarItem}>
          <div className="editar-izquierda col-12 ">
            <div className="item-input">
              <label htmlFor="nombre">Nombre</label>
              <input
                onChange={handleUpdate}
                name="nombre"
                type="text"
                defaultValue={lista.nombre}
                id="nombre"
              />
            </div>
            <div className="item-input">
              <label htmlFor="genero">Genero</label>
              <input
                onChange={handleUpdate}
                name="estreno"
                type="text"
                defaultValue={lista.genero}
                id="genero"
              />
            </div>
            <div className="item-input radiobutton">
              <span>Es una...</span>
              <div className="elegir">
                <input
                  onChange={handleUpdate}
                  name="tipo"
                  type="radio"
                  value="pelicula"
                  id="pelicula"
                />
                <label htmlFor="pelicula">Pelicula</label>
              </div>
              <div className="elegir">
                <input
                  onChange={handleUpdate}
                  name="tipo"
                  type="radio"
                  value="serie"
                  id="serie"                  
                />
                <label htmlFor="serie">Serie</label>
              </div>
            </div>
            <div className="item-input">
              <label htmlFor="contenido">Contenido</label>
              <input
                onChange={handleUpdate}
                name="contenido"
                type="text"
                defaultValue={lista.contenido}
                id="contenido"
              />
            </div>
          </div>
          <button type="submit" className="enviar-edicion">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
