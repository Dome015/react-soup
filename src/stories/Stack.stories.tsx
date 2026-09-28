import * as Soup from '../index';
export default { title: 'Components/Stack', component: Soup.Stack };

export const Basic = () => (<Soup.Stack><Soup.Card>First</Soup.Card><Soup.Card>Second</Soup.Card></Soup.Stack>);
export const MoreStates = () => (<Soup.Stack gap="lg"><Soup.Card>Spacious</Soup.Card><Soup.Card>Spacious</Soup.Card></Soup.Stack>);
