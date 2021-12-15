import "../../Estilos/UsuariosLista.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, Outlet } from "react-router-dom";

export default function UsuariosLista() {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "apodo",
      headerName: "Apodo",
      width: 200,
      renderCell: (params) => {
        return (
          <figure className="user-apodo">
            <img src={params.row.avatar} alt="avatar" />
            {params.row.apodo}
          </figure>
        );
      },
    },
    { field: "email", headerName: "E-mail", width: 200 },
    {
      field: "rol",
      headerName: "Rol",
      width: 130,
    },
    {
      field: "contrasenia",
      headerName: "Contraseña",
      width: 160,
    },

    {
      field: "accion",
      headerName: "Acciones",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="acciones">
            <Link to={"user/" + params.row.id}>
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
      avatar: "https://picsum.photos/id/237/200/300",
      apodo: "Snow",
      email: "1234@gmail.com",
      rol: "usuario comun",
      contrasenia: "sdfvzdsdfs",
    },
  ];
  return (
    <>
      <div className="UsuariosLista">
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
          class="agregar-usuario"
          data-bs-toggle="modal"
          data-bs-target="#agregarUsuarioModal"
        >
          Crear usuario
        </button>
        <div
          class="modal fade"
          id="agregarUsuarioModal"
          tabindex="-1"
          aria-labelledby="agregarUsuarioModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog ">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="agregarUsuarioModalLabel">
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
                <form className="formulario-editar row">
                  <div className="editar-izquierda col-6">
                    <div className="item-input">
                      <label htmlFor="apodo">Apodo</label>
                      <input type="text" placeholder="Teito" id="apodo"></input>
                    </div>
                    <div className="item-input">
                      <label htmlFor="email">E-mail</label>
                      <input
                        type="text"
                        placeholder="123@gmail.com"
                        id="email"
                      ></input>
                    </div>
                    <div className="item-input">
                      <label htmlFor="contrasenia">Contraseña</label>
                      <input
                        type="text"
                        placeholder="2132155"
                        id="contrasenia"
                      ></input>
                    </div>
                    
                  </div>
                  <div className="editar-derecha col-6">
                    <div className="item-input">
                      <label htmlFor="avatar">Avatar</label>
                      <input
                        type="url"
                        placeholder="https://picsum.photos/id/237/200/300"
                        id="avatar"
                      ></input>
                    </div>
                    <div className="item-input">
                      <div className="opcion-rol">
                        <input
                          type="radio"
                          name="rol"
                          required
                          id="usuario"
                        ></input>
                        <label htmlFor="usuario">Usuario</label>
                      </div>
                      <div className="opcion-rol">
                        <input
                          type="radio"
                          name="rol"
                          required
                          id="admin"
                        ></input>
                        <label htmlFor="admin">Admin</label>
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
    </>
  );
}
