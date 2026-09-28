import * as Soup from '../index';
export default { title: 'Components/Input', component: Soup.Input };

export const Basic = () => (<Soup.Stack><Soup.Field label="Email" htmlFor="input-email"><Soup.Input id="input-email" type="email" placeholder="name@example.com" /></Soup.Field><Soup.Field label="Search" htmlFor="input-search"><Soup.Input id="input-search" type="search" placeholder="Search projects" /></Soup.Field></Soup.Stack>);
export const MoreStates = () => (<Soup.Stack><Soup.Field label="Email" htmlFor="input-error" error="Enter a valid email"><Soup.Input id="input-error" aria-invalid="true" aria-describedby="input-error-error" /></Soup.Field><Soup.Field label="Managed ID" htmlFor="input-disabled"><Soup.Input id="input-disabled" value="Assigned automatically" disabled readOnly /></Soup.Field></Soup.Stack>);
