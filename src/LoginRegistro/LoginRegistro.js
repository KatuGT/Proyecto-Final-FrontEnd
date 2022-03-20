import "./LoginRegistro.css";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Context } from "../Context/Context";

export default function LoginRegistro() {
  const { dispatch } = useContext(Context);

  // VALIDACIONES INICIAR
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //LOGIN
  const [loginError, setLoginError] = useState(false);
  async function iniciarSesion(formData) {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8800/api/aut/login",
        formData
      );

      if (!res.data.estaActivo) {
        alert("Tu usuario fue bloqueado.");
      } else {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      }
      reset();
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL" });
      setLoginError(error);
    }
  }

  //Validacion registro
  const esquemaRegistro = Yup.object().shape({
    username: Yup.string()
      .required("El campo es requerido.")
      .min(6, "Tu apodo debe tener almenos 6 caracteres.")
      .max(15, "Tu apodo debe tener maximo 15 caracteres."),
    email: Yup.string()
      .required("El campo es requerido.")
      .email("Introdusca un Email valido."),
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
  } = useForm(opcionesRegistro);

  //CREAR CUENTA NUEVA
  let navigate = useNavigate();
  const [error, setError] = useState(false);

  async function crearCuenta(formData) {
    setError(false);
    try {
      await axios.post("http://localhost:8800/api/aut/registro", formData);
      resetB();
      navigate("/registro-exitoso");
    } catch (error) {
      setError(error);
    }
  }

  // MOSTRAR/OCULTAR CONTRASÑA

  const [toggleContraseniaLogin, setContraseniaLogin] = useState(false);
  const togglePSWLogin = () => {
    setContraseniaLogin((prevState) => !prevState);
  };

  const [toggleContrasenia, setContrasenia] = useState(false);
  const togglePSW = () => {
    setContrasenia((prevState) => !prevState);
  };

  const [toggleConfirmContrasenia, setConfirmContrasenia] = useState(false);
  const toggleConfirmPSW = () => {
    setConfirmContrasenia((prevState) => !prevState);
  };

  return (
    <div className="container-login-registro">
      <div className="login-registro-wrapper">
        {/* //FORMULARIO INICIAR SESION */}
        <form
          className=" formulario login-wrapper"
          onSubmit={handleSubmit(iniciarSesion)}
        >
          <h3 className="">Ingresa tus datos</h3>
          <input
            autoComplete="on"
            type="email"
            placeholder="E-mail"
            {...register("email", {
              required: {
                value: true,
                message: "El campo es requerido.",
              },
            })}
          />
          {errors.email && (
            <span className="mensaje-error">{errors.email.message}</span>
          )}
          <div className="contrasenia">
            <input
              autoComplete="current-password"
              type={toggleContraseniaLogin ? "text" : "password"}
              placeholder="Contraseña"
              {...register("password", {
                required: {
                  value: true,
                  message: "El campo es requerido.",
                },
                minLength: {
                  value: 8,
                  message: "Minimo 8 caracteres.",
                },
              })}
            />
            <i
              className={
                toggleContraseniaLogin ? "fas fa-eye" : "fas fa-eye-slash"
              }
              onClick={togglePSWLogin}
            ></i>
          </div>
          {errors.contrasenia && (
            <span className="mensaje-error">{errors.contrasenia.message}</span>
          )}
          <button type="submit">Inicia sesión</button>
          {loginError && (
            <p className="mensaje-error-duplicado">
              Email o contraseña erroneos.
            </p>
          )}
        </form>
        {/* //FORMULARIO CREAR CUENTA */}
        <form
          className="formulario registro-wrapper"
          onSubmit={handleSubmitB(crearCuenta)}
        >
          <h3>Crea tu cuenta</h3>
          <input type="text" placeholder="Apodo*" {...registerB("username")} />
          {errorsB.username && (
            <span className="mensaje-error">{errorsB.username.message}</span>
          )}
          <input type="email" placeholder="E-mail*" {...registerB("email")} />
          {errorsB.email && (
            <span className="mensaje-error">{errorsB.email.message}</span>
          )}
          <div className="contrasenia">
            <input
              type={toggleContrasenia ? "text" : "password"}
              autoComplete="off"
              placeholder="Contraseña*"
              {...registerB("password")}
            />

            <i
              className={toggleContrasenia ? "fas fa-eye" : "fas fa-eye-slash"}
              onClick={togglePSW}
            ></i>
          </div>
          {errorsB.password && (
            <span className="mensaje-error">{errorsB.password.message}</span>
          )}
          <div className="contrasenia">
            <input
              type={toggleConfirmContrasenia ? "text" : "password"}
              autoComplete="off"
              placeholder="Repita la contraseña*"
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
            <span className="mensaje-error">{errorsB.confirmPwd.message}</span>
          )}

          <p>- Los campos con (*) son requeridos.</p>
          <p>- El apodo debe contener mínimo 6 caracteres.</p>
          <p>
            - La contraseña debe contener al menos 1 numero, 1 letra y 1
            carácter especial (@$!%*#?&).
          </p>
          <p>- La contraseña debe contener mínimo 8 caracteres.</p>
          <button type="submit">Enviar</button>
          {error && (
            <p className="mensaje-error-duplicado">
              Puede que el Email o apodo ya este en uso.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
