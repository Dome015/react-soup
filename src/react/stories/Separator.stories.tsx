import * as Soup from '../index';
export default { title: 'Components/Separator', component: Soup.Separator };

export const Basic = () => (<Soup.Stack><span>Overview</span><Soup.Separator /><span>Details</span></Soup.Stack>);
export const MoreStates = () => (<Soup.Inline><span>One</span><Soup.Separator orientation="vertical" /><span>Two</span></Soup.Inline>);
