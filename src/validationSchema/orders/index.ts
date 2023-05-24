import * as yup from 'yup';
import { orderItemsValidationSchema } from 'validationSchema/order-items';

export const ordersValidationSchema = yup.object().shape({
  status: yup.string().required(),
  special_instructions: yup.string(),
  contact_information: yup.string().required(),
  payment_information: yup.string().required(),
  customer_id: yup.string().nullable().required(),
  restaurant_id: yup.string().nullable().required(),
  order_items: yup.array().of(orderItemsValidationSchema),
});
