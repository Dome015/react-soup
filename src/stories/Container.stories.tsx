import * as Soup from '../index';
export default { title: 'Components/Container', component: Soup.Container };

export const Basic = () => (<Soup.Container><Soup.Card><h1>Page content</h1></Soup.Card></Soup.Container>);
export const MoreStates = () => (<Soup.Container><Soup.Grid><Soup.Card>One</Soup.Card><Soup.Card>Two</Soup.Card></Soup.Grid></Soup.Container>);
