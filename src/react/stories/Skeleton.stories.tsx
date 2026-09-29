import * as Soup from '../index';
export default { title: 'Components/Skeleton', component: Soup.Skeleton };

export const Basic = () => (<Soup.Stack><Soup.Skeleton shape="circle" /><Soup.Skeleton /><Soup.Skeleton shape="block" /></Soup.Stack>);
export const MoreStates = () => (<Soup.Card aria-label="Loading project"><Soup.Stack><Soup.Skeleton /><Soup.Skeleton shape="block" /></Soup.Stack></Soup.Card>);
