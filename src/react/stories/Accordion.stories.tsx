import * as Soup from '../index';
export default { title: 'Components/Accordion', component: Soup.Accordion };

export const Basic = () => (<Soup.Accordion><Soup.AccordionItem title="What is included?">All core components and examples.</Soup.AccordionItem><Soup.AccordionItem title="Can I use dark mode?">Yes, via data-theme.</Soup.AccordionItem></Soup.Accordion>);
export const MoreStates = () => (<Soup.Accordion><Soup.AccordionItem title="Open by default" open>Visible content</Soup.AccordionItem></Soup.Accordion>);
