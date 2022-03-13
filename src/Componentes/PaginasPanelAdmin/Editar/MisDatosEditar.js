import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Context } from "../../../Context/Context";
import "./Editar.css";
import { useParams } from "react-router-dom";

export default function User() {
  const { user } = useContext(Context);
  let { userId } = useParams();

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

  //ACTUALIZAR MIS DATOS
  async function actualizarUsuario(formData) {
    console.log(formData);
    await axios.put(`http://localhost:8800/api/usuario/${userId}`, formData, {
      headers: { token: user.tokenDeAcceso },
    });
    window.location.reload();
  }

  //Validacion registro

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    reset(usuario);
  }, [usuario, reset]);

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
                  {...register("username", {
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
                  Value={usuario?.email}
                  {...register("email")}
                />
                {errors.email && (
                  <span className="mensaje-error">{errors.email.message}</span>
                )}
              </div>
              <div className="item-input contrasenia-edit">
                <label htmlFor="contrasenia">Contraseña nueva</label>
                <input
                  defaultValue={user?.password}
                  className="nuevaContrasenia"
                  type="password"
                  placeholder="*******"
                  id="contrasenia"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="mensaje-error">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="item-input contrasenia-edit-confirm">
                <label htmlFor="nuevaContraseniaConf">
                  Confirmacion de nueva contraseña
                </label>
                <input
                  defaultValue={user?.password}
                  className="nuevaContraseniaConf"
                  id="nuevaContraseniaConf"
                  type="password"
                  autoComplete="off"
                  placeholder="Repita la contraseña*"
                  {...register("confirmPwd")}
                ></input>
                {errors.confirmPwd && (
                  <span className="mensaje-error">
                    {errors.confirmPwd.message}
                  </span>
                )}
              </div>
            </div>
            <div className="editar-derecha col-xl-3">
              <div className="item-input">
                <div className="opcion-rol">
                  <input
                    type="radio"
                    id="usuario"
                    value="false"
                    {...register("esAdmin")}
                  />
                  <label htmlFor="usuario">Usuario</label>
                </div>
                <div className="opcion-rol">
                  <input
                    type="radio"
                    id="admin"
                    {...register("esAdmin")}
                    value="true"
                  />
                  <label htmlFor="admin">Admin</label>
                </div>
              </div>
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
            <button type="submit" className="enviar-edicion">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
