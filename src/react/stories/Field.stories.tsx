import * as Soup from '../index';
export default { title: 'Components/Field', component: Soup.Field };

export const Basic = () => (<Soup.Field label="Project name" htmlFor="project-name" description="Shown to your team"><Soup.Input id="project-name" aria-describedby="project-name-description" /></Soup.Field>);
export const MoreStates = () => (<Soup.Field label="Slug" htmlFor="slug" error="This slug is taken"><Soup.Input id="slug" aria-invalid="true" aria-describedby="slug-error" /></Soup.Field>);
