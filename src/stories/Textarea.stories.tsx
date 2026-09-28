import * as Soup from '../index';
export default { title: 'Components/Textarea', component: Soup.Textarea };

export const Basic = () => (<Soup.Field label="Description" htmlFor="description"><Soup.Textarea id="description" placeholder="Write a short description" /></Soup.Field>);
export const MoreStates = () => (<Soup.Field label="Notes" htmlFor="notes" description="Visible only to your team"><Soup.Textarea id="notes" aria-describedby="notes-description" disabled value="Read only" /></Soup.Field>);
