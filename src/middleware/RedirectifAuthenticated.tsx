import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { IRootState } from '../store';

interface RedirectIfAuthenticatedProps {
    Component: React.ComponentType;
}

function RedirectIfAuthenticated({ Component }: RedirectIfAuthenticatedProps) {
    const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);
    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return <Component />;
}
export default RedirectIfAuthenticated;
