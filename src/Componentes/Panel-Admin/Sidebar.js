import "../../Estilos/Sidebar.css";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-contenedor">
          <div className="sidebar-menu">
            <h3 className="sidebar-titulo">Panel</h3>
            
            <ul>
              <NavLink to="misdatos" className="link">
                <li className="sidebar-item">
                  <i className="fas fa-user-tie"></i> <p>Mis datos</p>
                </li>
              </NavLink>
              <NavLink to="usuarioslista" className="link">
                <li className="sidebar-item">
                  <i className="fas fa-users"></i> <p>Usuarios</p>
                </li>
              </NavLink>
              <NavLink to="peliculas" className="link">
                <li className="sidebar-item">
                  <i className="fas fa-film"></i> <p>Peliculas</p>
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
