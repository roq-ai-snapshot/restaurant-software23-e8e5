import AppLayout from 'layout/app-layout';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getOrders } from 'apiSdk/orders';
import { OrdersInterface } from 'interfaces/orders';
import { Error } from 'components/error';

function OrdersListPage() {
  const { data, error, isLoading } = useSWR<OrdersInterface[]>(() => true, getOrders);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Orders
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
                  <Th>Status</Th>
                  <Th>Special Instructions</Th>
                  <Th>Contact Information</Th>
                  <Th>Payment Information</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.customer_id}</Td>
                    <Td>{record.restaurant_id}</Td>
                    <Td>{record.status}</Td>
                    <Td>{record.special_instructions}</Td>
                    <Td>{record.contact_information}</Td>
                    <Td>{record.payment_information}</Td>
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
export default OrdersListPage;
