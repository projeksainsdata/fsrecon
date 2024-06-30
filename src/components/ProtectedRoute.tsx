import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { IRootState } from '../store';

const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
    const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);

    return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
