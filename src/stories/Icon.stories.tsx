import * as Soup from '../index';
export default { title: 'Components/Icon', component: Soup.Icon };

export const Basic = () => (<Soup.Inline>{(["plus","search","folder","trash","check"] as const).map(name => <Soup.Icon key={name} name={name} />)}</Soup.Inline>);
export const MoreStates = () => (<Soup.Icon name="info" />);
