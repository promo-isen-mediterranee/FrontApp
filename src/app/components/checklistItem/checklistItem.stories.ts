import type { Meta, StoryObj } from '@storybook/angular';
import { ChecklistItemComponent } from "./ChecklistItem.component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ChecklistItemComponent> = {
  title: 'ISEN/ChecklistItem',
  component: ChecklistItemComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ChecklistItemComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    items: [{
      name: 'Roll up Générique',
      quantity: 1,
      checked: true,
    }, {
      name: 'Brochures FISE',
      quantity: 25,
      checked: false,
    }]
  },
};
