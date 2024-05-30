import { Person } from './Person';
import { Location } from './Location';
import { EventStatus } from "./EventStatus";

export interface EventFromAPI {
  id: number;
  name: string;
  stand_size: number;
  contact_objective: number;
  date_start: Date;
  date_end: Date;
  status: EventStatus;
  item_manager: Person;
  location: Location;
}
