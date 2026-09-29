import * as Soup from '../index';
export default { title: 'Components/Container', component: Soup.Container };

export const Basic = () => (<Soup.Container><Soup.Stack gap="lg"><h1>Page content</h1><Soup.Card><h2>Section title</h2><p>Keep the page heading outside the card and use a section heading inside it.</p></Soup.Card></Soup.Stack></Soup.Container>);
export const MoreStates = () => (<Soup.Container><Soup.Grid><Soup.Card>One</Soup.Card><Soup.Card>Two</Soup.Card></Soup.Grid></Soup.Container>);
