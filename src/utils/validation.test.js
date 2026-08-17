import { validateLogin } from "./validation";

describe("validateLogin", () => {
  it("flags a missing email", () => {
    const errors = validateLogin("", "password123");
    expect(errors.email).toBe("Email is required.");
  });

  it("flags a badly formatted email", () => {
    const errors = validateLogin("notanemail", "password123");
    expect(errors.email).toBe("Enter a valid email address.");
  });

  it("flags a too-short password", () => {
    const errors = validateLogin("alice@example.com", "123");
    expect(errors.password).toBe("Password must be at least 6 characters.");
  });

  it("returns no errors for valid input", () => {
    const errors = validateLogin("alice@example.com", "password123");
    expect(Object.keys(errors)).toHaveLength(0);
  });
});