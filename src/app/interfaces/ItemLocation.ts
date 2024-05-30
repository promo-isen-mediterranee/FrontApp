import { Item } from './Item';
import { Location } from './Location';

export interface ItemLocation {
  id: number;
  item_id: Item;
  location_id: Location;
  nb_to_order: number;
  quantity: number;
}
