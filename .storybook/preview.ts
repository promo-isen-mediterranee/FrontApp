import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

const customViewports = {
  laptop: {
    name: 'Laptop',
    styles: {
      width: '1024px',
      height: '1712px',
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '1156px',
    },
  },
  mobile: {
    name: 'Mobile',
    styles: {
      width: '425px',
      height: '856px',
    },
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    viewport: { viewports: customViewports },
  },

  tags: ['autodocs']
};

export default preview;
