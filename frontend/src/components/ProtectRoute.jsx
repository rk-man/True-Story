import useAuthStatus from "../hooks/useAuthStatus";

import { Outlet, Navigate } from "react-router-dom";

function ProtectRoute() {
    const { loggedIn, checkingStatus } = useAuthStatus();

    if (checkingStatus) {
        return <h1>Checking...</h1>;
    }

    return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectRoute;
