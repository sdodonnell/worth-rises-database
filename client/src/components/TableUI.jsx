import { Skeleton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

const TableUI = ({ getTableProps, headerGroups, getTableBodyProps, page, prepareRow, isLoading, isError }) => {
  // if (isError) {
  //   return null;
  // }

  return (
    <Table {...getTableProps()}>
      <Thead pos="sticky" top="0" bgColor="white" boxShadow="sm">
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <Th {...column.getHeaderProps()}>
                    {
                      // Render the header
                      column.render('Header')
                    }
                  </Th>
                ))
              }
            </Tr>
          ))
        }
      </Thead>
      {/* Apply the table body props */}
      <Tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          page.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <Tr {...row.getRowProps()} _hover={{ bgColor: 'purple.50' }}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <Td {...cell.getCellProps()} w={cell.column.minWidth || null}>
                        <Skeleton isLoaded={!isLoading} speed={isError ? 0 : 0.8}>
                          {
                            // Render the cell contents
                            cell.render('Cell')
                          }
                        </Skeleton>
                      </Td>
                    );
                  })
                }
              </Tr>
            );
          })
        }
      </Tbody>
    </Table>
  );
};

export default TableUI;
