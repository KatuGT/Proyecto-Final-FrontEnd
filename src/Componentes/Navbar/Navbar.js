import home from "./home-solid.svg";
import search from "./search-solid.svg";
import user from "./user-circle-solid.svg";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState, useEffect } from "react";
import axios from "axios";

const cerrarSesion = () => {
  // TODO cerrar sesion
};

function Navbar() {
  //MOSTRAR PELICULAS EN LISTA

  const [peliculas, setPeliculas] = useState([]);

  const getPeliculas = async () => {
    try {
      await axios
        .get(`http://localhost:4001/api/peliculas/`)
        .then((response) => {
          setPeliculas(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPeliculas();
  }, []);

  const [dataFiltrada, setDataFiltrada] = useState([]);
  const handleFilter = (e) => {
    const busqueda = e.target.value;
    const nuevoFiltro = peliculas.filter((value) => {
      return value.nombre.toLowerCase().includes(busqueda.toLowerCase());
    });
    if (busqueda === "") {
      setDataFiltrada([]);
    } else {
      setDataFiltrada(nuevoFiltro);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Rollflix
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/series"
                >
                  Series
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/peliculas"
                >
                  Peliculas
                </Link>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  <img
                    className={"icon filter-purple"}
                    src={home}
                    alt="icono home"
                  />
                </Link>
              </li>
              <li className="nav-item searchBar">
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={handleFilter}
                  />
                  <button className="btn boton" type="submit">
                    <img
                      className={"icon filter-white"}
                      src={search}
                      alt="icono home"
                    />
                  </button>
                </form>
                {dataFiltrada.length !== 0 && (
                  <div className="dataResultado">
                    {dataFiltrada.slice(0, 14).map((value, key) => {
                      return (
                        <Link
                          to={{ pathname: `/ver/${value._id}` }}
                          className="busqueda"
                        >
                          {value.nombre}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    className={"icon filter-purple"}
                    src={user}
                    alt="icono home"
                  />
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">                  
                  <li>
                    <Link className="dropdown-item" to="/configuracion">
                      Configuracion
                    </Link>
                  </li>
                  <li>
                    <div className="dropdown-divider"> </div>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={cerrarSesion()}>
                      Cerrar sesion
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
