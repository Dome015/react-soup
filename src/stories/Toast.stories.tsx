import * as Soup from '../index';
function ToastDemo() { const {notify} = Soup.useToast(); return <Soup.Button onClick={() => notify({title:"Settings saved",tone:"success"})}>Show toast</Soup.Button>; }

export default { title: 'Components/Toast', component: Soup.Toast };

export const Basic = () => (<Soup.ToastProvider><ToastDemo /></Soup.ToastProvider>);
export const MoreStates = () => (<Soup.Toast id="preview" title="Could not save" description="Try again" tone="danger" onDismiss={() => {}} />);
