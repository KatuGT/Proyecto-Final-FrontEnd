import React, {useState} from 'react';
import "../Estilos/LogIn.css"
import {Link, Route, Router, Path} from "react-router-dom"
import axios from 'axios';


function LogIn(){

    const [nombre, setNombre] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    
    const onChangeName = (e) =>
    {
       setNombre({nombre : e.target.value});
       console.log(nombre);
    }

    const onChangePass = (e) =>
    {
       setContrasenia({contrasenia : e.target.value});
       console.log(contrasenia);
    }
    
    
    const LogIn = () => 
    {
        let data = [nombre, contrasenia];
        axios.post("http://localhost:4001/login", data).then(res => console.log(res));
    }


    return(
        <div className="divLogIn">
            <form className="row">
                <div className="col-12">
                <label className="logIn-label">Iniciar sesión</label>
                </div>
                <div className="col-12">
                    <input type="text" className="form-control userName" id="userName" placeholder="Apodo" />
                </div>
                <div className="col-12">
                    <input type="password" className="form-control userPass" id="userPass" placeholder="Contraseña" />
                </div>
                <div className="col-12">
                 <Link to={"/"} className="btn btn-primary" onClick={LogIn}>Log In</Link>
                 <Link to={"Register"} className="btn btn-primary">Register</Link>
                </div>
            </form>
        </div>
    );
}

export default LogIn;