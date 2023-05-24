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
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createOrders } from 'apiSdk/orders';
import { Error } from 'components/error';
import { OrdersInterface } from 'interfaces/orders';
import { ordersValidationSchema } from 'validationSchema/orders';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { UsersInterface } from 'interfaces/users';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { getUsers } from 'apiSdk/users';
import { getRestaurants } from 'apiSdk/restaurants';

function OrdersCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: OrdersInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createOrders(values);
      resetForm();
      router.push('/orders');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<OrdersInterface>({
    initialValues: {
      status: '',
      special_instructions: '',
      contact_information: '',
      payment_information: '',
      customer_id: null,
      restaurant_id: null,
    },
    validationSchema: ordersValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Orders
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
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
      </Box>
    </AppLayout>
  );
}

export default OrdersCreatePage;
