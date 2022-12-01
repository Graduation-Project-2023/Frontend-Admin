import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const LoginRoute = ({ allowedRoles }) => {
  const authContext = useAuth();
  const location = useLocation();

  return authContext.role === allowedRoles ? (
    <Outlet />
  ) : authContext.token ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
