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
    <div className="page">
      <div className="card">
        <h1>Sign in</h1>
        <p className="subtitle">Use your account to continue.</p>

        <div className="field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        {authError && <p className="form-error">{authError}</p>}

        <button className="btn" onClick={handleSubmit}>
          Sign in
        </button>

        <p className="link-row">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;