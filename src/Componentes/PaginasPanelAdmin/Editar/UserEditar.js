import "./Editar.css";


export default function User() {
  return (
    <div className="contenedor-principal-editar">
      <div className="contenedor-titulo-user">
        <h2>Editar Usuario</h2>
      </div>
      <div className="contenedor-usuario row">
        <div className="datos-usuarios text-center col-xl-3">
          <figure>
            <img
              src="https://picsum.photos/id/237/200/300"
              alt="Avatar usuario"
            />
          </figure>
          <div className="apodo">
            <p className="titulo-dato">Apodo</p>
            <p className="dato-actual">Teito</p>
          </div>
          <div className="email">
            <p className="titulo-dato">E-mail</p>
            <p className="dato-actual">123@gmail.com</p>
          </div>
          <div className="contrasenia">
            <p className="titulo-dato">Contraseña</p>
            <p className="dato-actual">6dfyttryryrtfhhdf</p>
          </div>
          <div className="rol">
            <p className="titulo-dato">Rol</p>
            <p className="dato-actual">Usuario</p>
          </div>
        </div>
        <div className="editar-usuario col-xl-9 ">
          <span className="editar-titulo">Editar</span>
          <form className="formulario-editar row">
            <div className="editar-izquierda col-xl-9">
              <div className="item-input">
                <label htmlFor="apodo">Apodo</label>
                <input type="text" placeholder="Teito" id="apodo"></input>
              </div>
              <div className="item-input">
                <label htmlFor="email">E-mail</label>
                <input
                  type="text"
                  placeholder="123@gmail.com"
                  id="email"
                ></input>
              </div>
              <div className="item-input">
                <label htmlFor="contrasenia">Contraseña</label>
                <input
                  type="text"
                  placeholder="2132155"
                  id="contrasenia"
                ></input>
              </div>
              <div className="item-input">
                <div className="opcion-rol">
                  <input type="radio" name="rol" required id="usuario"></input>
                  <label htmlFor="usuario">Usuario</label>
                </div>
                <div className="opcion-rol">
                  <input type="radio" name="rol" required id="admin"></input>
                  <label htmlFor="admin">Admin</label>
                </div>
              </div>
            </div>
            <div className="editar-derecha col-xl-3">
              <img
                src="https://picsum.photos/id/237/200/300"
                alt="Avatar usuario"
              />

              <div className="item-input">
                <label htmlFor="avatar">Avatar</label>
                <input
                  type="url"
                  placeholder="https://picsum.photos/id/237/200/300"
                  id="avatar"
                ></input>
              </div>
            </div>
            <button className="enviar-edicion">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
