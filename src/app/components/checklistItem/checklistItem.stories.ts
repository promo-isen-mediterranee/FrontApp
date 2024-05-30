import type { Meta, StoryObj } from '@storybook/angular';
import { ChecklistItemComponent } from './ChecklistItem.component';

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
    items: [
      {
        item_location: {
          item_id: {
            id: 1,
            name: "Kakémono FISE",
            category_id: {
              id: 1,
              label: "Communication"
            }
          },
          quantity: 1,
          id: 0,
          location_id: {
            id: 1,
            room: "Bureau",
            city: "Toulon",
            address: "Place Georges"
          },
          nb_to_order: 0
        },
        status: true,
        event: {
          title: "Titre",
          start: "",
          end: ""
        },
        quantity: 0,
        quantity_ret: 0,
        reserved_on: new Date(),
        reserved_by: {
          id: 0,
          first_name: "",
          last_name: "",
          username: "",
          mail: "",
          is_active: true,
          is_authenticated: false
        }
      },
      {
        item_location: {
          item_id: {
            id: 1,
            name: "Brochure FISE",
            category_id: {
              id: 1,
              label: "Communication"
            }
          },
          quantity: 25,
          id: 0,
          location_id: {
            id: 1,
            room: "Bureau",
            city: "Toulon",
            address: "Place Georges"
          },
          nb_to_order: 0
        },
        status: false,
        event: {
          title: "Titre",
          start: "",
          end: ""
        },
        quantity: 0,
        quantity_ret: 0,
        reserved_on: new Date,
        reserved_by: {
          id: 0,
          first_name: "",
          last_name: "",
          username: "",
          mail: "",
          is_active: true,
          is_authenticated: false
        }
      }
    ],
  },
};
