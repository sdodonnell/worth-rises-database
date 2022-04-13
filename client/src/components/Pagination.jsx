import { Button, Flex, FormLabel, Select, Text } from '@chakra-ui/react';
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
      <Button onClick={() => previousPage()} disabled={!isPreviousPage}>
        <ChevronLeftIcon w={6} h={6}/>
      </Button>
      <Button onClick={() => nextPage()} disabled={!isNextPage}>
        <ChevronRightIcon w={6} h={6}/>
      </Button>
      <Text>
        Page {pageIndex + 1} of {pageCount}
      </Text>
      <Select
        id="pageSize"
        value={pageSize}
        borderColor="black"
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
    </Flex>
  );
};

export default Pagination;
