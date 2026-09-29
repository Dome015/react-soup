import * as Soup from '../index';
export default { title: 'Components/Alert', component: Soup.Alert };

export const Basic = () => (<Soup.Stack><Soup.Alert tone="info" title="Information">Your workspace is ready.</Soup.Alert><Soup.Alert tone="success" title="Saved">Settings were updated.</Soup.Alert></Soup.Stack>);
export const MoreStates = () => (<Soup.Stack><Soup.Alert tone="warning" title="Review required">Check the billing details.</Soup.Alert><Soup.Alert tone="danger" title="Could not save">Try again.</Soup.Alert></Soup.Stack>);
