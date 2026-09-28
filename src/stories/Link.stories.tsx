import * as Soup from '../index';
export default { title: 'Components/Link', component: Soup.Link };

export const Basic = () => (<Soup.Inline><Soup.Link href="#destination">Standard link</Soup.Link><Soup.Link href="#destination" subtle>Subtle link</Soup.Link></Soup.Inline>);
export const MoreStates = () => (<p>Read the <Soup.Link href="#guide">usage guide</Soup.Link> for details.</p>);
