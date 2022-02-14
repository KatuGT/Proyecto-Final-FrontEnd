import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <footer className="row">
        <section className="legales col-12 col-lg-4">
          <ul>
            <li key="1">Avisos legales</li>
            <li key="2">Información corporativa</li>
            <li key="3">Términos de uso</li>
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
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </li>
          </ul>
        </section>
        <section className="otros col-12 col-lg-4">
          <ul>
            <li key="7">Contáctanos</li>
            <li key="8">Centro de ayuda</li>
            <li key="9">Privacidad</li>
          </ul>
        </section>
      </footer>
    </>
  );
}
