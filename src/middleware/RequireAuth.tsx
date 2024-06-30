import React from "react";
import { Navigate } from "react-router-dom";

interface RequireAuthProps {
  Component: React.ComponentType;
}

function RequireAuth({ Component }: RequireAuthProps) {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }
  return <Component />;
}
export default RequireAuth;
