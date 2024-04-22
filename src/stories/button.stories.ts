import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from "../app/components/button/button.component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ButtonComponent> = {
  title: 'ISEN/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    type: 'normal',
    label: 'Button',
  }
}
export const Primary: Story = {
  args: {
    type: 'primary',
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    label: 'Button',
  },
};

export const Tertiary: Story = {
  args: {
    type: 'tertiary',
    label: 'Button',
  }
}
