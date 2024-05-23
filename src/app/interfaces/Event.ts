import { Person } from "./Person";
import { Location } from "./Location";
import { Status } from "./Status";

export interface Event {
  title: string;
  start: string;
  end: string;
  extendedProps?: {
    id?: number;
    contact_objective?: number;
    item_manager?: Person
    location?: Location;
    stand_size?: number;
    status?: Status;
  };
}
