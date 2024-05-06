import type { Meta, StoryObj } from "@storybook/angular";
import { NavbarComponent } from "./navbar.component";

const meta: Meta<NavbarComponent> = {
  title: 'ISEN/Navbar',
  component: NavbarComponent,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<NavbarComponent> = {
  args: {

  }
};
