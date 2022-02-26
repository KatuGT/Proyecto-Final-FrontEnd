import "./Login.css"

import React from 'react'

export default function Login() {
  return (
    <div className="container-login-registro">        
        <div className="login-registro-wrapper">
            <form className=" formulario login-wrapper">
                <h3 className="">Ingresa tus datos</h3>
                <input type="text" placeholder="E-mail"/>
                <input type="password" placeholder="Contraseña"/>
                <button type="submit">Inicia sesión</button>
            </form>
            <form className="formulario registro-wrapper">
                <h3>Crea tu cuenta</h3>
                <input type="text" placeholder="Apodo*"/>
                <input type="text" placeholder="E-mail*"/>
                <input type="password" placeholder="Contraseña*"/>
                <input type="password" placeholder="Repita la contraseña*"/>
                <p>- Los campos con (*) son requeridos.</p>
                <p>- El apodo debe contener minimo 6  caracteres.</p>
                <p>- La contraseña debe contener numeros y letras, entre ellos almenos 1 mayuscula.</p>
                <p>- La contraseña debe contener minimo 8 caracteres.</p>
                <button type="submit">Enviar</button>
            </form>
        </div>
    </div>
  )
}
