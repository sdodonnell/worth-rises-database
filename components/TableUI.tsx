import { Skeleton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { memo } from 'react';

const TableUI = ({
  getTableProps,
  headerGroups,
  getTableBodyProps,
  page,
  prepareRow,
  isLoading,
  isError,
}) => {
  return (
    <Table {...getTableProps()} size="sm">
      <Thead pos="sticky" top="0" bgColor="soft.gray" boxShadow="sm">
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column, i) => (
                  // Apply the header cell props
                  <Th
                    whiteSpace="nowrap"
                    py="10px"
                    color="normal.gray"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    title="Sort by"
                    textAlign={i > 0 ? 'center' : 'left'}
                  >
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
                  row.cells.map((cell, i) => {
                    // Apply the cell props
                    return (
                      <Td
                        {...cell.getCellProps()}
                        w={cell.column.minWidth || null}
                        textAlign={i > 0 ? 'center' : 'left'}
                      >
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

export default memo(TableUI);
