import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleComponent } from "./toggle.component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ToggleComponent> = {
  title: 'ISEN/Toggle',
  component: ToggleComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ToggleComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    items: [
      'item 1',
      'item 2',
      'item 3',
    ],
  },
};
