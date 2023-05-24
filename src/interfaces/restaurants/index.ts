import { MenuCategoriesInterface } from 'interfaces/menu-categories';
import { OrdersInterface } from 'interfaces/orders';
import { ReviewsInterface } from 'interfaces/reviews';
import { StaffMembersInterface } from 'interfaces/staff-members';

export interface RestaurantsInterface {
  id?: string;
  name: string;
  location: string;
  contact_information: string;
  operating_hours: string;
  owner_id: string;
  menu_categories?: MenuCategoriesInterface[];
  orders?: OrdersInterface[];
  reviews?: ReviewsInterface[];
  staff_members?: StaffMembersInterface[];
}
