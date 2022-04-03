import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../Context/Context";
import "./Comentarios.css";

export default function Comentarios({ id }) {
  //GET COMENTARIOS
  const [comentarios, setComentarios] = useState([]);

  const getComentarios = useCallback(async () => {
    try {
      await axios
        .get(`http://localhost:8800/api/films/${id}`)
        .then((response) => {
          setComentarios(response.data.comentarios);
        });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getComentarios();
  }, [comentarios, getComentarios]);

  //Comentarios VALIDACIONES
  const { user } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //agregar comentario
  async function enviarComentario(formData) {
    const datosComentarios =
      `${user.username}: ` + JSON.stringify(formData.comentario);
    try {
      await axios.post(
        `http://localhost:8800/api/films/${id}/agregarcomentario/`,
        { datosComentarios }
      );
      reset();
    } catch (error) {
      console.log(error);
    }
  }

  //borrar comentario
  async function borrarItem(index) {
    console.log(index);
    try {
      await axios.delete(
        `http://localhost:8800/api/films/${id}/borrarcomentario/`,
        { data: { index } }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="contenedor-principal-comentarios">
      <section className="contenedor-comentarios">
        <div className="titulo-comentarios">
          <h4>Comentarios</h4>
        </div>
        <div className="lista-comentarios">
          {comentarios.map((comentario, index) => (
            <p className="comentario" key={index}>
              <i
                className="fas fa-trash-alt"
                onClick={() => borrarItem(index)}
              ></i>
              <strong key={index}>{comentario.split(": ")[0]}:</strong>
              {comentario.split(":")[1]}
            </p>
          ))}
        </div>
      </section>
      <section className="formularios-comentarios">
        <h6>Deja un comentario</h6>
        <form onSubmit={handleSubmit(enviarComentario)}>
          <textarea
            {...register("comentario", {
              required: {
                value: true,
                message: "No puede enviar un mensaje vacio.",
              },
              maxLength: {
                value: 150,
                message: "Maximo 150 caracteres",
              },
            })}
          ></textarea>
          {errors.comentario && (
            <span className="mensaje-error">{errors.comentario.message}</span>
          )}
          <button type="submit">Enviar</button>
        </form>
      </section>
    </section>
  );
}
