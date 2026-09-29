import * as Soup from '../index';
export default { title: 'Components/IconButton', component: Soup.IconButton };

export const Basic = () => (<Soup.Inline><Soup.IconButton icon="plus" label="Add item" /><Soup.IconButton icon="edit" label="Edit item" variant="secondary" /><Soup.IconButton icon="trash" label="Delete item" variant="danger" /></Soup.Inline>);
export const MoreStates = () => (<Soup.IconButton icon="close" label="Close" disabled />);
