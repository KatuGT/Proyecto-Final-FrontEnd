import React, {useState} from 'react';
import "../Estilos/LogIn.css"
import {Link, Route, Router, Path} from "react-router-dom"
import axios from 'axios';


function LogIn(){

    const [user, setUser] = useState(
        {
            nombre: "",
            contrasenia:"",
        });
    const onChangeUser = e => {
        const {name, value} = e.target
        setUser
        ({
         ...user, [name]: value
        })
    }    
    const LogIn = () => 
    {
        let data = user;
        axios.post("http://localhost:4001/login", JSON.parse(data)).then(res => console.log(res));
    }


    return(
        <div className="divLogIn">
            <form className="row">
                <div className="col-12">
                <label className="logIn-label">Iniciar sesión</label>
                </div>
                <div className="col-12">
                    <input type="text" className="form-control userName" name='nombre' value={user.nombre} id="userName" placeholder="Apodo" onChange={onChangeUser} />
                </div>
                <div className="col-12">
                    <input type="password" className="form-control userPass" name='contrasenia' value={user.contrasenia} id="userPass"  placeholder="Contraseña" onChange={onChangeUser}/>
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