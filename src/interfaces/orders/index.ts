import { OrderItemsInterface } from 'interfaces/order-items';

export interface OrdersInterface {
  id?: string;
  customer_id: string;
  restaurant_id: string;
  status: string;
  special_instructions?: string;
  contact_information: string;
  payment_information: string;
  order_items?: OrderItemsInterface[];
}
