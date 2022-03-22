import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../Context/Context";

export default function Comentarios({ id }) {
  //Comentarios
  const { user } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function enviarComentario(formData) {
    const datosComentarios =
      `${user.username}: ` + JSON.stringify(formData.comentario);
    console.log(datosComentarios);
    try {
      await axios.post(
        `http://localhost:8800/api/films/${id}/agregarcomentario/`,
        {datosComentarios }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="contenedor-comentarios">
        <div className="titulo-comentarios">
          <h6>Comentarios</h6>
        </div>
        <div className="comentarios"></div>
      </section>
      <section className="formularios-comentarios">
        <h6>Deja un comentario</h6>
        <form onSubmit={handleSubmit(enviarComentario)}>
          <textarea
            {...register("comentario", {
              maxLength: {
                value: 10,
                message: "Maximo 10 caracteres",
              },
            })}
          ></textarea>
          {errors.comentario && (
            <span className="mensaje-error">{errors.comentario.message}</span>
          )}
          <button type="submit">Enviar</button>
        </form>
      </section>
    </>
  );
}
