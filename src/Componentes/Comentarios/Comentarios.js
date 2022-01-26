import React, { useState } from 'react';

import "./Comentarios.css";


export default function Comentarios() {

    const [comentarios, setComentarios] = useState([1,2,3,4,5]);
    const [comentario, setComentario] = useState("");

    const handleClick = () =>{
        
    }


    return <div>
      <section className='contenedor-comentarios'>
        
          <div className='lista-comentarios'>
            <h3>Comentarios </h3>
            {comentarios.map((c, i) =>(
                <p key={i}> comment{i} </p>
            ) )}
          </div>
          <div className='formulario-comentario'>
              <h3>Dejanos tu opinion aqui</h3>
              <textarea type="textarea"
              rows="7"
              className='text-area form-control'
              placeholder='....'
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}/>
              
          <button disabled={!comentario} onClick={handleClick}>Enviar</button>
          </div>
      </section>
  </div>;
}
