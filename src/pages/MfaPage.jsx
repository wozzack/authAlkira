import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function MfaPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const { status, verifyMfa } = useAuth();
  const navigate = useNavigate();

  // Guard: you shouldn't be on this screen unless you've passed step 1.
  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  function handleSubmit() {
    setError("");

    if (!code) {
      setError("Code is required.");
      return;
    }

    const result = verifyMfa(code);
    if (result.success) {
      navigate("/protected");
    } else {
      setError(result.error); // "Invalid code."
    }
  }

  return (
    <div style={{ maxWidth: 320, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Two-Factor Authentication</h1>
      <p>Enter the 6-digit code. (For this demo, use <strong>123456</strong>.)</p>

      <div style={{ marginBottom: 12 }}>
        <label>
          Code
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <button onClick={handleSubmit}>Verify</button>
    </div>
  );
}

export default MfaPage;