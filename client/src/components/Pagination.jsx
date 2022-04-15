import { Button, Flex, Grid, Select, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import React from 'react';

const Pagination = ({
  previousPage,
  nextPage,
  setPageSize,
  pageIndex,
  pageCount,
  pageSize,
  isPreviousPage,
  isNextPage,
}) => {
  return (
    <Flex color="black">
      <Grid autoFlow="column" alignItems="center" gap="10px">
        <Button size="sm" p="0.5rem" onClick={() => previousPage()} disabled={!isPreviousPage}>
          <ChevronLeftIcon w={6} h={6} />
        </Button>
        <Button size="sm" p="0.5rem" onClick={() => nextPage()} disabled={!isNextPage} mr="10px">
          <ChevronRightIcon w={6} h={6} />
        </Button>
        <Select
          id="pageSize"
          borderRadius="6px"
          value={pageSize}
          variant="filled"
          size="sm"
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[100, 50, 25].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
        <Text>
          Page {pageIndex + 1} of {pageCount}
        </Text>
      </Grid>
    </Flex>
  );
};

export default Pagination;
