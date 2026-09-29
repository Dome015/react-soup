import * as Soup from '../index';
export default { title: 'Components/Badge', component: Soup.Badge };

export const Basic = () => (<Soup.Inline><Soup.Badge>Draft</Soup.Badge><Soup.Badge tone="success">Active</Soup.Badge><Soup.Badge tone="warning">Pending</Soup.Badge><Soup.Badge tone="danger">Failed</Soup.Badge></Soup.Inline>);
export const MoreStates = () => (<Soup.Badge tone="info">New</Soup.Badge>);
