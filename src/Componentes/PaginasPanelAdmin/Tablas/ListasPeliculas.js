import "./Tabla.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
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
    { field: "genero", headerName: "Género", width: 200 },
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

  //MOSTRAR LISTAS
  const [listas, setListas] = useState([]);

  const getListas = async () => {
    try {
      axios.get(`https://rollflix-back.herokuapp.com/api/listafilms/`).then((response) => {
        setListas(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getListas();
  }, [Lista]);


  //FILTRAR LISTAR PARA MOSTRAR EN LA TABLA
  const [listasSeries, setListasSeries] = useState([]);

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

  // BORRAR CATEGORIA
  const history = useNavigate();

  const borrarItem = async (id) => {
    if (window.confirm("¿Estas seguro de borrar esta categoria?")) {
      const res = await axios.delete(
        `https://rollflix-back.herokuapp.com/api/listafilms/` + id
      );
      if (res.status === 200) {
        toast.error('Categoria borrada permanentemente.', {
          position: 'bottom-center',
          style: { backgroundColor: "#FA392D", color: "#fff" }
        });
        setListas(res.data.listaBorrar);
        history("/configuracion/listapeliculas/");
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

  async function agregarItem(formData) {
    await axios.post("https://rollflix-back.herokuapp.com/api/listafilms", formData);
    getListas();
    toast.success('Nueva categoria creada!', {
      position: 'bottom-center',
      style: { backgroundColor: "#2DFA6E", color: "#fff" }
    });
    reset();
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
      {/* BOTON ITEM */}
      <button
        type="button"
        className="agregar-item"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Agregar Categoria
      </button>

      {/* MODAL PARA AGREGAR LISTAS */}
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
              {/* FORMULARIO AGREGAR LISTAS */}
              <form className="row" onSubmit={handleSubmit(agregarItem)}>
                <div className="editar-izquierda col-6">
                  <div className="item-input">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                      name="nombre"
                      type="text"
                      placeholder="Peliculas de Drama"
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
                    <label htmlFor="genero">Género</label>
                    <input
                      name="genero"
                      type="text"
                      placeholder="Drama"
                      id="genero"
                      {...register("genero", {
                        required: {
                          value: true,
                          message: "El campo es requerido.",
                        },
                        minLength: {
                          value: 5,
                          message: "Minimo 6 caracteres.",
                        }                       
                      })}
                    />
                    {errors.genero && (
                      <span className="mensaje-error">
                        {errors.genero.message}
                      </span>
                    )}
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
                        name="tipo"
                        type="radio"
                        value="pelicula"
                        id="esPelicula"
                        {...register("tipo")}
                        defaultChecked
                      />
                      <label htmlFor="esPelicula">Películas</label>
                    </div>
                    <div className="elegir">
                      <input
                        name="tipo"
                        type="radio"
                        value="serie"
                        id="esSerie"
                        {...register("tipo")}
                      />
                      <label htmlFor="esSerie">Series</label>
                    </div>
                  </div>
                </div>
                <button
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
                onClick={() => clearErrors()}
              >
                Cerrar <i className="fas fa-times"></i>
              </button>
              
            </div>
          </div>
        </div>
      </div>
      <Toaster />
      <Outlet />
    </div>
  );
}
