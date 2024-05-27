import { ItemStock } from "./ItemStock";
import { User } from "./User";

export interface ReservedItem {
  status: boolean;
  item_location: ItemStock;
  event: Event;
  quantity: number;
  quantity_ret: number;
  reserved_on: Date;
  reserved_by: User;
}
