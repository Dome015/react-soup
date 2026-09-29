# Team management example

`Example.tsx` exports `TeamManagementExample`; Storybook exposes member, pending invitation, and no pending invitation states under `Examples/Team Management`.

## Pattern

Use peer `Tabs` for members and invitations. Label both tables, keep roles visible as text, and give each row action a person-specific label. An owner row has no role-change action. The invitation uses a dialog form with visible Field labels, native email validation, a role description, and an inline duplicate-email error linked to the input. The footer submit button targets the form by ID. A new invitation switches to the pending tab only after the local update succeeds. Revocation asks for confirmation and names the selected email address. Show a useful empty invitation state.

The example mutates local demo state. A host app should check authorization on the server, persist invitations and role changes, and display the success toast only after the operation completes. Copy the composition and accessibility pattern, then consult the relevant component `AGENTS.md` files for API details.
