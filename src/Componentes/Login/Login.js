import "./Login.css";
import React from "react";
import { useForm, useFormState, useWatch } from "react-hook-form";

export default function Login() {
  // VALIDACIONES INICIAR
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function iniciarSesion(formData) {
    console.log(formData);
    reset();
  }

  // VALIDACIONES REGISTRO
  const {
    register: registerB,
    handleSubmit: handleSubmitB,
    formState: { errors: errorsB },
    reset: resetB,
    control,
    trigger,
  } = useForm();

  //Validacion de la confirmacion de contraseña
  const { touchedFields } = useFormState({
    control,
  });
  const primeraContrasenia = useWatch({ control, name: "password" });

  const passwordInput = registerB("password", {
    required: {
      value: true,
      message:"Este campo es requerido."
    },
    minLength: {
      value: 8,
      message: "La contraseña debe tener almenos 8 caracteres.",
    },
  });

  async function crearCuenta(formData) {
    console.log(formData);
    resetB();
  }

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
          <input
            autoComplete="current-password"
            type="password"
            placeholder="Contraseña"
            {...register("contrasenia", {
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
          {errors.contrasenia && (
            <span className="mensaje-error">{errors.contrasenia.message}</span>
          )}
          <button type="submit">Inicia sesión</button>
        </form>
        {/* //FORMULARIO CREAR CUENTA */}
        <form
          className="formulario registro-wrapper"
          onSubmit={handleSubmitB(crearCuenta)}
        >
          <h3>Crea tu cuenta</h3>
          <input
            type="text"
            placeholder="Apodo*"
            {...registerB("apodo", {
              required: {
                value: true,
                message: "El campo es requerido.",
              },
              minLength: {
                value: 6,
                message: "Minimo 6 caracteres.",
              },
            })}
          />
          {errorsB.apodo && (
            <span className="mensaje-error">{errorsB.apodo.message}</span>
          )}
          <input
            type="email"
            placeholder="E-mail*"
            {...registerB("emailRegistro", {
              required: {
                value: true,
                message: "El campo es requerido.",
              },
            })}
          />
          {errorsB.emailRegistro && (
            <span className="mensaje-error">
              {errorsB.emailRegistro.message}
            </span>
          )}
          <input
            type="password"
            autoComplete="off"
            placeholder="Contraseña*"
            name={passwordInput.name}
            onBlur={passwordInput.onBlur}
            ref={passwordInput.ref}
            onChange={async (e) => {
              await passwordInput.onChange(e);
              if (touchedFields.confirmPassword) {
                trigger("confirmPassword");
              }
            }}
          />
          {errorsB.passwordInput && (
            <span className="mensaje-error">
              {errorsB.passwordInput.message}
            </span>
          )}
          <input
            type="password"
            autoComplete="off"
            placeholder="Repita la contraseña*"
            isinvalid={errors.confirmPassword}
            {...registerB("confirmPassword", {
              required: "Este campo es requerido.",
              validate: {
                match: (value) =>
                primeraContrasenia === value || "Your passwords do not match.",
              },
            })}
          />
          {errorsB.confirmPassword && (
            <span className="mensaje-error">
              {errorsB.confirmPassword.message}
            </span>
          )}


          <p>- Los campos con (*) son requeridos.</p>
          <p>- El apodo debe contener minimo 6 caracteres.</p>
          <p>
            - La contraseña debe contener numeros y letras, entre ellos almenos
            1 mayuscula.
          </p>
          <p>- La contraseña debe contener minimo 8 caracteres.</p>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}
