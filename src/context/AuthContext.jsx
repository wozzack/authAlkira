import { createContext, useContext, useState } from "react";
import { mockUsers, MOCK_MFA_CODE } from "../data/mockUsers";

// 1. Create the context object — the "shared box" screens will read from.
const AuthContext = createContext();

// 2. The Provider component: holds the state and wraps the app.
export function AuthProvider({ children }) {
  // status is our three-state machine:
  // "unauthenticated" | "awaitingMfa" | "authenticated"
  const [status, setStatus] = useState("unauthenticated");
  const [user, setUser] = useState(null); // the logged-in user object, once known

  // Step 1: check email + password against mock users.
  function login(email, password) {
    const match = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (!match) {
      return { success: false, error: "Invalid email or password." };
    }
    setUser(match);          // remember who they are
    setStatus("awaitingMfa"); // move to the second state
    return { success: true };
  }

  // Step 2: check the MFA code.
  function verifyMfa(code) {
    if (code !== MOCK_MFA_CODE) {
      return { success: false, error: "Invalid code." };
    }
    setStatus("authenticated"); // move to the final state
    return { success: true };
  }

  // Reset everything (for logout).
  function logout() {
    setUser(null);
    setStatus("unauthenticated");
  }

  // 3. Everything we expose to the rest of the app.
  const value = { status, user, login, verifyMfa, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 4. A small custom hook so screens can grab auth state in one line.
export function useAuth() {
  return useContext(AuthContext);
}