import "../../Estilos/MisDatos.css";

export default function MisDatos() {
  return (
    <div className="contenedor-mis-datos">
      <div className="titulo-configuracion">Mis Datos</div>

      <div className="mis-datos">
        <div className="avatar">
          <figure>
            <img src="https://picsum.photos/id/237/200/300" alt="" />
          </figure>
        </div>
        <div className="datos-cuenta">
          <span className="item-info-cuenta">
            <p className="info-titulo">Apodo:</p>
            <p className="info">Katu</p>
          </span>
          <span className="item-info-cuenta">
            <p className="info-titulo">E-mail:</p>
            <p className="info">Katu@sdfsdf.com</p>
          </span>
          <span className="item-info-cuenta">
            <p className="info-titulo">Contraseña:</p>
            <p className="info">**********</p>
          </span>
          <span className="item-info-cuenta">
            <p className="info-titulo">Rol:</p>
            <p className="info"> Admin</p>
          </span>
        </div>
      </div>
    </div>
  );
}
