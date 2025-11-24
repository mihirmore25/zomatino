import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get("http://localhost:3000/api/auth/check", {
                    withCredentials: true,
                });
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                color: "var(--text)"
            }}>
                Loading...
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/user/login" />;
};

export default ProtectedRoute;
