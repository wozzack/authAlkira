import { useState } from "react";
import { Link } from "react-router-dom";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    // full registration is out of scope for this exercise.
    setSubmitted(true);
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Create account</h1>

        {submitted ? (
          <>
            <p className="subtitle">
              Thanks for signing up. This is a stub — no account was created.
            </p>
            <p className="link-row">
              <Link to="/login">Back to sign in</Link>
            </p>
          </>
        ) : (
          <>
            <p className="subtitle">Sign up to get started.</p>

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn" onClick={handleSubmit}>
              Sign up
            </button>

            <p className="link-row">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default SignUpPage;