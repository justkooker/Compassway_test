import React from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const isRegistered = !!localStorage.getItem("isRegistered");
  return isAuthenticated  ? (
    children
  ) : isRegistered ? (
    <Navigate to="/login" replace />
  ) : (
    <Navigate to="/register" replace />
  );
}

export default ProtectedRoute;
