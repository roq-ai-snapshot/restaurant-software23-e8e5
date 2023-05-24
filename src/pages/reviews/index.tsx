import AppLayout from 'layout/app-layout';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getReviews } from 'apiSdk/reviews';
import { ReviewsInterface } from 'interfaces/reviews';
import { Error } from 'components/error';

function ReviewsListPage() {
  const { data, error, isLoading } = useSWR<ReviewsInterface[]>(() => true, getReviews);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Reviews
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Customer Id</Th>
                  <Th>Restaurant Id</Th>
                  <Th>Menu Item Id</Th>
                  <Th>Rating</Th>
                  <Th>Comment</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.customer_id}</Td>
                    <Td>{record.restaurant_id}</Td>
                    <Td>{record.menu_item_id}</Td>
                    <Td>{record.rating}</Td>
                    <Td>{record.comment}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default ReviewsListPage;
