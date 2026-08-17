import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const canEdit = user.role === "read-write";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Protected Dashboard</h1>
      <p>
        Signed in as <strong>{user.email}</strong> — role:{" "}
        <strong>{user.role}</strong>
      </p>

      <ul>
        <li>Document A</li>
        <li>Document B</li>
        <li>Document C</li>
      </ul>

      {/* Role-based access control, two ways: */}

      {/* 1. Hidden entirely for read-only users */}
      {canEdit && <button>Edit</button>}

      {/* 2. Always visible, but disabled for read-only users */}
      <button disabled={!canEdit}>Save changes</button>

      {!canEdit && (
        <p style={{ color: "#666", marginTop: 8 }}>
          You have read-only access. Editing is disabled.
        </p>
      )}

      <hr style={{ margin: "24px 0" }} />
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default ProtectedPage;