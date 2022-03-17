import "./Tabla.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Context } from "../../../Context/Context";

export default function UsuariosLista() {
  const { user } = useContext(Context);

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "apodo",
      headerName: "Apodo",
      width: 200,
      renderCell: (params) => {
        return (
          <figure className="nombre-item-row">
            {params.row.avatar !== "" ? (
              <img src={params.row.avatar} alt="avatar" />
            ) : (
              <i className="fas fa-user-circle"></i>
            )}

            {params.row.apodo}
          </figure>
        );
      },
    },
    { field: "email", headerName: "E-mail", width: 200 },
    {
      field: "esAdmin",
      headerName: "Rol",
      width: 130,
    },
    {
      field: "estaActivo",
      headerName: "Estado",
      width: 130,
    },
    {
      field: "contrasenia",
      headerName: "Contraseña",
      width: 160,
    },

    {
      field: "accion",
      headerName: "Acciones",
      width: 160,
      renderCell: (params) => {
        return (
          // BOTON EDITAR
          <div className="acciones">
            <Link to={"user/" + params.row.id}>
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

  const [listasUsuarios, setListasUsuarios] = useState([]);

  const getListasUsuarios = async () => {
    try {
      await axios
        .get(`http://localhost:8800/api/usuario/`, {
          headers: { token: user.tokenDeAcceso },
        })
        .then((response) => {
          setListasUsuarios(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getListasUsuarios();
  });

  const filas = listasUsuarios.map((usuario) => {
    const listaActual = {
      id: usuario._id,
      apodo: usuario.username,
      email: usuario.email,
      contrasenia: usuario.password,
      avatar: usuario.fotoPerfil,
      esAdmin: usuario.esAdmin,
      estaActivo: usuario.estaActivo,
    };
    return listaActual;
  });

  // BORRAR USUARIO
  const history = useNavigate();

  const borrarItem = async (id) => {
    if (window.confirm("¿Estas seguro de borrar este item?")) {
      try {
         await axios.delete(
          `http://localhost:8800/api/usuario/` + id,
          {
            headers: { token: user.tokenDeAcceso },
          }
        );
        getListasUsuarios();
      } catch (error) {
        console.log(error);
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
          checkboxSelection
        />
      </div>
      {/* BOTON ITEM */}
      <button
        type="button"
        className="agregar-item"
        data-bs-toggle="modal"
        data-bs-target="#agregarUsuarioModal"
      >
        Crear usuario
      </button>
      {/* MODAL PARA CREAR USUARIO */}
      <div
        className="modal fade"
        id="agregarUsuarioModal"
        tabIndex="-1"
        aria-labelledby="agregarUsuarioModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="agregarUsuarioModalLabel">
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
              <form className="formulario-editar row">
                <div className="editar-izquierda col-6">
                  <div className="item-input">
                    <label htmlFor="apodo">Apodo</label>
                    <input type="text" placeholder="Teito" id="apodo"></input>
                  </div>
                  <div className="item-input">
                    <label htmlFor="email">E-mail</label>
                    <input
                      type="text"
                      placeholder="123@gmail.com"
                      id="email"
                    ></input>
                  </div>
                  <div className="item-input">
                    <label htmlFor="contrasenia">Contraseña</label>
                    <input
                      type="text"
                      placeholder="2132155"
                      id="contrasenia"
                    ></input>
                  </div>
                </div>
                <div className="editar-derecha col-6">
                  <div className="item-input">
                    <label htmlFor="avatar">Avatar</label>
                    <input
                      type="url"
                      placeholder="https://picsum.photos/id/237/200/300"
                      id="avatar"
                    ></input>
                  </div>
                  <div className="item-input">
                    <div className="opcion-rol">
                      <input
                        type="radio"
                        name="rol"
                        required
                        id="usuario"
                      ></input>
                      <label htmlFor="usuario">Usuario</label>
                    </div>
                    <div className="opcion-rol">
                      <input
                        type="radio"
                        name="rol"
                        required
                        id="admin"
                      ></input>
                      <label htmlFor="admin">Admin</label>
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
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
