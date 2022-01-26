import "../../Estilos/Pelicula.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Pelicula() {
  //MUESTRA EN INPUTS INFORMACION DE LA SERIE SLECCIONADA PARA EDITAR
  let { serieId } = useParams();

  const [updatedItem, setUpdatedItem] = useState({
    nombre: "",
    director: "",
    protagonistas: "",
    duracion: "",
    trailer: "",
    imagenVertical: "",
    imagenHorizontal: "",
    fecha_de_Estreno: "",
    sinopsis: "",
    genero: "",
    destacada: false,
    esPelicula: false,
  });

  const [serie, setSerie] = useState([]);
  useEffect(() => {
    async function getSerie() {
      try {
        const serie = await axios.get(
          `http://localhost:4001/api/peliculas/${serieId}`
        );
        setSerie(serie.data);
      } catch (err) {
        console.log("messaje", err);
      }
    }
    getSerie();
  }, [serieId]);

  //ACTUALIZAR INFORMACION

 

  function handleUpdate(event) {
    if (event.target.name === "esPelicula") {
      setUpdatedItem(() => {
        return {
          [event.target.name]: event.target.checked,
        };
      });
    } else if (event.target.name === "destacada") {
      setUpdatedItem(() => {
        return {
          [event.target.name]: event.target.checked,
        };
      });
    } else {
      const { name, value } = event.target;
      setUpdatedItem(() => {
        return {
          [name]: value,
        };
      });
    }
    console.log(setUpdatedItem);

  }

  function actualizarItem(event) {
    event.preventDefault();
    const informacionActualizada = {
      nombre: updatedItem.nombre,
      director: updatedItem.director,
      protagonistas: updatedItem.protagonistas,
      duracion: updatedItem.duracion,
      trailer: updatedItem.trailer,
      imagenVertical: updatedItem.imagenVertical,
      imagenHorizontal: updatedItem.imagenHorizontal,
      fecha_de_Estreno: updatedItem.fecha_de_Estreno,
      sinopsis: updatedItem.sinopsis,
      genero: updatedItem.genero,
      esPelicula: updatedItem.esPelicula,
      destacada: updatedItem.destacada,
    };
    axios.put(`/peliculas/${serieId}`, informacionActualizada);
    window.location.reload()
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
          <div className="editar-izquierda col-12 col-sm-6 col-xl-8">
            <div className="item-input">
              <label htmlFor="nombre">Nombre</label>
              <input
                onChange={handleUpdate}
                name="nombre"
                type="text"
                defaultValue={serie.nombre}
                id="nombre"
              />
            </div>
            <div className="item-input">
              <label htmlFor="estreno">Estreno</label>
              <input
                onChange={handleUpdate}
                name="estreno"
                type="text"
                defaultValue={serie.fecha_de_Estreno}
                id="estreno"
              />
            </div>
            <div className="item-input">
              <label htmlFor="duracion">Duracion</label>
              <input
                onChange={handleUpdate}
                name="duracion"
                type="text"
                defaultValue={serie.duracion}
                id="duracion"
              />
            </div>
            <div className="item-input">
              <label htmlFor="protagonistas">Protagonistas</label>
              <input
                onChange={handleUpdate}
                name="protagonistas"
                type="text"
                defaultValue={serie.protagonistas}
                id="protagonistas"
              />
            </div>
            <div className="item-input">
              <label htmlFor="sinopsis">Sinopsis</label>
              <input
                onChange={handleUpdate}
                name="sinopsis"
                type="text"
                defaultValue={serie.sinopsis}
                id="sinopsis"
              />
            </div>
            <div className="item-input">
              <label htmlFor="trailer">Trailer</label>
              <input
                onChange={handleUpdate}
                name="trailer"
                type="url"
                defaultValue={serie.trailer}
                id="trailer"
              />
            </div>
          </div>
          <div className="editar-derecha col-12 col-sm-6 col-xl-4">
          <div className="item-input">
              <label htmlFor="imagenVertical">Imagen vertical <i class="fas fa-arrows-alt-v"></i></label>
              <input
                onChange={handleUpdate}
                name="imagenVertical"
                type="url"
                defaultValue={serie.imagenVertical}
                id="imagenVertical"
              />
            </div>
            <div className="item-input">
              <label htmlFor="imagenHorizontal">Imagen horizontal <i class="fas fa-arrows-alt-h"></i></label>
              <input
                onChange={handleUpdate}
                name="imagenHorizontal"
                type="url"
                defaultValue={serie.imagenHorizontal}
                id="imagenHorizontal"
              />
            </div>
            <div className="item-input">
              <label htmlFor="genero">Genero</label>
              <input
                onChange={handleUpdate}
                name="genero"
                type="text"
                defaultValue={serie.genero}
                id="genero"
              />
            </div>
            <div className="item-input">
              <div className="opcion-tipo">
                <label htmlFor="pelicula">¿Es una pelicula?</label>
                <input
                  onChange={handleUpdate}
                  type="checkbox"
                  name="esPelicula"
                  id="pelicula"
                />
              </div>
            </div>
            <div className="item-input">
              <div className="opcion-destacada">
                <label htmlFor="destacada">¿Es destacada?</label>
                <input
                  onChange={handleUpdate}
                  type="checkbox"
                  name="destacada"
                  id="destacada"
                />
              </div>
            </div>
            <button
            type="submit"
              className="enviar-edicion"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
