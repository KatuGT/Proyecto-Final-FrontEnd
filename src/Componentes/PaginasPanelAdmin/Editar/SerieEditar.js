import "./Editar.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Pelicula() {
  //MUESTRA EN INPUTS INFORMACION DE LA PELICULA SLECCIONADA PARA EDITAR
  let { serieId } = useParams();

  const [serie, setSerie] = useState([]);

  useEffect(() => {
    async function getSerie() {
      try {
        const serie = await axios.get(
          `http://localhost:8800/api/films/${serieId}`
        );
        setSerie(serie.data);
      } catch (err) {
        console.log("messaje", err);
      }
    }
    getSerie();
  }, [serieId]);

  //VALIDACIONES
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const anioActual = new Date().getFullYear();

  useEffect(() => {
    reset(serie);
  }, [serie, reset]);

  async function actualizarItem(formData) {
    await axios.put(`/films/${serieId}`, formData);
    window.location.reload();
  }

  return (
    <div className="formulario-editar contenedor-principal-editar">
      <div className="pelicula">
        <div className="contenedor-titulo-pelicula">
          <h2>Editar Serie</h2>
        </div>
      </div>
      <div className="contenedor-info-editar">
        {/* FORMULARIO PARA EDITAR  */}
        <form className="row" onSubmit={handleSubmit(actualizarItem)}>
          <div className="editar-izquierda col-12 col-sm-6 col-xl-8">
            <div className="item-input">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                {...register("nombre", {
                  required: {
                    value: true,
                    message: "El campo es requerido.",
                  },
                  minLength: {
                    value: 1,
                    message: "Mínimo 1 caracter.",
                  },
                  maxLength: {
                    value: 60,
                    message: "Máximo  60 caracteres.",
                  },
                })}
              />
              {errors.nombre && (
                <span className="mensaje-error">{errors.nombre.message}</span>
              )}
            </div>
            <div className="item-input">
              <label htmlFor="director">Director/es</label>
              <input
                type="text"
                id="director"
                {...register("director", {
                  required: {
                    value: true,
                    message: "El campo es requerido.",
                  },
                  minLength: {
                    value: 1,
                  },
                })}
              />
              {errors.director && (
                <span className="mensaje-error">{errors.director.message}</span>
              )}
            </div>
            <div className="item-input">
              <label htmlFor="estreno">Estreno</label>
              <input
                type="number"
                id="estreno"
                max={anioActual}
                min={1500}
                {...register("fecha_de_Estreno", {
                  required: {
                    value: true,
                    message: "El campo es requerido.",
                  },
                  minLength: {
                    value: 1,
                  },
                })}
              />
              {errors.director && (
                <span className="mensaje-error">
                  {errors.fecha_de_Estreno.message}
                </span>
              )}
            </div>
            <div className="item-input">
              <div className="item-duracion">
                <label htmlFor="duracion">Duración</label>
                <p className="info duracion">?</p>
              </div>
              <input
                type="text"
                id="duracion"
                {...register("duracion", {
                  required: {
                    value: true,
                    message: "El campo es requerido.",
                  },
                  minLength: {
                    value: 5,
                    message:
                      "Escriba la duracion en minutos de la pelicula o cantidad de episodios de la serie",
                  },
                })}
              />
              {errors.duracion && (
                <span className="mensaje-error">{errors.duracion.message}</span>
              )}
            </div>
            <div className="item-input">
              <label htmlFor="protagonistas">Protagonistas</label>
              <input
                type="text"
                id="protagonistas"
                {...register("protagonistas", {
                  required: {
                    value: true,
                    message: "El campo es requerido.",
                  },
                  minLength: {
                    value: 5,
                    message: "Minimo 6 caracteres",
                  },
                })}
              />
              {errors.protagonistas && (
                <span className="mensaje-error">
                  {errors.protagonistas.message}
                </span>
              )}
            </div>
            <div className="item-input">
              <label htmlFor="sinopsis">Sinopsis</label>
              <textarea
                type="text"
                id="sinopsis"
                {...register("sinopsis", {
                  required: {
                    value: true,
                    message: "El campo es requerido.",
                  },
                  minLength: {
                    value: 100,
                    message: "Minimo 100 caracteres.",
                  },
                })}
              />
              {errors.sinopsis && (
                <span className="mensaje-error">{errors.sinopsis.message}</span>
              )}
            </div>
            <div className="item-input">
              <div className="item-duracion">
                <label htmlFor="trailer">Trailer</label>
                <p className="info trailer">!</p>
              </div>
              <input
                type="url"
                id="trailer"
                {...register("trailer", {
                  required: {
                    value: true,
                    message: "El campo es requerido.",
                  },
                  minLength: {
                    value: 5,
                    message: "Minimo 6 caracteres",
                  },
                })}
              />
              <p className="tipo">Debe ser tipo embebido.</p>
              {errors.trailer && (
                <span className="mensaje-error">{errors.trailer.message}</span>
              )}
            </div>
          </div>
          <div className="editar-derecha col-12 col-sm-6 col-xl-4">
            <div className="item-input">
              <label htmlFor="imagenVertical">
                Imagen vertical <i className="fas fa-arrows-alt-v"></i>
              </label>
              <input
                type="url"
                id="imagenVertical"
                {...register("imagenVertical", {
                  required: {
                    value: true,
                    message: "El campo es requerido.",
                  },
                })}
              />
              {errors.imagenVertical && (
                <span className="mensaje-error">
                  {errors.imagenVertical.message}
                </span>
              )}
            </div>
            <div className="item-input">
              <label htmlFor="imagenHorizontal">
                Imagen horizontal <i className="fas fa-arrows-alt-h"></i>
              </label>
              <input
                type="url"
                id="imagenHorizontal"
                {...register("imagenHorizontal", {
                  required: {
                    value: true,
                    message: "El campo es requerido.",
                  },
                })}
              />
              {errors.imagenHorizontal && (
                <span className="mensaje-error">
                  {errors.imagenHorizontal.message}
                </span>
              )}
            </div>
            <div className="item-input">
              <label htmlFor="genero">Género</label>
              <input
                type="text"
                id="genero"
                {...register("genero", {
                  required: {
                    value: true,
                    message: "El campo es requerido.",
                  },
                  minLength: {
                    value: 5,
                    message: "Minimo 6 caracteres.",
                  },
                })}
              />
              {errors.genero && (
                <span className="mensaje-error">{errors.genero.message}</span>
              )}
            </div>
            <div className="item-input">
              <div className="opcion-tipo">
                <label htmlFor="pelicula">¿Es una película?</label>
                <input
                  type="checkbox"
                  name="esPelicula"
                  id="pelicula"
                  {...register("esPelicula")}
                />
              </div>
            </div>
            <div className="item-input">
              <div className="opcion-destacada">
                <label htmlFor="destacada">¿Es destacada?</label>
                <input
                  type="checkbox"
                  name="destacada"
                  id="destacada"
                  {...register("destacada")}
                />
              </div>
            </div>
            <button type="submit" className="enviar-edicion">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
