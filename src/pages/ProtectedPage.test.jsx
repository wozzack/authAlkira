import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProtectedPage from "./ProtectedPage";
import { AuthContext } from "../context/AuthContext";

// render ProtectedPage with a fake auth value for a given role
function renderWithRole(role) {
  const value = {
    user: { email: "test@example.com", role },
    logout: () => {},
  };
  render(
    <AuthContext.Provider value={value}>
      <BrowserRouter>
        <ProtectedPage />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

describe("ProtectedPage role-based rendering", () => {
  it("shows the Edit button for read-write users", () => {
    renderWithRole("read-write");
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("hides the Edit button for read-only users", () => {
    renderWithRole("read-only");
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
  });
});