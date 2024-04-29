import type { Meta, StoryObj } from "@storybook/angular";
import { NavbarComponent } from "../app/components/navbar/navbar.component";

const meta: Meta<NavbarComponent> = {
  title: 'ISEN/Navbar',
  component: NavbarComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<NavbarComponent>;

export const Default: Story = {
  args: {
  },
};
