import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Context } from "../../../Context/Context";
import "./Editar.css";
import { useParams } from "react-router-dom";

export default function User() {
  const { user } = useContext(Context);
  let { userId } = useParams();

  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    async function getMiUsuario() {
      try {
        const usuario = await axios.get(
          `https://rollflix-back.herokuapp.com/api/usuario/find/${userId}`
        );
        setUsuario(usuario.data);
      } catch (err) {
        console.log("messaje", err);
      }
    }
    getMiUsuario();
  }, [userId]);

  //ACTUALIZAR MIS DATOS
  async function actualizarUsuario(formData) {
    await axios.put(`https://rollflix-back.herokuapp.com/api/usuario/${userId}`, formData, {
      headers: { token: user.tokenDeAcceso },
    });
   window.location.reload();
  }

  //Validacion
  const esquemaActualisacionUsuario = Yup.object().shape({
    username: Yup.string()
      .required("El campo es requerido.")
      .min(6, "Tu apodo debe tener almenos 6 caracteres.")
      .max(15, "Tu apodo debe tener maximo 15 caracteres."),
    email: Yup.string()
      .required("El campo es requerido.")
      .email("Introdusca un Email valido."),
    editContrasenia: Yup.boolean(),
    esAdmin: Yup.boolean().required("El campo es requerido."),
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

  //ocultar / mostrar contraseña

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
        <div className="contenedor-info-editar col-xl-9 ">
          <form
            className="formulario-editar row"
            onSubmit={handleSubmit(actualizarUsuario)}
          >
            <div className="editar-izquierda col-xl-9">
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
            <div className="editar-derecha">
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
                    defaultValue={user?.password}
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
