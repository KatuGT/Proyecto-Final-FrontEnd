import "../../Estilos/Peliculas.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ListasSeries({ Lista }) {
  // COLUMNAS
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 200,
    },
    { field: "genero", headerName: "Genero", width: 200 },
    { field: "tipo", headerName: "Tipo", width: 200 },
    {
      field: "contenido",
      headerName: "Contenido",
      width: 200,
    },
    {
      field: "accion",
      headerName: "Acciones",
      width: 200,
      renderCell: (params) => {
        return (
          // BOTON EDITAR
          <div className="acciones">
            <Link to={"listapelicula/" + params.row.id}>
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

  // AGREGAR NUEVA LISTA
  const [item, setItem] = useState({
    nombre: "",
    tipo: "",
    genero: "",
    contenido: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setItem((prevImput) => {
      return {
        ...prevImput,
        [name]: value,
      };
    });
  }

  async function agregarItem(event) {
    event.preventDefault();
    const nuevoItem = {
      nombre: item.nombre,
      tipo: item.tipo,
      genero: item.genero,
      contenido: item.contenido,
    };
    const resultado = await axios.post("/listapeliculas", nuevoItem);
    setListas([resultado.data, ...listas]);
    setItem({
      nombre: "",
      tipo: "",
      genero: "",
      contenido: "",
    });
  }

  //MOSTRAR LISTAS
  const [listas, setListas] = useState([]);
  const [listasSeries, setListasSeries] = useState([]);

  const getListas = async () => {
    try {
      axios
        .get(`http://localhost:4001/api/listapeliculas/`)
        .then((response) => {
          setListas(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getListas();
  }, [Lista]);

  useEffect(() => {
    if (listas) {
      setListasSeries(listas.filter((serie) => serie.tipo === "pelicula"));
    }
  }, [listas]);

  const filas = listasSeries.map((lista) => {
    const listaActual = {
      id: lista._id,
      nombre: lista.nombre,
      tipo: lista.tipo,
      genero: lista.genero,
      contenido: lista.contenido,
    };
    return listaActual;
  });

  // BORRAR PELICULA
  const history = useNavigate();

  const borrarItem = async (id) => {
    if (window.confirm("¿Estas seguro de borrar este item?")) {
      const res = await axios.delete(
        `http://localhost:4001/api/listapeliculas/` + id
      );
      if (res.status === 200) {
        console.log("item borrado");
        setListas(res.data.listaBorrar);
        history("/configuracion/listaseries/");
      }
    }
  };

  return (
    <div className="lista-peliculas">
      <DataGrid
        className="dataGrid"
        disableSelectionOnClick
        rows={filas}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />

      {/* BOTON AGREGAR LISTA */}
      <button
        type="button"
        className="agregar-pelicula"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Agregar Lista
      </button>

      {/* MODAL PARA AGREGAR LISTAS */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
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
              {/* FORMULARIO AGREGAR LISTAS */}
              <form className="row">
                <div className="editar-izquierda col-6">
                  <div className="item-input">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                      onChange={handleChange}
                      name="nombre"
                      value={item.nombre}
                      type="text"
                      placeholder="Peliculas de Drama"
                      id="nombre"
                    />
                  </div>
                  <div className="item-input">
                    <label htmlFor="genero">Genero</label>
                    <input
                      onChange={handleChange}
                      name="genero"
                      value={item.genero}
                      type="text"
                      placeholder="Drama"
                      id="genero"
                      required
                    />
                  </div>
                </div>
                <div className="editar-derecha col-6">
                  <div className="item-input">
                    <label htmlFor="contenido">Contenido</label>
                    <p className="aviso-contenido">
                      Lo agregaras luedo de creada la lista
                    </p>
                  </div>
                  <div className="item-input radiobutton">
                    <span>Es una lista de...</span>
                    <div className="elegir">
                      <input
                        onChange={handleChange}
                        name="tipo"
                        type="radio"
                        value="pelicula"
                        id="esPelicula"
                      />
                      <label htmlFor="esPelicula">Peliculas</label>
                    </div>
                    <div className="elegir">
                      <input
                        onChange={handleChange}
                        name="tipo"
                        type="radio"
                        value="serie"
                        id="esSerie"
                      />
                      <label htmlFor="esSerie">Series</label>
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
