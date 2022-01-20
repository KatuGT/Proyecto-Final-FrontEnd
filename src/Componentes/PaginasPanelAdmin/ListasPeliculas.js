import "../../Estilos/Peliculas.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function ListasSeries(Lista) {
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
              <i class="fas fa-user-edit"></i>
            </Link>

            {/* BOTON BORRAR */}
            <i
              class="fas fa-trash-alt"
              onClick={() => borrarItem(params.row.id)}
            ></i>
            <Toaster />
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

  function agregarItem(event) {
    event.preventDefault();
    const nuevoItem = {
      nombre: item.nombre,
      tipo: item.tipo,
      genero: item.genero,
      contenido: item.contenido,
    };
    axios.post("/listapeliculas", nuevoItem);
    //setListas();
    setItem({
      nombre: "",
      tipo: "",
      genero: "",
      contenido: "",
    });
    toast.success("Item agregado");
    setListas();
  }

  //MOSTRAR LISTAS
  const [listas, setListas] = useState([]);

  const getListas = async () => {
    try {
      await axios
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

  console.log(listas);
  const listasPeliculas = listas.filter((film) => film.tipo === "pelicula");

  const filas = listasPeliculas.map((lista) => {
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
  const borrarItem = async (id) => {
    if (window.confirm("¿Estas seguro de borrar este item?")) {
      const res = await axios.delete(
        `http://localhost:4001/api/listapeliculas/` + id
      );
      if (res.status === 200) {
        console.log("item borrado");
        toast.success("Item borrado");
        setListas();
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
        checkboxSelection
      />

      {/* BOTON AGREGAR LISTA */}
      <button
        type="button"
        class="agregar-pelicula"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Agregar Lista
      </button>

      {/* MODAL PARA AGREGAR LISTAS */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Ingrese los datos
              </h5>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
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
                    <input
                      onChange={handleChange}
                      name="contenido"
                      value={item.contenido}
                      type="text"
                      placeholder="ID de peliculas/series"
                      id="contenido"
                      required
                    />
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
              <Toaster />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                onClick={agregarItem}
                type="button"
                class="btn btn-primary"
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
