import React, { useState } from 'react';
import "../Estilos/Register.css";
import {Link} from "react-router-dom";
import axios from 'axios';

function Register(){
   
    const [user, setUser] = useState(
        {
            nombre: "",
            email: "",
            contrasenia:"",
            reContrasenia:""
        });
    const onChangeUser = e => {
        const {name, value} = e.target
        setUser
        ({
         ...user, [name]: value
        })
    }    
    const register = () => 
    {
        let data = user;
        console.log(data);
        axios.post("http://localhost:4001/register", data).then(res => console.log(res));
    }

     return(
        
        <div className="divRegister">
            {console.log(user)}
            <form className="row">
                <div className="col-12">
                <label className="Register-label">Registarse</label>
                </div>
                <div className="col-12">
                    <input type="text" className="form-control nombre" name='nombre' value={user.nombre} id="userName"  placeholder="Apodo" onChange={onChangeUser}/>
                </div>
                <div className="col-12">
                   <input type="email" class="form-control userMail" id="userMail" name='email' value={user.email}  placeholder="name@example.com" onChange={onChangeUser}/>
                </div>
                <div className="col-12">
                    <input type="password" className="form-control userPass" id="userPass" name='contrasenia' value={user.contrasenia} placeholder="Password" onChange={onChangeUser}/>
                </div>
                <div className="col-12">
                    <input type="password" className="form-control confirmPass" id="confirmPass" name='reContrasenia' value={user.reContrasenia} placeholder="Confirm Password" onChange={onChangeUser}/>
                </div>
                <div className="col-12">
                    <Link to={"/"} className="btn btn-primary" onClick={register} >Enviar</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
