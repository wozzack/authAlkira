import { useState } from "react";
import { Link } from "react-router-dom";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    // Stub: full registration is out of scope for this exercise.
    // In a real app this would call a backend to create the account.
    setSubmitted(true);
  }

  return (
    <div style={{ maxWidth: 320, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Sign Up</h1>

      {submitted ? (
        <p>
          Thanks for signing up! (This is a stub — no account was created.){" "}
          <Link to="/login">Back to login</Link>
        </p>
      ) : (
        <>
          <p>Create an account.</p>

          <div style={{ marginBottom: 12 }}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
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
          </div>

          <button onClick={handleSubmit}>Sign up</button>

          <p style={{ marginTop: 16 }}>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </>
      )}
    </div>
  );
}

export default SignUpPage;