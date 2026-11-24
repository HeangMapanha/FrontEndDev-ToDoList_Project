import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

export default function ProtectedRoute() {
  const { currentAccount } = useAuth();

  if (!currentAccount) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}