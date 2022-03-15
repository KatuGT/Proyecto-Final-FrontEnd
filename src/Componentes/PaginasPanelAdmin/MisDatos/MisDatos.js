import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { Context } from "../../../Context/Context";
import FotoDefault from "../../../Imagenes/fotoperfildefault.jpg";
import "./MisDatos.css";

export default function MisDatos() {
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


  return (
    <div className="tabla-contenido">
      <div className="titulo-configuracion">Mis Datos</div>
      <Link to={"datos/"+user._id } className="edit-perfil">
          <p>Editar</p>    <i className="fas fa-user-edit"></i>
      </Link>
      <div className="mis-datos">
        <div className="avatar">
          <figure>
            <img
              src={usuario?.fotoPerfil ? usuario?.fotoPerfil : FotoDefault}
              alt="Foto de perfil."
            />
          </figure>
        </div>
        <div className="datos-cuenta">
          <span className="item-info-cuenta">
            <p className="info-titulo">Apodo:</p>
            <p className="info">{usuario?.username}</p>
          </span>
          <span className="item-info-cuenta">
            <p className="info-titulo">E-mail:</p>
            <p className="info">{usuario?.email}</p>
          </span>
          
          <span className="item-info-cuenta">
            <p className="info-titulo">Rol:</p>
            <p className="info"> {usuario?.esAdmin ? "Admin" : "Usuario"}</p>
          </span>         
          <span className="item-info-cuenta">
            <p className="info-titulo">Estado:</p>
            <p className="info"> {usuario?.estaActivo ? "Activo" : "Bloqueado"}</p>
          </span>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
