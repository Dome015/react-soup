import * as Soup from '../index';
export default { title: 'Components/Checkbox', component: Soup.Checkbox };

export const Basic = () => (<Soup.Stack><Soup.Checkbox label="Email updates" defaultChecked /><Soup.Checkbox label="Product research" /></Soup.Stack>);
export const MoreStates = () => (<Soup.Checkbox label="Unavailable option" disabled />);
