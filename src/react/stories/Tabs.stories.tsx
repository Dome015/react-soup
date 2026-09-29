import * as Soup from '../index';
export default { title: 'Components/Tabs', component: Soup.Tabs };

export const Basic = () => (<Soup.Tabs label="Project sections" tabs={[{id:"overview",label:"Overview",content:<p>Project overview</p>},{id:"activity",label:"Activity",content:<p>Recent activity</p>},{id:"settings",label:"Settings",content:<p>Project settings</p>}]} />);
export const MoreStates = () => (<Soup.Tabs label="Account" tabs={[{id:"profile",label:"Profile",content:<p>Profile</p>},{id:"billing",label:"Billing",disabled:true,content:<p>Billing</p>}]} />);
