import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthRoutes: React.FC = () => {
    const token = localStorage.getItem("token");
    const location = useLocation(); // Get the current route

    if (token) {
        // If logged in, prevent access to login, signup, etc., and return to the last visited page
        return <Navigate to={location.state?.from || "/menu"} replace />;
    }

    return <Outlet />; // Render the public page if not logged in
};

export default AuthRoutes;
