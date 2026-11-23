import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute() {
  const { currentAccount } = useAuth();

  if (!currentAccount) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}