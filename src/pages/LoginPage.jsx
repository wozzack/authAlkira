import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateLogin } from "../utils/validation";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // field-level validation errors
  const [authError, setAuthError] = useState(""); // wrong-credentials error

  const { login } = useAuth();
  const navigate = useNavigate();

  // Validate the fields. Returns an errors object (empty = all good).
  function validate() {
    const nextErrors = {};

    if (!email) {
      nextErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    return nextErrors;
  }

  function handleSubmit() {
    setAuthError(""); // clear any previous auth error

    const nextErrors = validateLogin(email, password);
    setErrors(nextErrors);

    // If there are any validation errors, stop here.
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // Fields are valid — try to log in via the context.
    const result = login(email, password);
    if (result.success) {
      navigate("/mfa"); // advance to the MFA screen
    } else {
      setAuthError(result.error); // e.g. "Invalid email or password."
    }
  }

  return (
    <div style={{ maxWidth: 320, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Login</h1>

      <div style={{ marginBottom: 12 }}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>

      {authError && <p style={{ color: "red" }}>{authError}</p>}

      <button onClick={handleSubmit}>Log in</button>

      <p style={{ marginTop: 16 }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default LoginPage;