import "../../Estilos/Peliculas.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, Outlet } from "react-router-dom";

export default function Peliculas() {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 200,
      renderCell: (params) => {
        return (
          <figure className="pelicula-nombre">
            <img src={params.row.imagen} alt="imagen" />
            {params.row.nombre}
          </figure>
        );
      },
    },
    { field: "estreno", headerName: "Estreno", width: 100 },
    {
      field: "duracion",
      headerName: "Duracion",
      width: 130,
    },
    {
      field: "protagonistas",
      headerName: "Protagonistas",
      width: 160,
    },
    {
      field: "sinopsis",
      headerName: "Sinopsis",
      width: 160,
    },
    {
      field: "trailer",
      headerName: "Trailer",
      width: 160,
    },
    {
      field: "genero",
      headerName: "Genero",
      width: 160,
    },
    {
      field: "accion",
      headerName: "Acciones",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="acciones">
            <Link to={"pelicula/" + params.row.id}>
              <i class="fas fa-user-edit"></i>
            </Link>
            <i class="fas fa-trash-alt"></i>
          </div>
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      imagen: "https://picsum.photos/id/237/200/300",
      nombre: "Snow",
      estreno: "2021",
      duracion: "100min",
      protagonistas:
        "Leonardo Di Caprio,Leonardo Di Caprio,Leonardo Di Caprio,Leonardo Di Caprio,Leonardo Di Caprio",
      sinopsis: "loremasdadfrfgdgdfgrdgdfgd",
      trailer: "www.youtube.com",
      genero: "Romance",
    },
  ];
  return (
    <div className="lista-peliculas">
      <DataGrid
        className="dataGrid"
        disableSelectionOnClick
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      <button
        type="button"
        class="agregar-pelicula"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Agregar Pelicula
      </button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Ingrese los datos
              </h5>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form className="row">
                <div className="editar-izquierda col-6">
                  <div className="item-input">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                      type="text"
                      placeholder="titanic"
                      id="nombre"
                    ></input>
                  </div>
                  <div className="item-input">
                    <label htmlFor="estreno">Estreno</label>
                    <input type="text" placeholder="2021" id="estreno"></input>
                  </div>
                  <div className="item-input">
                    <label htmlFor="duracion">Duracion</label>
                    <input type="text" placeholder="2021" id="duracion"></input>
                  </div>
                  <div className="item-input">
                    <label htmlFor="protagonistas">Protagonistas</label>
                    <input
                      type="text"
                      placeholder="Leonardo Di Caprio"
                      id="protagonistas"
                    ></input>
                  </div>
                  <div className="item-input">
                    <label htmlFor="sinopsis">Sinopsis</label>
                    <input
                      type="text"
                      placeholder="bla bla"
                      id="sinopsis"
                    ></input>
                  </div>
                  <div className="item-input">
                    <label htmlFor="trailer">Trailer</label>
                    <input
                      type="url"
                      placeholder="Romance"
                      id="trailer"
                    ></input>
                  </div>
                </div>
                <div className="editar-derecha col-6">
                  <div className="item-input">
                    <label htmlFor="imagen">Imagen</label>
                    <input
                      type="url"
                      placeholder="https://picsum.photos/id/237/200/300"
                      id="imagen"
                    ></input>
                  </div>
                  <div className="item-input">
                    <label htmlFor="genero">Genero</label>
                    <input
                      type="text"
                      placeholder="Romance"
                      id="genero"
                    ></input>
                  </div>
                  <div className="item-input">
                    <div className="opcion-tipo">
                      <input
                        type="radio"
                        name="tipo"
                        required
                        id="pelicula"
                      ></input>
                      <label htmlFor="pelicula">Pelicula</label>
                    </div>
                    <div className="opcion-tipo">
                      <input
                        type="radio"
                        name="tipo"
                        required
                        id="serie"
                      ></input>
                      <label htmlFor="serie">Serie</label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
