import "./Tabla.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Series({pelis}) {
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

  // AGREGAR NUEVA SERIE
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
    document.getElementById("cerrarModalAgregarItem").click();
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
    getSeries();
  }

  //MOSTRAR PELICULAS EN LISTA
  const [series, setSeries] = useState([]);

  const getSeries = async () => {
    try {
      await axios
        .get(`http://localhost:8800/api/films/`)
        .then((response) => {
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
      const res = await axios.delete(
        `http://localhost:8800/api/films/` + id
      );
      if (res.status === 200) {
        console.log("item borrado");
        getSeries();
      }
    }
  };

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
              <form className="row">
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
                    />
                  </div>
                  <div className="item-input">
                    <label htmlFor="nombre">Direccion</label>
                    <input
                      onChange={handleChange}
                      name="director"
                      value={item.director}
                      type="text"
                      placeholder=" quien sabe"
                      id="director"
                      required
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
                      required
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
                      required
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
                      required
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
                      required
                    />
                  </div>
                  <div className="item-input">
                    <label htmlFor="trailer">Trailer</label>
                    <input
                      onChange={handleChange}
                      name="trailer"
                      value={item.trailer}
                      type="url"
                      placeholder="https://www.youtube.com/embed/...."
                      id="trailer"
                      required
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
                      required
                    ></input>
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
                      required
                    ></input>
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
                      required
                    ></input>
                  </div>
                  <div className="item-input">
                    <div className="opcion-tipo">
                      <label htmlFor="pelicula">¿Es una pelicula?</label>
                      <input
                        onChange={handleChange}
                        type="checkbox"
                        name="esPelicula"
                        id="pelicula"
                      ></input>
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
                      ></input>
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
                onClick={agregarItem}
                type="button"
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
