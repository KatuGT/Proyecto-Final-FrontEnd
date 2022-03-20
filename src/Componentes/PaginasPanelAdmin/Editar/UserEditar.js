import "./Editar.css";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Context } from "../../../Context/Context";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";


export default function User() {
  let { userId } = useParams();
  const { user } = useContext(Context);

  const [usuario, setUsuario] = useState([]);
  useEffect(() => {
    async function getUsuario() {
      try {
        const usuario = await axios.get(
          `http://localhost:8800/api/usuario/find/${userId}`
        );
        setUsuario(usuario.data);
      } catch (err) {
        console.log("messaje", err);
      }
    }
    getUsuario();
  }, [userId]);

  //Validacion
  const esquemaActualisacionUsuario = Yup.object().shape({
    username: Yup.string()
      .required("El campo es requerido.")
      .min(6, "Tu apodo debe tener almenos 6 caracteres.")
      .max(15, "Tu apodo debe tener maximo 15 caracteres."),
    email: Yup.string()
      .required("El campo es requerido.")
      .email("Introdusca un Email valido."),
    editContrasenia: Yup.boolean()
    .required("El campo es requerido."),
    password: Yup.string().when("editContrasenia", {
      is: true,
      then: Yup.string()
        .required("El campo es requerido.")
        .min(8, "La contraseña debe tener almenos 8 caracteres.")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "No cumple con lo requisitos."
        ),
    }),
    confirmPwd: Yup.string().when("editContrasenia", {
      is: true,
      then: Yup.string()
        .required("El campo es requerido.")
        .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden."),
    }),
  });

  const opcionesActualisacion = {
    resolver: yupResolver(esquemaActualisacionUsuario),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm(opcionesActualisacion);

  const editContrasenia = watch("editContrasenia");

  useEffect(() => {
    reset(usuario);
  }, [usuario, reset]);

  async function actualizarUsuario(formData) {
    await axios.put(`http://localhost:8800/api/usuario/${userId}`, formData, {
      headers: { token: user.tokenDeAcceso },
    });
    window.location.reload();
  }

  //*ocultar / mostrar contraseña
  const [toggleContrasenia, setContrasenia] = useState(false);
  const togglePSW = () => {
    setContrasenia((prevState) => !prevState);
  };

  const [toggleConfirmContrasenia, setConfirmContrasenia] = useState(false);
  const toggleConfirmPSW = () => {
    setConfirmContrasenia((prevState) => !prevState);
  };

  return (
    <div className=" formulario-editar contenedor-principal-editar">
      <div className="contenedor-titulo-user">
        <h2>Editar Usuario</h2>
      </div>
      <div className="contenedor-usuario row">
        <div className="contenedor-info-editar ">
          <form
            className="formulario-editar row"
            onSubmit={handleSubmit(actualizarUsuario)}
          >
            <div className="editar-izquierda">
              <div className="item-input">
                <label htmlFor="apodo">Apodo</label>
                <input
                  type="text"
                  id="apodo"
                  defaultValue={usuario?.username}
                  {...register("username")}
                />
                {errors.username && (
                  <span className="mensaje-error">
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div className="item-input">
                <label htmlFor="email">E-mail</label>
                <input
                  type="text"
                  id="email"
                  defaultValue={usuario?.email}
                  {...register("email")}
                />
                {errors.email && (
                  <span className="mensaje-error">{errors.email.message}</span>
                )}
              </div>
            </div>
            <div className="editar-derecha col-xl-3">
              <div className="item-input">
                <label htmlFor="avatar">Avatar</label>
                <input
                  type="url"
                  defaultValue={usuario?.fotoPerfil}
                  id="avatar"
                  {...register("fotoPerfil")}
                />
              </div>
            </div>
            <div className="item-input">
              <div className="opcion-rol">
                <input
                  type="radio"
                  id="usuarioRol"
                  value="false"
                  {...register("esAdmin")}
                />
                <label htmlFor="usuarioRol">Usuario</label>
              </div>
              <div className="opcion-rol">
                <input
                  type="radio"
                  id="adminRol"
                  value="true"
                  {...register("esAdmin")}
                />
                <label htmlFor="adminRol">Admin</label>
              </div>
            </div>
            <div className="condicional-contrasenia">
              <input
                id="editContrasenia"
                type="checkbox"
                name="editContrasenia"
                {...register("editContrasenia")}
              />
              <label htmlFor="editContrasenia">Deseo editar contraseña</label>
            </div>
            {editContrasenia && (
              <>
                <div className="item-input contrasenia-edit">
                  <label htmlFor="contrasenia">Contraseña nueva</label>
                  <input
                    defaultValue={user?.password}
                    className="nuevaContrasenia"
                    type={toggleContrasenia ? "text" : "password"}
                    placeholder="Nueva contraseña"
                    autoComplete="off"
                    id="contrasenia"
                    {...register("password")}
                  />
                  <i
                    className={
                      toggleContrasenia ? "fas fa-eye" : "fas fa-eye-slash"
                    }
                    onClick={togglePSW}
                  ></i>
                  {errors.password && (
                    <span className="mensaje-error">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="item-input contrasenia-edit-confirm">
                  <label htmlFor="nuevaContraseniaConf">
                    Confirmación de nueva contraseña
                  </label>
                  <input
                    
                    className="nuevaContraseniaConf"
                    id="nuevaContraseniaConf"
                    type={toggleConfirmContrasenia ? "text" : "password"}
                    autoComplete="off"
                    placeholder="Repita la contraseña*"
                    {...register("confirmPwd")}
                  />
                  <i
                    className={
                      toggleConfirmContrasenia
                        ? "fas fa-eye"
                        : "fas fa-eye-slash"
                    }
                    onClick={toggleConfirmPSW}
                  ></i>
                  {errors.confirmPwd && (
                    <span className="mensaje-error">
                      {errors.confirmPwd.message}
                    </span>
                  )}
                </div>
              </>
            )}
            <button type="submit" className="enviar-edicion">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
