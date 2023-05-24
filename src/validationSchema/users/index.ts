import * as yup from 'yup';
import { ordersValidationSchema } from 'validationSchema/orders';
import { restaurantsValidationSchema } from 'validationSchema/restaurants';
import { reviewsValidationSchema } from 'validationSchema/reviews';
import { staffMembersValidationSchema } from 'validationSchema/staff-members';

export const usersValidationSchema = yup.object().shape({
  role: yup.string().required(),
  contact_information: yup.string().required(),
  orders: yup.array().of(ordersValidationSchema),
  restaurants: yup.array().of(restaurantsValidationSchema),
  reviews: yup.array().of(reviewsValidationSchema),
  staff_members: yup.array().of(staffMembersValidationSchema),
});
