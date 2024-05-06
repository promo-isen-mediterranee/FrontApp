import type { Meta, StoryObj } from '@storybook/angular';
import { CalendarComponent } from "./calendar.component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<CalendarComponent> = {
  title: 'ISEN/Calendar',
  component: CalendarComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CalendarComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
  },
};
