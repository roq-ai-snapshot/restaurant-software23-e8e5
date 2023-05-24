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
import { createReviews } from 'apiSdk/reviews';
import { Error } from 'components/error';
import { ReviewsInterface } from 'interfaces/reviews';
import { reviewsValidationSchema } from 'validationSchema/reviews';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { UsersInterface } from 'interfaces/users';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { MenuItemsInterface } from 'interfaces/menu-items';
import { getUsers } from 'apiSdk/users';
import { getRestaurants } from 'apiSdk/restaurants';
import { getMenuItems } from 'apiSdk/menu-items';

function ReviewsCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ReviewsInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createReviews(values);
      resetForm();
      router.push('/reviews');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ReviewsInterface>({
    initialValues: {
      rating: 0,
      comment: '',
      customer_id: null,
      restaurant_id: null,
      menu_item_id: null,
    },
    validationSchema: reviewsValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Reviews
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="rating" mb="4" isInvalid={!!formik.errors.rating}>
            <FormLabel>Rating</FormLabel>
            <NumberInput
              name="rating"
              value={formik.values.rating}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('rating', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.rating && <FormErrorMessage>{formik.errors.rating}</FormErrorMessage>}
          </FormControl>
          <FormControl id="comment" mb="4" isInvalid={!!formik.errors.comment}>
            <FormLabel>Comment</FormLabel>
            <Input type="text" name="comment" value={formik.values.comment} onChange={formik.handleChange} />
            {formik.errors.comment && <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>}
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
          <AsyncSelect<MenuItemsInterface>
            formik={formik}
            name={'menu_item_id'}
            label={'Menu Item'}
            placeholder={'Select Menu Items'}
            fetcher={getMenuItems}
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

export default ReviewsCreatePage;
