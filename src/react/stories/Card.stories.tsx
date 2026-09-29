import * as Soup from '../index';
export default { title: 'Components/Card', component: Soup.Card };

export const Basic = () => (<Soup.Grid><Soup.Card><h2>Projects</h2><p>12 active</p></Soup.Card><Soup.Card><h2>Members</h2><p>8 invited</p></Soup.Card></Soup.Grid>);
export const MoreStates = () => (<Soup.Card as="section"><h2>Plan</h2><p>Standard</p><Soup.Button variant="secondary">Manage</Soup.Button></Soup.Card>);
