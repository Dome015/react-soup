import * as Soup from '../index';

export default { title: 'Components/Progress', component: Soup.Progress };

export const Determinate = () => <Soup.Stack><Soup.Progress label="Uploading files" value={35} /><Soup.Progress label="Preparing report" value={3} max={4} /><Soup.Progress label="Complete" value={100} /></Soup.Stack>;
export const Indeterminate = () => <Soup.Progress label="Checking files" />;
export const WithoutVisibleValue = () => <Soup.Progress label="Reviewing records" value={7} max={10} showValue={false} />;
