import "./Sidebar.css";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-contenedor">
          <div className="sidebar-menu">
            <h3 className="sidebar-titulo">Panel</h3>

            <ul>
              <NavLink to="misdatos" className="link" activeclassname="active-link">
                <li className="sidebar-item">
                  <i className="fas fa-user-tie"></i> <p>Mis datos</p>
                </li>
              </NavLink>
              <NavLink to="usuarioslista" className="link" activeclassname="active-link">
                <li className="sidebar-item">
                  <i className="fas fa-users"></i> <p>Usuarios</p>
                </li>
              </NavLink>
              <hr />
              <NavLink to="peliculas" className="link" activeclassname="active-link">
                <li className="sidebar-item">
                  <i className="fas fa-film"></i> <p>Películas</p>
                </li>
              </NavLink>
              <NavLink to="listapeliculas" className="link" activeclassname="active-link">
                <li className="sidebar-item">
                <i className="fas fa-list"></i> <p>Categorias de Películas</p>
                </li>
              </NavLink>
              <hr />
              <NavLink to="series" className="link" activeclassname="active-link">
                <li className="sidebar-item">
                  <i className="fas fa-video"></i> <p>Series</p>
                </li>
              </NavLink>
              <NavLink to="listaseries" className="link" activeclassname="active-link">
                <li className="sidebar-item">
                <i className="fas fa-list"></i> <p>Categorias de Series</p>
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
