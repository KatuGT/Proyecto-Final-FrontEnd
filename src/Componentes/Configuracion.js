import Sidebar from "./Panel-Admin/Sidebar";
import { Outlet } from "react-router-dom";
import "../index.css";

export default function Configuracion() {
  return (
    <div>
      <div className="container-adminpanel">
        <Sidebar />
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
