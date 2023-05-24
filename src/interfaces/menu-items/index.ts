import { OrderItemsInterface } from 'interfaces/order-items';
import { ReviewsInterface } from 'interfaces/reviews';

export interface MenuItemsInterface {
  id?: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  order_items?: OrderItemsInterface[];
  reviews?: ReviewsInterface[];
}
