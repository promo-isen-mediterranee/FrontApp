import { User } from "./User";
import { Event } from "./Event";
import { EventStatus } from "./EventStatus";

export interface EventStatusHistory {
  id: number;
  set_on: Date;
  event: Event;
  status: EventStatus;
  set_by: User;
}
