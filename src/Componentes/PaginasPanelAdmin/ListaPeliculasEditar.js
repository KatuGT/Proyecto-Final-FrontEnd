import "../../Estilos/Pelicula.css";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

export default function Pelicula() {
  //MUESTRA EN INPUTS INFORMACION DE LA LISTA PARA EDITAR
  let { listaId } = useParams();

  const [lista, setLista] = useState([]);
  const [films, setFilms] = useState([]);
  const [contenido, setContenido] = useState([]);

  const getListas = useCallback(async () => {
    try {
      await axios
        .get(`http://localhost:4001/api/listapeliculas/find/${listaId}`)
        .then((response) => {
          setLista(response.data);
          setContenido(response.data.contenido);
        });
      await axios
        .get(`http://localhost:4001/api/peliculas/`)
        .then((response) => {
          setFilms(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, [listaId]);

  useEffect(() => {
    getListas();
  }, [getListas]);

  // COLUMNAS DE LA TABLA DE CONTENIDO
  const columns = [
    { field: "id", headerName: "ID", width: 250 },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 400,
      renderCell: (params) => {
        return (
          <figure className="pelicula-nombre">
            <img src={params.row.imagenHorizontal} alt="imagen" />
            {params.row.nombre}
          </figure>
        );
      },
    },
    {
      field: "accion",
      headerName: "Acciones",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="acciones">
            {/* BOTON BORRAR */}
            <i
              className="fas fa-trash-alt"
              onClick={() => borrarIDArray(params.row.id)}
            ></i>
          </div>
        );
      },
    },
  ];

  // FILAS DE LA TABLA DE CONTENIDO
  const arrayPeliculaID = [];

  for (let index = 0; index < contenido.length; index++) {
    const element = contenido[index];
    const resultFilm = films.filter((i) => i._id === element);
    arrayPeliculaID.push(...resultFilm);
  }

  const filas = arrayPeliculaID.map((pelicula) => {
    return {
      id: pelicula._id,
      nombre: pelicula.nombre,
      imagenHorizontal: pelicula.imagenHorizontal,
    };
  });

  //ACTUALIZAR INFORMACION
  const [updatedItem, setUpdatedItem] = useState({});

  function handleUpdate(event) {
    const { name, value } = event.target;
    setUpdatedItem(() => {
      return {
        [name]: value,
      };
    });
  }

  function actualizarItem(event) {
    event.preventDefault();
    const informacionActualizada = {
      nombre: updatedItem.nombre,
      tipo: updatedItem.tipo,
      genero: updatedItem.genero,
    };
    axios.put(`/listapeliculas/find/${listaId}`, informacionActualizada);
    window.location.reload();
  }

  //ACTUALIZANDO CONTENIDO
  const [select, setSelect] = useState("");

  async function agregarIDenArray(event) {
    event.preventDefault();
    if (select) {
      const respuesta = await axios.post(
        `/listapeliculas/${listaId}/agregarfilm/${select}`
      );
      document.getElementById("cerrarAgregarItemLista").click();
      setContenido(respuesta.data.contenido);
    } else {
      alert("Seleccione de la lista");
    }
  }

  //Borrar ID de Contenido
  async function borrarIDArray(id) {
    const borrado = await axios.delete(
      `/listapeliculas/${listaId}/borrarfilm/${id}`
    );
    setContenido(borrado.data.contenido);
  }

  return (
    <div className="contenedor-editar-pelicula">
      <div className="pelicula">
        <div className="contenedor-titulo-pelicula">
          <h2>Editar Lista</h2>
        </div>
      </div>
      <div className="contenedor-info-editar">
        {/* FORMULARIO PARA EDITAR  */}
        <form className="row" onSubmit={actualizarItem}>
          <div className="editar-izquierda col-12 row ">
            <div className="item-input col-xl-5">
              <label htmlFor="nombre">Nombre</label>
              <input
                onChange={handleUpdate}
                name="nombre"
                type="text"
                defaultValue={lista.nombre}
                id="nombre"
              />
            </div>
            <div className="item-input col-xl-5">
              <label htmlFor="genero">Género</label>
              <input
                onChange={handleUpdate}
                name="estreno"
                type="text"
                defaultValue={lista.genero}
                id="genero"
              />
            </div>
            <div className="item-input radiobutton col-xl-2">
              <span>Es una...</span>
              <div className="elegir">
                <input
                  onChange={handleUpdate}
                  name="tipo"
                  type="radio"
                  value="pelicula"
                  id="pelicula"
                  defaultChecked
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
            <div className="item-input " style={{ height: 450, width: "100%" }}>
              <div className="agregar-contenido">
                <label htmlFor="contenido">Contenido</label>
                <button
                  type="button"
                  className="agregar-item-lista"
                  data-bs-toggle="modal"
                  data-bs-target="#agregarItemALista"
                >
                  Agregar serie a la lista <i className="fas fa-plus"></i>
                </button>
              </div>
              <DataGrid
                className="dataGrid"
                disableSelectionOnClick
                rows={filas}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>
          </div>
          <button type="submit" className="enviar-edicion">
            Enviar
          </button>
        </form>
        <div
          className="modal fade"
          id="agregarItemALista"
          tabIndex="-1"
          aria-labelledby="agregarItemAListaLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Ingrese los datos
                </h5>

                <button
                  type="button"
                  id="cerrarAgregarItemLista"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* FORMULARIO AGREGAR SERIE */}
                <form className="row">
                  <div className="editar-izquierda col-6">
                    <div className="item-input">
                      <label htmlFor="nombre">Nombre</label>
                      <select
                        name="select"
                        onChange={(e) => setSelect(e.target.value)}
                        required
                      >
                        <option disabled selected>
                          Seleccione...
                        </option>
                        {films.map((film) =>
                          film.esPelicula === true ? (
                            <option value={film._id}>{film.nombre}</option>
                          ) : (
                            ""
                          )
                        )}
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button
                  onClick={agregarIDenArray}
                  type="button"
                  className="btn btn-primary"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
