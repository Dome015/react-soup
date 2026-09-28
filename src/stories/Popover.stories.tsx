import * as Soup from '../index';
export default { title: 'Components/Popover', component: Soup.Popover };

export const Basic = () => (<Soup.Popover trigger="Project details" label="Project details"><Soup.Stack gap="sm"><strong>Atlas</strong><span>Updated today</span></Soup.Stack></Soup.Popover>);
export const MoreStates = () => (<Soup.Popover trigger="Actions" align="end" label="Extra actions">{close => <Soup.Button onClick={close}>Done</Soup.Button>}</Soup.Popover>);
