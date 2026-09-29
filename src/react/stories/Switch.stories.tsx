import * as Soup from '../index';
export default { title: 'Components/Switch', component: Soup.Switch };

export const Basic = () => (<Soup.Stack><Soup.Switch label="Email notifications" defaultChecked /><Soup.Switch label="Public profile" /></Soup.Stack>);
export const MoreStates = () => (<Soup.Switch label="Managed by administrator" disabled checked readOnly />);
