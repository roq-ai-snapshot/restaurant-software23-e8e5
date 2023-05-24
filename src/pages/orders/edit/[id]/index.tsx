import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getOrdersById, updateOrdersById } from 'apiSdk/orders';
import { Error } from 'components/error';
import { ordersValidationSchema } from 'validationSchema/orders';
import { OrdersInterface } from 'interfaces/orders';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { UsersInterface } from 'interfaces/users';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { getUsers } from 'apiSdk/users';
import { getRestaurants } from 'apiSdk/restaurants';

function OrdersEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<OrdersInterface>(id, getOrdersById);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: OrdersInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateOrdersById(id, values);
      mutate(updated);
      resetForm();
      router.push('/orders');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<OrdersInterface>({
    initialValues: data,
    validationSchema: ordersValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Orders
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="status" mb="4" isInvalid={!!formik.errors.status}>
              <FormLabel>Order Status</FormLabel>
              <Input type="text" name="status" value={formik.values.status} onChange={formik.handleChange} />
              {formik.errors.status && <FormErrorMessage>{formik.errors.status}</FormErrorMessage>}
            </FormControl>
            <FormControl id="special_instructions" mb="4" isInvalid={!!formik.errors.special_instructions}>
              <FormLabel>Special Instructions</FormLabel>
              <Input
                type="text"
                name="special_instructions"
                value={formik.values.special_instructions}
                onChange={formik.handleChange}
              />
              {formik.errors.special_instructions && (
                <FormErrorMessage>{formik.errors.special_instructions}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="contact_information" mb="4" isInvalid={!!formik.errors.contact_information}>
              <FormLabel>Contact Information</FormLabel>
              <Input
                type="text"
                name="contact_information"
                value={formik.values.contact_information}
                onChange={formik.handleChange}
              />
              {formik.errors.contact_information && (
                <FormErrorMessage>{formik.errors.contact_information}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="payment_information" mb="4" isInvalid={!!formik.errors.payment_information}>
              <FormLabel>Payment Information</FormLabel>
              <Input
                type="text"
                name="payment_information"
                value={formik.values.payment_information}
                onChange={formik.handleChange}
              />
              {formik.errors.payment_information && (
                <FormErrorMessage>{formik.errors.payment_information}</FormErrorMessage>
              )}
            </FormControl>
            <AsyncSelect<UsersInterface>
              formik={formik}
              name={'customer_id'}
              label={'Customer'}
              placeholder={'Select Users'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record.id}
                </option>
              )}
            />
            <AsyncSelect<RestaurantsInterface>
              formik={formik}
              name={'restaurant_id'}
              label={'Restaurant'}
              placeholder={'Select Restaurants'}
              fetcher={getRestaurants}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record.id}
                </option>
              )}
            />
            <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default OrdersEditPage;
