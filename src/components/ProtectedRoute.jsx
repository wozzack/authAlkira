import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { status } = useAuth();

  // fully-authenticated users may pass.
  if (status !== "authenticated") {
    return <Navigate to="/login" replace />;
  }

  // render whatever this route was protecting.
  return children;
}

export default ProtectedRoute;