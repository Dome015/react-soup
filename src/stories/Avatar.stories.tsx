import * as Soup from '../index';
export default { title: 'Components/Avatar', component: Soup.Avatar };

export const Basic = () => (<Soup.Inline><Soup.Avatar name="Ada Lovelace" /><Soup.Avatar name="Grace Hopper" /><Soup.Avatar name="Lin" /></Soup.Inline>);
export const MoreStates = () => (<Soup.Inline><Soup.Avatar name="Single" /><Soup.Avatar name="Long Team Name" /></Soup.Inline>);
