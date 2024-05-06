import type { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent } from './select.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<SelectComponent> = {
  title: 'ISEN/Select',
  component: SelectComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SelectComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    options: [
      { value: '1', label: 'Test' },
      { value: '2', label: 'Test 2' },
    ],
  },
};
