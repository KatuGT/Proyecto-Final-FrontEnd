import React from 'react';
import "../Estilos/LogIn.css"
import {Link, Route, Router, Path} from "react-router-dom"
import axios from 'axios';


function LogIn(){

    const [user , setUser] = useState(
        {
            nombre = "",
            contrasenia = "",
        })
    
    const handleChange = e =>
    {
        const {name, value} = e.target;
        setUser(
            {
                ...user,
                [name] : value
            })
    }    
    const LogIn = () => 
    {
        axios.post("http://localhost:4001/logIn", user);
    }


    return(
        <div className="divLogIn">
            <form className="row">
                <div className="col-12">
                <label className="logIn-label">Iniciar sesión</label>
                </div>
                <div className="col-12">
                    <input type="text" className="form-control userName" id="userName" placeholder="userName" value={newUser.name}/>
                </div>
                <div className="col-12">
                    <input type="password" className="form-control userPass" id="userPass" placeholder="Password" value={newUser.contrasenia}/>
                </div>
                <div className="col-12">
                 <Link to={"peliculas"} className="btn btn-primary" onClick={LogIn}>Log In</Link>
                 <Link to={"Register"} className="btn btn-primary">Register</Link>
                </div>
            </form>
        </div>
    );
}

export default LogIn;