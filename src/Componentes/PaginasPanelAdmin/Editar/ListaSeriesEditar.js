import "./Editar.css";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Pelicula() {
  //MUESTRA EN INPUTS INFORMACION DE LA LISTA PARA EDITAR
  let { listaId } = useParams();

  const [lista, setLista] = useState([]);
  const [films, setFilms] = useState([]);
  const [contenido, setContenido] = useState([]);

  const getListas = useCallback(async () => {
    try {
      await axios
        .get(`http://localhost:8800/api/listafilms/find/${listaId}`)
        .then((response) => {
          setLista(response.data);
          setContenido(response.data.contenido);
        });
      await axios.get(`http://localhost:8800/api/films/`).then((response) => {
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
          <figure className="nombre-item-row">
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

  //VALIDACIONES
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset(lista);
  }, [lista, reset]);

  //ACTUALIZAR INFORMACION

  async function actualizarItem(formData) {
    console.log(formData);
    await axios.put(`/listafilms/find/${listaId}`, formData);
    getListas();
    window.location.reload();
  }

  //AGREGAR CONTENIDO A LISTA
  const { register: registerB, handleSubmit: handleSubmitB } = useForm();

  async function agregarIDenArray(formData) {
    console.log(formData.contenido);
    const respuesta = await axios.post(
      `/listafilms/${listaId}/agregarfilm/${formData.contenido}`
    );
    document.getElementById("cerrarAgregarItemLista").click();
    setContenido(respuesta);
    getListas();
  }

  //Borrar ID de Contenido
  async function borrarIDArray(id) {
    const borrado = await axios.delete(
      `/listafilms/${listaId}/borrarfilm/${id}`
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
        <form className="row" onSubmit={handleSubmit(actualizarItem)}>
          <div className="editar-izquierda col-12 row ">
            <div className="item-input col-xl-5">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                {...register("nombre", {
                  required: {
                    value: true,
                    message: "El campo es requerido.",
                  },
                  minLength: {
                    value: 8,
                    message: "Mínimo 8 caracter.",
                  },
                  maxLength: {
                    value: 60,
                    message: "Máximo  60 caracteres.",
                  },
                })}
              />
              {errors.nombre && (
                <span className="mensaje-error">{errors.nombre.message}</span>
              )}
            </div>
            <div className="item-input col-xl-5">
              <label htmlFor="genero">Género</label>
              <input
                type="text"
                id="genero"
                {...register("genero", {
                  required: {
                    value: true,
                    message: "El campo es requerido.",
                  },
                  minLength: {
                    value: 4,
                    message: "Mínimo 4 caracter.",
                  },
                  maxLength: {
                    value: 60,
                    message: "Máximo  60 caracteres.",
                  },
                })}
              />
              {errors.genero && (
                <span className="mensaje-error">{errors.genero.message}</span>
              )}
            </div>
            <div className="item-input radiobutton col-xl-2">
              <span>Es una...</span>
              <div className="elegir">
                <input
                  type="radio"
                  value="pelicula"
                  id="pelicula"
                  {...register("tipo")}
                />
                <label htmlFor="pelicula">Película</label>
              </div>
              <div className="elegir">
                <input
                  type="radio"
                  value="serie"
                  id="serie"
                  {...register("tipo")}
                  defaultChecked
                />
                <label htmlFor="serie">Serie</label>
              </div>
            </div>
            <div className="item-input" style={{ height: 450, width: "100%" }}>
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
        {/* MODAL PARA MODIFICAR CONTENIDO DE LISTA */}
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
                  Seleccione la serie
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
                {/* FORMULARIO AGREGAR SERIE A LA LISTAS*/}
                <form
                  className="row"
                  onSubmit={handleSubmitB(agregarIDenArray)}
                >
                  <div className="editar-izquierda col-6">
                    <div className="item-input">
                      <label htmlFor="nombre">Nombre</label>
                      <select {...registerB("contenido")}>
                        <option disabled selected>
                          Seleccione...
                        </option>
                        {films.map((film, index) =>
                          film.esPelicula !== true ? (
                            <option key={index} value={film._id}>
                              {film.nombre}
                            </option>
                          ) : (
                            ""
                          )
                        )}
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Agregar
                  </button>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
