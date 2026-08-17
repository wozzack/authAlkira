import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { status } = useAuth();

  // Only fully-authenticated users may pass.
  if (status !== "authenticated") {
    return <Navigate to="/login" replace />;
  }

  // Authenticated — render whatever this route was protecting.
  return children;
}

export default ProtectedRoute;