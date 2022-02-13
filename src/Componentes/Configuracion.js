import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "../index.css";
import Navbar from "./Navbar/Navbar"

export default function Configuracion() {
  return (
    <div>
      <Navbar/>
      <div className="container-adminpanel">
        <Sidebar />
        <div className="outlet">
          <Outlet />         
        </div>
      </div>
    </div>
  );
}
