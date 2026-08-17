import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      {/* Temporary links, just to test navigation. We'll remove these. */}
      <nav>
        <Link to="/mfa">Go to MFA</Link> |{" "}
        <Link to="/signup">Go to Sign Up</Link> |{" "}
        <Link to="/protected">Go to Protected</Link>
      </nav>
    </div>
  );
}

export default LoginPage;