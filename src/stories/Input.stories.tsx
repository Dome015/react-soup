import * as Soup from '../index';
export default { title: 'Components/Input', component: Soup.Input };

export const Basic = () => (<Soup.Stack><Soup.Field label="Email" htmlFor="input-email"><Soup.Input id="input-email" type="email" placeholder="name@example.com" /></Soup.Field><Soup.Field label="Search" htmlFor="input-search"><Soup.Input id="input-search" type="search" placeholder="Search projects" /></Soup.Field></Soup.Stack>);
export const MoreStates = () => (<Soup.Stack><Soup.Field label="Email" htmlFor="input-error" error="Enter a valid email"><Soup.Input id="input-error" aria-invalid="true" aria-describedby="input-error-error" /></Soup.Field><Soup.Field label="Managed ID" htmlFor="input-disabled"><Soup.Input id="input-disabled" value="Assigned automatically" disabled readOnly /></Soup.Field></Soup.Stack>);
export const DateAndTime = () => (<Soup.Stack>
  <Soup.Field label="Due date" htmlFor="input-date" description="Choose a date in your local calendar"><Soup.Input id="input-date" type="date" defaultValue="2026-10-15" min="2026-10-01" max="2026-12-31" aria-describedby="input-date-description" /></Soup.Field>
  <Soup.Field label="Start time" htmlFor="input-time" description="Use your local time"><Soup.Input id="input-time" type="time" defaultValue="09:30" step={900} aria-describedby="input-time-description" /></Soup.Field>
  <Soup.Field label="Meeting date and time" htmlFor="input-datetime" description="Stored as local date and time; choose a timezone separately when needed"><Soup.Input id="input-datetime" type="datetime-local" defaultValue="2026-10-15T09:30" aria-describedby="input-datetime-description" /></Soup.Field>
</Soup.Stack>);
export const DateAndTimeStates = () => (<Soup.Stack>
  <Soup.Field label="Unavailable date" htmlFor="input-date-disabled"><Soup.Input id="input-date-disabled" type="date" defaultValue="2026-10-15" disabled /></Soup.Field>
  <Soup.Field label="Review time" htmlFor="input-time-error" error="Choose a time after 09:00"><Soup.Input id="input-time-error" type="time" defaultValue="08:30" min="09:00" aria-invalid="true" aria-describedby="input-time-error-error" /></Soup.Field>
</Soup.Stack>);
