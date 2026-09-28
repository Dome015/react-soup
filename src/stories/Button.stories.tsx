import * as Soup from '../index';
export default { title: 'Components/Button', component: Soup.Button };

export const Basic = () => (<Soup.Inline><Soup.Button>Primary action</Soup.Button><Soup.Button variant="secondary">Secondary</Soup.Button><Soup.Button variant="ghost">Ghost</Soup.Button><Soup.Button variant="danger">Delete</Soup.Button></Soup.Inline>);
export const MoreStates = () => (<Soup.Inline><Soup.Button size="sm">Small</Soup.Button><Soup.Button size="lg">Large</Soup.Button><Soup.Button disabled>Disabled</Soup.Button></Soup.Inline>);
