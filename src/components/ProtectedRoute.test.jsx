import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AuthContext } from "../context/AuthContext";

function renderAt(status) {
  const value = { status };
  render(
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/login" element={<h1>Login Screen</h1>} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <h1>Secret Content</h1>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe("ProtectedRoute", () => {
  it("redirects to login when not authenticated", () => {
    renderAt("unauthenticated");
    expect(screen.getByText("Login Screen")).toBeInTheDocument();
    expect(screen.queryByText("Secret Content")).not.toBeInTheDocument();
  });

  it("renders children when authenticated", () => {
    renderAt("authenticated");
    expect(screen.getByText("Secret Content")).toBeInTheDocument();
  });
});