import "./Tabla.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

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

  // AGREGAR NUEVA PELICULA
  const [item, setItem] = useState({
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

  function handleChange(event) {
    if (event.target.name === "esPelicula") {
      setItem((prevImput) => {
        return {
          ...prevImput,
          [event.target.name]: event.target.checked,
        };
      });
    } else if (event.target.name === "destacada") {
      setItem((prevImput) => {
        return {
          ...prevImput,
          [event.target.name]: event.target.checked,
        };
      });
    } else {
      const { name, value } = event.target;
      setItem((prevImput) => {
        return {
          ...prevImput,
          [name]: value,
        };
      });
    }
  }

  const validacion = (event) => {
    let validado = true;
    Object.keys(item).forEach((key) => {
      if (key === "destacada" || key === "esPelicula") return;
      if (item[key].length < 2 || item[key].length > 100) {
        alert(`Complete el campo ${key} correctamente.`);
        validado = false;        
      }
    });
    if(validado){
      agregarItem(event)
    }
  };

  async function agregarItem(event) {
    event.preventDefault();
    const nuevoItem = {
      nombre: item.nombre,
      director: item.director,
      protagonistas: item.protagonistas,
      duracion: item.duracion,
      trailer: item.trailer,
      imagenVertical: item.imagenVertical,
      imagenHorizontal: item.imagenHorizontal,
      fecha_de_Estreno: item.fecha_de_Estreno,
      sinopsis: item.sinopsis,
      genero: item.genero,
      esPelicula: item.esPelicula,
      destacada: item.destacada,
    };
    await axios.post("/films", nuevoItem);
    //document.getElementById("cerrarModalAgregarItem").click();
    setItem({
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
      esPelicula: false,
      destacada: false,
    });
    getFilms();
  }

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
      destacada: pelicula.destacada,
    };
    return peliculaActual;
  });

  // BORRAR PELICULA
  const borrarItem = async (id) => {
    if (window.confirm("¿Estas seguro de borrar este item?")) {
      const res = await axios.delete(`http://localhost:8800/api/films/` + id);
      if (res.status === 200) {
        getFilms();
      }
    }
  };

  // VALIDACIONES
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({});

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

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
              ></button>
            </div>
            <div className="modal-body">
              {/* FORMULARIO AGREGAR PELICULA */}
              <form className="row" >
                <div className="editar-izquierda col-6">
                  <div className="item-input">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                      onChange={handleChange}
                      name="nombre"
                      value={item.nombre}
                      type="text"
                      placeholder=" Titanic"
                      id="nombre"
                      // {...register("nombre", {
                      //   required: true,
                      // })}
                    />
                    
                  </div>
                  <div className="item-input">
                    <label htmlFor="director">Direccion</label>
                    <input
                      onChange={handleChange}
                      name="director"
                      value={item.director}
                      type="text"
                      placeholder=" quien sabe"
                      id="director"
                      // {...register("director", {
                      //   required: true,
                      // })}
                    />
                    
                  </div>
                  <div className="item-input">
                    <label htmlFor="estreno">Estreno</label>
                    <input
                      onChange={handleChange}
                      name="fecha_de_Estreno"
                      value={item.fecha_de_Estreno}
                      type="number"
                      placeholder="2021"
                      id="estreno"
                    />
                  </div>
                  <div className="item-input">
                    <label htmlFor="duracion">Duración</label>
                    <input
                      onChange={handleChange}
                      name="duracion"
                      value={item.duracion}
                      type="text"
                      placeholder="90 minutos"
                      id="duracion"
                    />
                  </div>
                  <div className="item-input">
                    <label htmlFor="protagonistas">Protagonistas</label>
                    <input
                      onChange={handleChange}
                      name="protagonistas"
                      value={item.protagonistas}
                      type="text"
                      placeholder="Leonardo Di Caprio"
                      id="protagonistas"
                    />
                  </div>
                  <div className="item-input">
                    <label htmlFor="sinopsis">Sinopsis</label>
                    <input
                      onChange={handleChange}
                      name="sinopsis"
                      value={item.sinopsis}
                      type="text"
                      placeholder="bla bla"
                      id="sinopsis"
                    />
                  </div>
                  <div className="item-input">
                    <label htmlFor="trailer">Trailer</label>
                    <input
                      onChange={handleChange}
                      name="trailer"
                      value={item.trailer}
                      type="url"
                      placeholder="https://www.youtube.com/embed/..."
                      id="trailer"
                    />
                  </div>
                </div>
                <div className="editar-derecha col-6">
                  <div className="item-input">
                    <label htmlFor="imagenVertical">
                      Imagen vertical <i className="fas fa-arrows-alt-v"></i>
                    </label>
                    <input
                      onChange={handleChange}
                      name="imagenVertical"
                      value={item.imagenVertical}
                      type="url"
                      placeholder="https://picsum.photos/id/237/200/300"
                      id="imagenVertical"
                    />
                  </div>
                  <div className="item-input">
                    <label htmlFor="imagenHorizontal">
                      Imagen horizontal <i className="fas fa-arrows-alt-h"></i>
                    </label>
                    <input
                      onChange={handleChange}
                      name="imagenHorizontal"
                      value={item.imagenHorizontal}
                      type="url"
                      placeholder="https://picsum.photos/id/237/200/300"
                      id="imagenHorizontal"
                    />
                  </div>
                  <div className="item-input">
                    <label htmlFor="genero">Género</label>
                    <input
                      onChange={handleChange}
                      name="genero"
                      value={item.genero}
                      type="text"
                      placeholder="Romance"
                      id="genero"
                    />
                  </div>
                  <div className="item-input">
                    <div className="opcion-tipo">
                      <label htmlFor="pelicula">¿Es una pelicula?</label>
                      <input
                        onChange={handleChange}
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
                        onChange={handleChange}
                        type="checkbox"
                        name="destacada"
                        id="destacada"
                      />
                    </div>
                  </div>
                </div>
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
              <button
                onClick={(e) => {validacion(e)}}
                type="submit"
                className="btn btn-primary"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
