import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage atau konteks global autentikasi

    // Periksa apakah token ada dan valid
    const isAuthenticated = !!token;

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
