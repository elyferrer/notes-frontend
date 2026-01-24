import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    const user = useSelector((state) => state.user);

    useEffect(() => {}, [user]);

    return (
        user.data ? 
            <Outlet /> :
            <Navigate to="/login" />
    )
}

export default PrivateRoutes
