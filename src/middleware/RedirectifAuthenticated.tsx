import React from "react";
import { Navigate } from "react-router-dom";

interface RedirectIfAuthenticatedProps {
  Component: React.ComponentType;
}

function RedirectIfAuthenticated({ Component }: RedirectIfAuthenticatedProps) {
  if (localStorage.getItem("token")) {
    return <Navigate to="/dashboard" />;
  }
  return <Component />;
}
export default RedirectIfAuthenticated;