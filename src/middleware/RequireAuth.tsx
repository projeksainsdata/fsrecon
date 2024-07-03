import React from 'react';
import { Navigate } from 'react-router-dom';
import { IRootState } from '../store';
import { useSelector } from 'react-redux';

interface RequireAuthProps {
    Component: React.ComponentType;
}

function RequireAuth({ Component }: RequireAuthProps) {
    const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return <Component />;
}
export default RequireAuth;
