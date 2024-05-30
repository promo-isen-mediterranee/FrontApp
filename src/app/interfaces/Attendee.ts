import { User } from "./User";
import { Event } from "./Event";

export interface Attendee {
  user: User;
  event: Event;
}
