import * as Soup from '../../index';

export function EmptyStateExample() {
  return <Soup.Container><main className="soup-example-page"><Soup.Stack gap="lg">
    <header><h1>Collections</h1></header>
    <Soup.Card><div className="soup-example-empty"><Soup.Stack gap="md"><Soup.Icon name="folder" /><h2>A clear place to begin.</h2><p>Create a collection to organize related files and share them with your team.</p><Soup.Inline><Soup.Button>Create collection</Soup.Button><Soup.Link href="#learn-more">How collections work</Soup.Link></Soup.Inline></Soup.Stack></div></Soup.Card>
  </Soup.Stack></main></Soup.Container>;
}
