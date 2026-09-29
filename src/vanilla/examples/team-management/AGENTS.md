# Team management: vanilla example

HTML states: MembersAndInvitations.html, NoPendingInvitations.html, PendingInvitations.html. Each page links `src/shared/styles/index.css` and `src/shared/styles/examples.css`. Vendor this directory with `src/shared` and the rest of `src/vanilla`.

## Pattern

Use peer `Tabs` for members and invitations. Label both tables, keep roles visible as text, and give each row action a person-specific label. An owner row has no role-change action. The invitation uses a dialog form with visible Field labels, native email validation, a role description, and an inline duplicate-email error linked to the input. The footer submit button targets the form by ID. A new invitation switches to the pending tab only after the local update succeeds. Revocation asks for confirmation and names the selected email address. Show a useful empty invitation state.

The example mutates local demo state. A host app should check authorization on the server, persist invitations and role changes, and display the success toast only after the operation completes. Copy the composition and accessibility pattern, then consult the relevant component `AGENTS.md` files for API details.

## Vanilla implementation

`example.ts` holds this page’s local state transitions; the standalone pages load its prebuilt `src/vanilla/dist/examples/team-management/example.js` after `dist/behavior.js`. The HTML states are the starting markup. Keep the page script tied to native forms, buttons, menu events, and DOM updates; do not instantiate styled native controls through a Soup API. In a host, replace local demo mutations with persistence and show success only after it succeeds.

Compare the same state and interaction with `src/react/examples/team-management/Example.tsx` in auto, light, and dark themes and at narrow width. See each component directory’s `AGENTS.md` for exact markup, ARIA, and event contracts.
