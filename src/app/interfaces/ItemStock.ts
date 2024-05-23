import { Item } from "./Item";
import { Location } from "./Location";

export interface ItemStock {
  id: number;
  item_id: Item;
  location_id: Location;
  quantity: number;
}
