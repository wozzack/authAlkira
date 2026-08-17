# Login + MFA

A small React app: log in, pass a mock MFA step, land on a protected screen
whose actions depend on your role. No backend as the users and the MFA code are
faked.

## Stack

- React + Vite
- React Router for moving between screens
- React Context for auth state (who's logged in, what step they're at, their role)
- Vitest + React Testing Library for tests

I skipped a component library and kept styling minimal on purpose, wanted the
time to go into the auth logic and structure, not CSS.

## Running it

Needs Node 18+.

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

Tests:

```bash
npm test
```

## Logging in

Two mock users live in `src/data/mockUsers.js`:

| Email             | Password    | Role       |
| ----------------- | ----------- | ---------- |
| alice@example.com | password | read-write |
| bob@example.com   | password | read-only  |

MFA code for both: **666666**

Log in, enter the code, and you're on the dashboard. Alice can edit; Bob can't (the edit button is hidden for him and save is disabled). Log out to switch users.

Worth poking at:
- Empty or malformed login fields → field errors
- Right format, wrong credentials → auth error
- Wrong MFA code → MFA error
- Type `/protected` in the URL while logged out → you get bounced to login

## How it's put together

src/
main.jsx entry wraps everything in Router + AuthProvider
App.jsx routes
context/AuthContext.jsx auth state + login / verifyMfa / logout
components/ProtectedRoute.jsx guard for authenticated-only routes
pages/ one file per screen
data/mockUsers.js fake users + MFA code
utils/validation.js login validation (pulled out so it's testable)

## Decisions worth explaining

The auth flow is basically a three-state thing: unauthenticated → awaiting MFA →
authenticated. Login moves you to the second state, a correct code to the third.
Writing it that way made the "who can see what" rules obvious.

All the auth state sits in one Context because three different screens need to
agree on it. There's a little `useAuth()` hook so screens grab it in one line.

I kept the logic and the UI apart: the context decides whether credentials/codes
are valid and owns the state; screens just handle display and error messages.
Validation got pulled into its own plain function so I could test it without
rendering anything.

`ProtectedRoute` is one wrapper instead of the same auth check copy-pasted into
every screen. It insists on the fully-authenticated state, so someone who logged
in but skipped MFA still gets redirected.

For roles I did both approaches the brief mentioned, edit is *hidden* for
read-only, Save is *disabled*. They're both fine; hiding is cleaner but disabling
lets the user see the action exists. Seemed worth showing I'd thought about the
difference.

Tests are focused rather than thorough on purpose; validation, role rendering,
and the route guard, since those are the parts most likely to break and the ones
the brief actually cares about.

## Assumptions

- Sign-up is a stub that goes to its own screen but doesn't create anything, the
  brief said full registration wasn't needed.
- Mock users + a fixed code stand in for a real auth backend.

## Known limitations

- No persistence: auth is in memory, so a refresh dumps you back to login. Real
  version would store a token and rehydrate on load.
- Not actually secure: Everything's checked client-side against hardcoded data;
  this is a demo of the flow, not real auth.
- Sign-up doesn't register anyone and its fields aren't validated.
- Login validates on submit, not as you type, validating on blur would be nicer.

