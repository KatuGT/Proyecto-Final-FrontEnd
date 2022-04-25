import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <footer className="row">
        <section className="legales col-12 col-lg-4">
          <ul>
            <Link to="/avisos" className="link">
              <li key="1">Avisos legales</li>
            </Link>
            <Link to="/infocorp" className="link">
              <li key="2">Información corporativa</li>
            </Link>
            <Link to="/terminos" className="link">
              <li key="3">Términos de uso</li>
            </Link>
          </ul>
        </section>
        <section className="redes col-12 col-lg-4">
          <ul>
            <li key="4">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li key="5">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-instagram-square"></i>
              </a>
            </li>
            <li key="6">
              <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
          </ul>
        </section>
        <section className="otros col-12 col-lg-4">
          <ul>
            <Link to="/Contactanos" className="link">
              <li key="7">Contáctanos</li>
            </Link>
            <Link  to="/ayuda" className="link">
              <li key="8">Centro de ayuda</li>
            </Link>
            <Link  to="/privacidad" className="link">
              <li key="9">Privacidad</li>
            </Link>
          </ul>
        </section>
      </footer>
    </>
  );
}
