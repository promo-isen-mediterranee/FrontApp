import { Status } from "./Status";
import { Person } from "./Person";
import { Location } from "./Location";

export interface EventFromAPI {
  id: number;
  name: string;
  stand_size: number;
  contact_objective: number;
  date_start: Date;
  date_end: Date;
  status: Status;
  item_manager: Person;
  location: Location;
}
