import type { Preview } from '@storybook/react-vite';
import '../src/shared/styles/index.css';
import '../src/shared/styles/examples.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: { icon: 'circlehollow', items: ['auto', 'light', 'dark'], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: 'auto' },
  decorators: [
    (Story, context) => (
      <div data-theme={context.globals.theme} className="soup-story-surface">
        <div className={context.title.startsWith('Components/') ? 'soup-story-content' : undefined}><Story /></div>
      </div>
    ),
  ],
  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen',
    options: { storySort: { method: 'alphabetical', order: ['Components', 'Examples', 'Foundations'] } },
  },
};

export default preview;
