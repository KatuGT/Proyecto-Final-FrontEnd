import React from "react";
import { Link } from "react-router-dom";
import "../Estilos/EstilosCard.css";

function BtnAgragarCard() {
  return (
    <>
      <Link to="/configuracion">
        <div className="btn-agregar-item">
          <div>
            <i className="fas fa-plus"></i>
          </div>
          <div>
            <p>Agregar</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default BtnAgragarCard;
