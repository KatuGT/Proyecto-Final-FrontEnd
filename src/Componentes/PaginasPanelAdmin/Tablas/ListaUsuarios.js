import "./Tabla.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Context } from "../../../Context/Context";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

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
      esAdmin: usuario.esAdmin ? "Admin" : "Usuario",
      estaActivo: usuario.estaActivo ? "Activo" : "Bloqueado",
    };
    return listaActual;
  });

  // BORRAR USUARIO
  const borrarItem = async (id) => {
    if (window.confirm("¿Estas seguro de borrar este item?")) {
      try {
        await axios.delete(`http://localhost:8800/api/usuario/` + id, {
          headers: { token: user.tokenDeAcceso },
        });
        getListasUsuarios();
      } catch (error) {
        console.log(error);
      }
    }
  };

  //Validacion registro
  const esquemaRegistro = Yup.object().shape({
    username: Yup.string()
      .required("El campo es requerido.")
      .min(6, "Tu apodo debe tener almenos 6 caracteres.")
      .max(15, "Tu apodo debe tener maximo 15 caracteres."),
    email: Yup.string()
      .required("El campo es requerido.")
      .email("Introdusca un Email valido."),
    fotoPerfil: Yup.string().url(),
    password: Yup.string()
      .required("El campo es requerido.")
      .min(8, "La contraseña debe tener almenos 8 caracteres.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "No cumple con lo requisitos."
      ),
    confirmPwd: Yup.string()
      .required("El campo es requerido.")
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden."),
  });

  const opcionesRegistro = { resolver: yupResolver(esquemaRegistro) };

  // VALIDACIONES REGISTRO
  const {
    register: registerB,
    handleSubmit: handleSubmitB,
    formState: { errors: errorsB },
    reset: resetB,
    clearErrors
  } = useForm(opcionesRegistro);

  //CREAR CUENTA NUEVA
  const [error, setError] = useState(false);

  async function crearCuenta(formData) {
    setError(false);
    try {
      await axios.post("http://localhost:8800/api/aut/registro", formData);
      resetB();
    } catch (error) {
      setError(error);
    }
  }

  // MOSTRAR/OCULTAR CONTRASÑA
  const [toggleContrasenia, setContrasenia] = useState(false);
  const togglePSW = () => {
    setContrasenia((prevState) => !prevState);
  };

  const [toggleConfirmContrasenia, setConfirmContrasenia] = useState(false);
  const toggleConfirmPSW = () => {
    setConfirmContrasenia((prevState) => !prevState);
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
              <form
                className="formulario-editar row"
                onSubmit={handleSubmitB(crearCuenta)}
              >
                <div className="editar-izquierda col-6">
                  <div className="item-input">
                    <label htmlFor="apodo">Apodo</label>
                    <input
                      type="text"
                      placeholder="Teito"
                      id="apodo"
                      {...registerB("username")}
                    />
                  </div>
                  {errorsB.username && (
                    <span className="mensaje-error">
                      {errorsB.username.message}
                    </span>
                  )}
                  <div className="item-input">
                    <label htmlFor="email">E-mail</label>
                    <input
                      type="text"
                      placeholder="123@gmail.com"
                      id="email"
                      {...registerB("email")}
                    />
                    {errorsB.email && (
                      <span className="mensaje-error">
                        {errorsB.email.message}
                      </span>
                    )}
                  </div>
                  <div className="item-input">
                    <label htmlFor="contrasenia">Contraseña</label>
                    <input
                      type={toggleContrasenia ? "text" : "password"}
                      placeholder="Escriba la contraseña"
                      id="contrasenia"
                      {...registerB("password")}
                      onClick={togglePSW}
                    />
                    {errorsB.password && (
                      <span className="mensaje-error">
                        {errorsB.password.message}
                      </span>
                    )}
                  </div>
                  <div className="item-input">
                    <label htmlFor="contrasenia">Confirmacion de ontraseña</label>
                    <input
                      type={toggleConfirmContrasenia ? "text" : "password"}
                      placeholder="Repita la contraseña*"
                      id="contrasenia"
                      {...registerB("confirmPwd")}
                    />
                    <i
                      className={
                        toggleConfirmContrasenia
                          ? "fas fa-eye"
                          : "fas fa-eye-slash"
                      }
                      onClick={toggleConfirmPSW}
                    ></i>
                  </div>
                  {errorsB.confirmPwd && (
                    <span className="mensaje-error">
                      {errorsB.confirmPwd.message}
                    </span>
                  )}
                </div>
                <div className="editar-derecha col-6">
                  <div className="item-input">
                    <label htmlFor="avatar">Avatar</label>
                    <input
                      type="url"
                      placeholder="https://picsum.photos/id/237/200/300"
                      id="avatar"
                      {...registerB("fotoPerfil")}
                    />
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
                <button type="submit" className="btn btn-primary">
                  Crear Usuario
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
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => resetB()}
                
              >
                Borrar todo
              </button>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
