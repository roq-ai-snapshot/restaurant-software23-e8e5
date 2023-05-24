import AppLayout from 'layout/app-layout';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getMenuCategories } from 'apiSdk/menu-categories';
import { MenuCategoriesInterface } from 'interfaces/menu-categories';
import { Error } from 'components/error';

function MenuCategoriesListPage() {
  const { data, error, isLoading } = useSWR<MenuCategoriesInterface[]>(() => true, getMenuCategories);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Menu Categories
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
                  <Th>Restaurant Id</Th>
                  <Th>Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.restaurant_id}</Td>
                    <Td>{record.name}</Td>
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
export default MenuCategoriesListPage;
