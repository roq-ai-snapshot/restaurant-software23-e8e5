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
import { getReviewsById, updateReviewsById } from 'apiSdk/reviews';
import { Error } from 'components/error';
import { reviewsValidationSchema } from 'validationSchema/reviews';
import { ReviewsInterface } from 'interfaces/reviews';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { UsersInterface } from 'interfaces/users';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { MenuItemsInterface } from 'interfaces/menu-items';
import { getUsers } from 'apiSdk/users';
import { getRestaurants } from 'apiSdk/restaurants';
import { getMenuItems } from 'apiSdk/menu-items';

function ReviewsEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ReviewsInterface>(id, getReviewsById);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ReviewsInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateReviewsById(id, values);
      mutate(updated);
      resetForm();
      router.push('/reviews');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ReviewsInterface>({
    initialValues: data,
    validationSchema: reviewsValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Reviews
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default ReviewsEditPage;
