import * as Soup from '../index';
export default { title: 'Components/FileTree', component: Soup.FileTree };

export const Basic = () => (<Soup.FileTree label="Files" nodes={[{id:"src",name:"src",kind:"folder",children:[{id:"app",name:"App.tsx",kind:"file"},{id:"styles",name:"styles.css",kind:"file"}]}]} selectedId="app" />);
export const MoreStates = () => (<Soup.FileTree label="Empty workspace" nodes={[]} />);
