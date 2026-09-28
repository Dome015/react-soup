import * as Soup from '../index';
export default { title: 'Components/Radio', component: Soup.Radio };

export const Basic = () => (<Soup.Stack><Soup.Radio name="billing" value="monthly" label="Monthly" defaultChecked /><Soup.Radio name="billing" value="yearly" label="Yearly" /></Soup.Stack>);
export const MoreStates = () => (<Soup.Radio name="example-disabled" label="Unavailable" disabled />);
