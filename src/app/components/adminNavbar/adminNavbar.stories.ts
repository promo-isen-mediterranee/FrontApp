import type { Meta, StoryObj } from '@storybook/angular';
import { AdminNavbarComponent } from "./adminNavbar.component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<AdminNavbarComponent> = {
  title: 'ISEN/AdminNavbar',
  component: AdminNavbarComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<AdminNavbarComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {

};

