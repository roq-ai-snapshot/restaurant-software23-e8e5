export interface ReviewsInterface {
  id?: string;
  customer_id: string;
  restaurant_id: string;
  menu_item_id?: string;
  rating: number;
  comment?: string;
}
