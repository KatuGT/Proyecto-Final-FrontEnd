import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "./Context/Context";

const useAut = () => {
    const { user } = useContext(Context);
    return user 
}

const RutasPrivadas = () => {
    const  isAut = useAut()
    return isAut ? <Outlet/> : <Navigate to="/" />
}

export default RutasPrivadas