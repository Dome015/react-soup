import * as Soup from '../index';
export default { title: 'Components/Grid', component: Soup.Grid };

export const Basic = () => (<Soup.Grid><Soup.Card>One</Soup.Card><Soup.Card>Two</Soup.Card><Soup.Card>Three</Soup.Card></Soup.Grid>);
export const MoreStates = () => (<Soup.Grid gap="lg"><Soup.Card>Wide spacing</Soup.Card><Soup.Card>Wide spacing</Soup.Card></Soup.Grid>);
