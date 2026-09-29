import * as Soup from '../../index';

export function PageHeaderExample() {
  return <Soup.Container><main className="soup-example-page"><Soup.Stack gap="lg">
    <header><Soup.Inline justify="between" align="end"><div><h1>Good morning, Ada.</h1><p className="soup-example-lead">Here is what is happening across your projects.</p></div><Soup.Inline><Soup.Button variant="secondary">Export report</Soup.Button><Soup.Button>New project</Soup.Button></Soup.Inline></Soup.Inline></header>
    <Soup.Separator /><Soup.Grid><Soup.Card><Soup.Stack gap="sm"><span className="soup-example-stat-label">Active projects</span><strong className="soup-example-stat">12</strong></Soup.Stack></Soup.Card><Soup.Card><Soup.Stack gap="sm"><span className="soup-example-stat-label">Tasks completed</span><strong className="soup-example-stat">84</strong></Soup.Stack></Soup.Card><Soup.Card><Soup.Stack gap="sm"><span className="soup-example-stat-label">Team members</span><strong className="soup-example-stat">8</strong></Soup.Stack></Soup.Card></Soup.Grid>
  </Soup.Stack></main></Soup.Container>;
}
