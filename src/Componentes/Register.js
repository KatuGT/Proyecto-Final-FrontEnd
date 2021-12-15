import React, { useState } from 'react';
import "../Estilos/Register.css";
import {Link, Route, Router, Path} from "react-router-dom";
import axios from 'axios';

function Register(){

    const [newUser , setNewUser] = useState(
        {
            nombre = "",
            email = "",
            contrasenia = "",
            reContrasenia = ""
        })
    
    const handleChange = e =>
    {
        const {name, value} = e.target;
        setNewUser(
            {
                ...newUser,
                [name] : value
            })
    }    
    const register = () => 
    {
        const {nombre, email, contrasenia, reContrasenia} = newUser
        if(nombre && email && contrasenia && (contrasenia === reContrasenia))
        {
            axios.post("http://localhost:4001/usuario", newUser).then(res => console.log(res));
        }
        else
        {
            alert("entrada incorrecta");
        }
    }

     return(
        <div className="divRegister">
            <form className="row">
                <div className="col-12">
                <label className="Register-label">Registarse</label>
                </div>
                <div className="col-12">
                    <input type="text" className="form-control userName" name='userName' value={newUser.name} id="userName" placeholder="Apodo" onChange={handleChange}/>
                </div>
                <div className="col-12">
                   <input type="email" class="form-control userMail" id="userMail" name='userMail' value={newUser.eMail} placeholder="name@example.com" onChange={handleChange}/>
                </div>
                <div className="col-12">
                    <input type="password" className="form-control userPass" name='userPass' value={newUser.password} id="userPass" placeholder="Password" onChange={handleChange}/>
                </div>
                <div className="col-12">
                    <input type="password" className="form-control confirmPass" name='confirmPass' value={newUser.confirmPassword}  id="confirmPass" placeholder="Confirm Password" onChange={handleChange}/>
                </div>
                <div className="col-12">
                    <Link to={"/"} className="btn btn-primary" onClick={register}>Enviar</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
