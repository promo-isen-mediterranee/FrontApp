import { ItemLocation } from './ItemLocation';
import { User } from './User';
import { Event } from './Event';

export interface ReservedItem {
  status: boolean;
  item_location: ItemLocation;
  event: Event;
  quantity: number;
  quantity_ret: number;
  reserved_on: Date;
  reserved_by: User;
}
