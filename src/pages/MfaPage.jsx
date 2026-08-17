import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function MfaPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const { status, verifyMfa } = useAuth();
  const navigate = useNavigate();

  // you shouldn't be on this screen unless you've passed step 1.
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
    <div className="page">
      <div className="card">
        <h1>Verification</h1>
        <p className="subtitle">
          Enter the 6-digit code. For this demo, use 123456.
        </p>

        <div className="field">
          <label>Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
        </div>

        <button className="btn" onClick={handleSubmit}>
          Verify
        </button>
      </div>
    </div>
  );
}

export default MfaPage;