import * as Soup from '../index';
export default { title: 'Components/Inline', component: Soup.Inline };

export const Basic = () => (<Soup.Inline><Soup.Button>Save</Soup.Button><Soup.Button variant="secondary">Cancel</Soup.Button></Soup.Inline>);
export const MoreStates = () => (<Soup.Inline justify="between"><strong>Projects</strong><Soup.Badge>12</Soup.Badge></Soup.Inline>);
