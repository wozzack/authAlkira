import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MfaPage from "./pages/MfaPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedPage from "./pages/ProtectedPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/mfa" element={<MfaPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/protected" element={<ProtectedPage />} />
    </Routes>
  );
}

export default App;