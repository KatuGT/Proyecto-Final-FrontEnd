import "./Tabla.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';


export default function Peliculas({ pelis }) {
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
            <Link to={"pelicula/" + params.row.id}>
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
  const [films, setFilms] = useState([]);

  const getFilms = async () => {
    try {
      await axios.get(`http://localhost:8800/api/films/`).then((response) => {
        setFilms(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFilms();
  }, [pelis]);

  const sonPeliculas = films.filter((pelicula) => pelicula.esPelicula === true);

  const filas = sonPeliculas.map((pelicula) => {
    const peliculaActual = {
      id: pelicula._id,
      nombre: pelicula.nombre,
      director: pelicula.director,
      protagonistas: pelicula.protagonistas,
      duracion: pelicula.duracion,
      trailer: pelicula.trailer,
      imagenVertical: pelicula.imagenVertical,
      imagenHorizontal: pelicula.imagenHorizontal,
      estreno: pelicula.fecha_de_Estreno,
      sinopsis: pelicula.sinopsis,
      genero: pelicula.genero,
      destacada: pelicula.destacada  ? "SI" : "NO",
    };
    return peliculaActual;
  });

  // BORRAR PELICULA
  const borrarItem = async (id) => {
   if (window.confirm("¿Estas seguro de borrar este item?")) {
      const res = await axios.delete(`http://localhost:8800/api/films/` + id);
      
      if (res.status === 200) {
        getFilms();
        toast.error('Pelicula borrada!',{
          position: 'bottom-center',
          style: {backgroundColor : "#FA392D", color:"#fff"}
        });
      }
    }
    
  };

  //VALIDACIONES
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm();


  async function addItem(formData) {
    await axios.post("/films", formData);
    getFilms();
    reset();
    toast.success('Pelicula agregada!', {
      position: 'bottom-center',
      style: {backgroundColor : "#2DFA6E", color:"#fff"}});

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
      {/* BOTON AGREGAR PELICULA */}
      <button
        type="button"
        className="agregar-item"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Agregar Película
      </button>

      {/* MODAL PARA AGREGAR PELICULA */}
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
                onClick={() => clearErrors()}
              ></button>
            </div>
            <div className="modal-body">
              {/* FORMULARIO AGREGAR PELICULA */}
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
                        },
                        maxLength: {
                          value: 60,
                          message: "Máximo  60 caracteres.",
                        },
                      })}
                    />
                    {errors.nombre && (
                      <span className="mensaje-error">
                        {errors.nombre.message}
                      </span>
                    )}
                  </div>
                  <div className="item-input">
                    <label htmlFor="director">Director/es</label>
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
                        },
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
                      max={2022}
                      min={1500}
                      {...register("fecha_de_Estreno", {
                        required: {
                          value: true,
                          message:
                            "El campo es requerido. Escriba el año, por ejemplo: 2021, 2020, 2019...",
                        },
                        minLength: {
                          value: 4,
                          message: "Mínimo 4 caracteres",
                        },
                        maxLength: {
                          value: 4,
                          message: "Maximo 4 caracteres",
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
                    <div className="item-duracion">
                      <label htmlFor="duracion">Duración</label>
                      <p className="info duracion">?</p>
                    </div>
                    <input
                      type="text"
                      placeholder="90 minutos"
                      id="duracion"
                      {...register("duracion", {
                        required: {
                          value: true,
                          message: "El campo es requerido.",
                        },
                        minLength: {
                          value: 5,
                          message:
                            "Escriba la duracion en minutos de la pelicula o cantidad de episodios de la serie",
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
                      type="text"
                      placeholder="Leonardo Di Caprio"
                      id="protagonistas"
                      {...register("protagonistas", {
                        required: {
                          value: true,
                          message: "El campo es requerido.",
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
                    <textarea
                      type="text"
                      placeholder="bla bla"
                      id="sinopsis"
                      {...register("sinopsis", {
                        required: {
                          value: true,
                          message: "El campo es requerido.",
                        },
                        minLength: {
                          value: 100,
                          message: "Minimo 100 caracteres.",
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
                    <div className="item-duracion">
                      <label htmlFor="trailer">Trailer</label>
                      <p className="info trailer">!</p>
                    </div>
                    <input
                      type="url"
                      placeholder="https://www.youtube.com/embed/..."
                      id="trailer"
                      {...register("trailer", {
                        required: {
                          value: true,
                          message: "El campo es requerido.",
                        },
                        minLength: {
                          value: 5,
                          message: "Minimo 6 caracteres",
                        },
                      })}
                    />
                    <p className="tipo">Debe ser tipo embebido.</p>
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
                      type="url"
                      placeholder="https://picsum.photos/id/237/200/300"
                      id="imagenVertical"
                      {...register("imagenVertical", {
                        required: {
                          value: true,
                          message: "El campo es requerido.",
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
                      type="url"
                      placeholder="https://picsum.photos/id/237/200/300"
                      id="imagenHorizontal"
                      {...register("imagenHorizontal", {
                        required: {
                          value: true,
                          message: "El campo es requerido.",
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
                      type="text"
                      placeholder="Romance"
                      id="genero"
                      {...register("genero", {
                        required: {
                          value: true,
                          message: "El campo es requerido.",
                        },
                        minLength: {
                          value: 5,
                          message: "Minimo 6 caracteres.",
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
                      <label htmlFor="pelicula">¿Es una película?</label>
                      <input
                        type="checkbox"
                        id="pelicula"
                        {...register("esPelicula")}
                      />
                    </div>
                  </div>
                  <div className="item-input">
                    <div className="opcion-destacada">
                      <label htmlFor="destacada">¿Es destacada?</label>
                      <input
                        type="checkbox"
                        id="destacada"
                        {...register("destacada")}
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => reset()}
              >
                Borrar todo
                <i className="fas fa-eraser"></i>
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                id="cerrarModalAgregarItem"
                onClick={() => clearErrors()}
              >
                Cerrar <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        <Toaster position="bottom-center"/>

      </div>
      <Outlet />
    </div>
  );
}
