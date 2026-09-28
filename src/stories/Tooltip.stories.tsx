import * as Soup from '../index';
export default { title: 'Components/Tooltip', component: Soup.Tooltip };

export const Basic = () => (<Soup.Tooltip content="Create a new project"><Soup.IconButton icon="plus" label="Create project" /></Soup.Tooltip>);
export const MoreStates = () => (<Soup.Tooltip content="Download a CSV"><Soup.Button variant="secondary">Export</Soup.Button></Soup.Tooltip>);
