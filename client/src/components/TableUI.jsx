import { Skeleton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

const TableUI = ({ getTableProps, headerGroups, getTableBodyProps, page, prepareRow, setActiveCompany, isLoading }) => {
  const handleClick = (values) => {
    setActiveCompany(values);
  };

  return (
    <Table {...getTableProps()}>
      <Thead>
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
                      <Td {...cell.getCellProps()}>
                        <Skeleton isLoaded={!isLoading}>
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
