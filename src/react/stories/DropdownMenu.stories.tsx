import * as Soup from '../index';
export default { title: 'Components/DropdownMenu', component: Soup.DropdownMenu };

export const Basic = () => (<Soup.DropdownMenu label="Project actions" items={[{label:"Edit",icon:"edit",onSelect:()=>{}},{label:"Duplicate",icon:"plus",onSelect:()=>{}},{label:"Delete",icon:"trash",danger:true,onSelect:()=>{}}]} />);
export const MoreStates = () => (<Soup.DropdownMenu label="More" trigger={<Soup.Icon name="more" />} items={[{label:"Unavailable",disabled:true,onSelect:()=>{}}]} />);
