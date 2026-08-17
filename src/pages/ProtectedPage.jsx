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
    <div className="page">
      <div className="card card--wide">
        <h1>Dashboard</h1>
        <p className="meta">
          {user.email} &nbsp;·&nbsp; <span className="badge">{user.role}</span>
        </p>

        <ul className="doc-list">
          <li>Document A</li>
          <li>Document B</li>
          <li>Document C</li>
        </ul>

        <div className="actions">
          {canEdit && <button className="btn-secondary">Edit</button>}
          <button className="btn-secondary" disabled={!canEdit}>
            Save changes
          </button>
        </div>

        {!canEdit && (
          <p className="subtitle">Read-only access — editing is disabled.</p>
        )}

        <hr className="divider" />
        <button className="btn-secondary" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default ProtectedPage;