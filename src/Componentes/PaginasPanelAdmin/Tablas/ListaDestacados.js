import "./Tabla.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { FormControlLabel, Switch } from "@mui/material";
import Cargando from "../../../Imagenes/Cargando-icon.svg";

export default function ListasSeries({ Lista }) {
   //MOSTRAR LISTAS
  const [filmsDestacados, setFilmDestacados] = useState([]);

  const getFilmsDestacados = async () => {
    try {
      axios.get(`http://localhost:8800/api/films/`).then((response) => {
        setFilmDestacados(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFilmsDestacados();
  }, [Lista]);

  //FILTRAR LISTAR PARA MOSTRAR EN LA TABLA
  const [destacadas, setDestacadas] = useState([]);

  useEffect(() => {
    if (filmsDestacados) {
      setDestacadas(filmsDestacados.filter((film) => film.destacada === true));
    }
  }, [filmsDestacados]);

  const cardsDestacadas = destacadas.map((lista) => {
    const listaActual = {
      id: lista._id,
      nombre: lista.nombre,
      imagen: lista.imagenVertical,
    };
    return listaActual;
  });
  console.log(cardsDestacadas);
 

  //VALIDACIONES
   const {
     register,
     handleSubmit,
   } = useForm();

  async function actualizarDestacados(formData) {
    // await axios.post("/listafilms", formData);
    // getFilmsDestacados();
    //  toast.success("Nueva categoria creada!", {
    //    position: "bottom-center",
    //    style: { backgroundColor: "#2DFA6E", color: "#fff" },
    // });
    console.log(formData);
   
  }

  return (
    <div className="tabla-contenido">
      <div className="contenedor-info-destacados">
        <h2>Films destacados</h2>
        <p>Los films que ven aqui son los que se muestran en el slider de la pagina principal. Como maximo pueden seleccionar 8 films destacados.</p>
      </div>

      <form className="contenedor-film-destadas" onSubmit={handleSubmit(actualizarDestacados)}>
        {cardsDestacadas.map((destacada, index) => (
          <div className="card-film-destacado" key={index}>
            <img src={destacada?.imagen || Cargando} alt="Film Destacado" />
            <div className="datos-film-destacado">
              <h4>{destacada?.nombre}</h4>
              <FormControlLabel
                control={<Switch defaultChecked />}
                value="true"
                label="Destacada"
                {...register("destacada")}
              />
            </div>
          </div>
        ))}
        <button type="submit">Enviar</button>
      </form>
      <Toaster />
    </div>
  );
}
