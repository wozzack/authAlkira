# Login + MFA Authentication Exercise

A small React application demonstrating a login flow with multi-factor
authentication, form validation, and role-based access control. Built as a
take-home exercise. There is no backend — users and the MFA code are mocked.

## Technologies Used

- **React** (with Vite) — component-based UI and fast dev tooling.
- **React Router** (`react-router-dom`) — client-side routing between the
  login, MFA, sign-up, and protected screens.
- **React Context** — app-wide authentication state (who is logged in, which
  step of the flow they're on, and their role).
- **Vitest** + **React Testing Library** — unit and component tests.

No component/UI library was used; styling is minimal and inline, to keep the
focus on structure and behavior rather than visual polish.

## Setup / Install

Requires Node.js (v18 or later).

```bash
git clone <your-repo-url>
cd alkira-auth
npm install
```

## Running Locally

```bash
npm run dev
```

Then open the URL printed in the terminal (typically http://localhost:5173).

## Running Tests

```bash
npm test
```

## Mock Users & Roles

Two mock users are defined in `src/data/mockUsers.js`:

| Email               | Password      | Role         |
| ------------------- | ------------- | ------------ |
| alice@example.com   | password123   | read-write   |
| bob@example.com     | password123   | read-only    |

The mock MFA code (for either user) is: **123456**

## How to Test the Login / MFA Flow

1. Start the app (`npm run dev`) and go to the login screen.
2. Log in as **alice@example.com** / **password123** (read-write) or
   **bob@example.com** / **password123** (read-only).
3. On the MFA screen, enter the code **123456**.
4. You'll land on the protected dashboard.
   - As **Alice** (read-write): the "Edit" button is visible and "Save
     changes" is enabled.
   - As **Bob** (read-only): the "Edit" button is hidden and "Save changes"
     is disabled.
5. Use "Log out" to return to login and try the other user.

Things worth trying to see validation and access control:
- Submit the login form empty, or with a malformed email / short password, to
  see field-level error messages.
- Enter valid-format but incorrect credentials to see an authentication error.
- Enter a wrong MFA code to see the MFA error.
- While logged out, type `/protected` directly in the URL bar — you'll be
  redirected to login.

## Project Structure

src/
main.jsx App entry; wraps app in Router + AuthProvider
App.jsx Route definitions
context/AuthContext.jsx Auth state + login/verifyMfa/logout logic
components/ProtectedRoute.jsx Route guard for authenticated-only screens
pages/ One component per screen
LoginPage.jsx
MfaPage.jsx
SignUpPage.jsx
ProtectedPage.jsx
data/mockUsers.js Mock users and MFA code
utils/validation.js Pure login-validation logic

## Key Design Decisions

- **Authentication modeled as a three-state machine.** A user is
  `unauthenticated`, `awaitingMfa`, or `authenticated`. Login advances the
  first transition; a correct MFA code advances the second. This made the
  access rules explicit and easy to reason about.

- **Auth state lives in a single React Context.** The login, MFA, and
  protected screens all need to agree on the same auth facts, so that state is
  centralized rather than duplicated. A small `useAuth()` hook keeps access to
  it concise.

- **Logic separated from UI.** The context owns credential/MFA checking and
  state transitions; screens own display and validation messaging. Login
  validation was extracted into a pure function (`utils/validation.js`) so it
  can be tested in isolation without rendering.

- **A reusable `ProtectedRoute` wrapper** guards authenticated-only routes,
  rather than repeating the same auth check inside each screen. It requires the
  terminal `authenticated` state, so a user who has passed login but not MFA is
  also redirected.

- **Role-based access shown two ways.** On the protected screen, the "Edit"
  action is *hidden* for read-only users while the "Save" action is *disabled*.
  Both are valid approaches with a UX trade-off (hiding removes the option
  entirely; disabling keeps it discoverable), so both are demonstrated.

- **Testing was focused, not exhaustive.** Three areas carry the most risk and
  map directly to requirements: input validation, role-based rendering, and
  route protection. Each has a targeted test rather than chasing broad coverage.

## Assumptions

- Full user registration was out of scope per the brief, so sign-up is a
  navigable stub that does not create an account.
- Mock users and a fixed MFA code are acceptable stand-ins for a real
  authentication backend.

## Known Limitations

- **No session persistence.** Auth state is held in memory, so refreshing the
  browser returns the user to the login screen. A real app would persist a
  session token (e.g. in an httpOnly cookie) and restore state on load.
- **No real security.** Credentials and the MFA code are checked client-side
  against hardcoded mock data; this is for demonstration only and is not a
  secure auth implementation.
- **Sign-up is a stub** — it collects input but does not register a user.
- **Validation runs on submit**, not as the user types. Validating on blur or
  after the first submit attempt would be a reasonable UX improvement.
- **The sign-up fields are not validated**, since they are inert.