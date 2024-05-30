import { Category } from './Category';

export interface Item {
  id: number;
  name: string;
  category_id: Category;
}
