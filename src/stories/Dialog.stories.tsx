import * as Soup from '../index';
import { useState } from 'react';
function DialogDemo() { const [open,setOpen] = useState(false); return <><Soup.Button onClick={() => setOpen(true)}>Open dialog</Soup.Button><Soup.Dialog open={open} onOpenChange={setOpen} title="Delete project" description="This cannot be undone" footer={<><Soup.Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Soup.Button><Soup.Button variant="danger" onClick={() => setOpen(false)}>Delete</Soup.Button></>}><p>Project files will be removed.</p></Soup.Dialog></>; }

export default { title: 'Components/Dialog', component: Soup.Dialog };

export const Basic = () => (<DialogDemo />);
export const MoreStates = () => (<Soup.Dialog open={false} onOpenChange={() => {}} title="Edit project"><Soup.Input aria-label="Project name" /></Soup.Dialog>);
