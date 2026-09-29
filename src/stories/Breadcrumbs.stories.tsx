import * as Soup from '../index';

export default { title: 'Components/Breadcrumbs', component: Soup.Breadcrumbs };

export const Basic = () => <Soup.Stack><Soup.Breadcrumbs items={[{ label: 'Projects', href: '#projects' }, { label: 'Atlas', href: '#atlas' }]} current="Report" /><section id="projects"><h2>Projects</h2><p id="atlas">Atlas contains the report.</p></section></Soup.Stack>;
export const CurrentPageOnly = () => <Soup.Breadcrumbs items={[]} current="Dashboard" />;
export const LongPath = () => <Soup.Stack><Soup.Breadcrumbs items={[{ label: 'Workspace', href: '#workspace' }, { label: 'Projects', href: '#projects' }, { label: 'Atlas', href: '#atlas' }]} current="Quarterly report and supporting files" /><section id="workspace"><h2>Workspace</h2><p id="projects">Projects include <span id="atlas">Atlas</span>.</p></section></Soup.Stack>;
