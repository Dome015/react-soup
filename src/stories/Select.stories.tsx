import * as Soup from '../index';
export default { title: 'Components/Select', component: Soup.Select };

export const Basic = () => (<Soup.Field label="Role" htmlFor="select-role"><Soup.Select id="select-role"><option>Viewer</option><option>Editor</option><option>Owner</option></Soup.Select></Soup.Field>);
export const MoreStates = () => (<Soup.Field label="Region" htmlFor="select-region"><Soup.Select id="select-region" disabled><option>Europe</option></Soup.Select></Soup.Field>);
