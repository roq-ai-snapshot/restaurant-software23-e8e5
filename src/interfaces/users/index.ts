import { OrdersInterface } from 'interfaces/orders';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { ReviewsInterface } from 'interfaces/reviews';
import { StaffMembersInterface } from 'interfaces/staff-members';

export interface UsersInterface {
  id?: string;
  role: string;
  contact_information: string;
  orders?: OrdersInterface[];
  restaurants?: RestaurantsInterface[];
  reviews?: ReviewsInterface[];
  staff_members?: StaffMembersInterface[];
}
