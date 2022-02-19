import "./Tabla.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Series({ pelis }) {
  // COLUMNAS
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 200,
      renderCell: (params) => {
        return (
          <figure className="nombre-item-row">
            <img src={params.row.imagenHorizontal} alt="imagen" />
            {params.row.nombre}
          </figure>
        );
      },
    },
    { field: "director", headerName: "Director", width: 100 },
    { field: "estreno", headerName: "Estreno", width: 80 },
    {
      field: "duracion",
      headerName: "Duración",
      width: 100,
    },
    {
      field: "protagonistas",
      headerName: "Protagonistas",
      width: 150,
    },
    {
      field: "sinopsis",
      headerName: "Sinopsis",
      width: 140,
    },
    {
      field: "trailer",
      headerName: "Trailer",
      width: 140,
    },
    {
      field: "genero",
      headerName: "Género",
      width: 120,
    },
    {
      field: "destacada",
      headerName: "Destacada",
      width: 100,
    },
    {
      field: "accion",
      headerName: "Acciones",
      width: 100,
      renderCell: (params) => {
        return (
          // BOTON EDITAR
          <div className="acciones">
            <Link to={"serie/" + params.row.id}>
              <i className="fas fa-user-edit"></i>
            </Link>

            {/* BOTON BORRAR */}
            <i
              className="fas fa-trash-alt"
              onClick={() => borrarItem(params.row.id)}
            ></i>
          </div>
        );
      },
    },
  ];

  //MOSTRAR PELICULAS EN LISTA
  const [series, setSeries] = useState([]);

  const getSeries = async () => {
    try {
      await axios.get(`http://localhost:8800/api/films/`).then((response) => {
        setSeries(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSeries();
  }, [pelis]);

  const sonSeries = series.filter((serie) => serie.esPelicula === false);

  const filas = sonSeries.map((serie) => {
    const serieActual = {
      id: serie._id,
      nombre: serie.nombre,
      director: serie.director,
      protagonistas: serie.protagonistas,
      duracion: serie.duracion,
      trailer: serie.trailer,
      imagenVertical: serie.imagenVertical,
      imagenHorizontal: serie.imagenHorizontal,
      estreno: serie.fecha_de_Estreno,
      sinopsis: serie.sinopsis,
      genero: serie.genero,
      destacada: serie.destacada,
    };
    return serieActual;
  });

  // BORRAR SERIE
  const borrarItem = async (id) => {
    if (window.confirm("¿Estas seguro de borrar este item?")) {
      const res = await axios.delete(`http://localhost:8800/api/films/` + id);
      if (res.status === 200) {
        console.log("item borrado");
        getSeries();
      }
    }
  };

  //VALIDACIONES
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  async function addItem(formData) {
    await axios.post("/films", formData)
    getSeries()
    reset()
  }

  return (
    <div className="tabla-contenido">
      <div className="contenedor-tabla">
        <DataGrid
          className="dataGrid"
          disableSelectionOnClick
          rows={filas}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>

      {/* BOTON AGREGAR SERIE */}
      <button
        type="button"
        className="agregar-item"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Agregar Serie
      </button>

      {/* MODAL PARA AGREGAR SERIE */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
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
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* FORMULARIO AGREGAR SERIE */}
              <form className="row" onSubmit={handleSubmit(addItem)}>
                <div className="editar-izquierda col-6">
                  <div className="item-input">
                    <label htmlFor="nombre">Nombre</label>
                    <input                      
                      type="text"
                      placeholder=" Titanic"
                      id="nombre"
                      {...register("nombre", {
                        required: {
                          value: true,
                          message: "El campo es requerido.",
                        },
                        minLength: {
                          value: 1,
                          message: "Mínimo 1 caracter.",
                        },maxLength: {
                          value: 60,
                          message: "Máximo  60 caracteres.",
                        }
                      })}
                    />
                    {errors.nombre && (
                      <span className="mensaje-error">
                        {errors.nombre.message}
                      </span>
                    )}
                  </div>
                  <div className="item-input">
                    <label htmlFor="nombre">Director/es</label>
                    <input   
                      type="text"
                      placeholder=" quien sabe"
                      id="director"
                      {...register("director", {
                        required: {
                          value: true,
                          message: "El campo es requerido.",
                        },
                        minLength: {
                          value: 1,                          
                        }
                      })}
                    />
                    {errors.director && (
                      <span className="mensaje-error">
                        {errors.director.message}
                      </span>
                    )}
                  </div>
                  <div className="item-input">
                    <label htmlFor="estreno">Estreno</label>
                    <input 
                      type="number"
                      placeholder="2021"
                      id="estreno"
                      {...register("fecha_de_Estreno", {
                        required: {
                          value: true,
                          message: "El campo es requerido.",
                        },
                        minLength: {
                          value: 5,
                          message: "Mínimo 4 caracteres",
                        },
                      })}
                    />
                    {errors.fecha_de_Estreno && (
                      <span className="mensaje-error">
                        {errors.fecha_de_Estreno.message}
                      </span>
                    )}
                  </div>
                  <div className="item-input">
                    <label htmlFor="duracion">Duración</label>
                    <input
                      // onChange={handleChange}
                      // value={item.duracion}
                      type="text"
                      placeholder="90 minutos"
                      id="duracion"
                      {...register("duracion", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        minLength: {
                          value: 5,
                          message: "Minimo 6 caracteres",
                        },
                      })}
                    />
                    {errors.duracion && (
                      <span className="mensaje-error">
                        {errors.duracion.message}
                      </span>
                    )}
                  </div>
                  <div className="item-input">
                    <label htmlFor="protagonistas">Protagonistas</label>
                    <input
                      // onChange={handleChange}
                      // value={item.protagonistas}
                      type="text"
                      placeholder="Leonardo Di Caprio"
                      id="protagonistas"
                      {...register("protagonistas", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        minLength: {
                          value: 5,
                          message: "Minimo 6 caracteres",
                        },
                      })}
                    />
                    {errors.protagonistas && (
                      <span className="mensaje-error">
                        {errors.protagonistas.message}
                      </span>
                    )}
                  </div>
                  <div className="item-input">
                    <label htmlFor="sinopsis">Sinopsis</label>
                    <input
                      // onChange={handleChange}
                      // value={item.sinopsis}
                      type="text"
                      placeholder="bla bla"
                      id="sinopsis"
                      {...register("sinopsis", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        minLength: {
                          value: 5,
                          message: "Minimo 6 caracteres",
                        },
                      })}                      
                    />
                    {errors.sinopsis && (
                      <span className="mensaje-error">
                        {errors.sinopsis.message}
                      </span>
                    )}
                  </div>
                  <div className="item-input">
                    <label htmlFor="trailer">Trailer</label>
                    <input
                      // onChange={handleChange}
                      // value={item.trailer}
                      type="url"
                      placeholder="https://www.youtube.com/embed/...."
                      id="trailer"
                      {...register("trailer", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        minLength: {
                          value: 5,
                          message: "Minimo 6 caracteres",
                        },
                      })}
                    />
                    {errors.trailer && (
                      <span className="mensaje-error">
                        {errors.trailer.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="editar-derecha col-6">
                  <div className="item-input">
                    <label htmlFor="imagenVertical">
                      Imagen vertical <i className="fas fa-arrows-alt-v"></i>
                    </label>
                    <input
                      // onChange={handleChange}
                      // value={item.imagenVertical}
                      type="url"
                      placeholder="https://picsum.photos/id/237/200/300"
                      id="imagenVertical"
                      {...register("imagenVertical", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        minLength: {
                          value: 5,
                          message: "Minimo 6 caracteres",
                        },
                      })}
                    />
                    {errors.imagenVertical && (
                      <span className="mensaje-error">
                        {errors.imagenVertical.message}
                      </span>
                    )}
                  </div>
                  <div className="item-input">
                    <label htmlFor="imagenHorizontal">
                      Imagen horizontal <i className="fas fa-arrows-alt-h"></i>
                    </label>
                    <input
                      // onChange={handleChange}
                      // value={item.imagenHorizontal}
                      type="url"
                      placeholder="https://picsum.photos/id/237/200/300"
                      id="imagenHorizontal"
                      {...register("imagenHorizontal", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        minLength: {
                          value: 5,
                          message: "Minimo 6 caracteres",
                        },
                      })}
                    />
                    {errors.imagenHorizontal && (
                      <span className="mensaje-error">
                        {errors.imagenHorizontal.message}
                      </span>
                    )}
                  </div>
                  <div className="item-input">
                    <label htmlFor="genero">Género</label>
                    <input
                      // onChange={handleChange}
                      // value={item.genero}
                      type="text"
                      placeholder="Romance"
                      id="genero"
                      {...register("genero", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        minLength: {
                          value: 5,
                          message: "Minimo 6 caracteres",
                        },
                      })}
                    />
                    {errors.genero && (
                      <span className="mensaje-error">
                        {errors.genero.message}
                      </span>
                    )}
                  </div>
                  <div className="item-input">
                    <div className="opcion-tipo">
                      <label htmlFor="pelicula">¿Es una pelicula?</label>
                      <input
                        // onChange={handleChange}
                        type="checkbox"
                        id="pelicula"
                        {...register("esPelicula")}
                      ></input>
                    </div>
                  </div>
                  <div className="item-input">
                    <div className="opcion-destacada">
                      <label htmlFor="destacada">¿Es destacada?</label>
                      <input
                        //onChange={handleChange}
                        type="checkbox"
                        id="destacada"
                        {...register("destacada")}
                      ></input>
                    </div>
                  </div>
                </div>
                <button
                  //onClick={handleSubmit(agregarItem)}
                  type="submit"
                  className="btn btn-primary"
                >
                  Guardar
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="cerrarModalAgregarItem"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}