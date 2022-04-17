import React, { useEffect, useMemo } from 'react';
import { useTable, usePagination, useGlobalFilter, useFilters } from 'react-table';
import TableUI from './TableUI';
import Pagination from './Pagination';
import DownloadButton from './DownloadButton';
import Company from '../cells/Company';
import Search from './Search';
import Filters from './Filters';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Modal, useToast } from '@chakra-ui/react';
import SectorTag from './SectorTag';

const Table = ({ data, isLoading, isError, isCacheMiss }) => {
  const tableData = useMemo(() => data, [data]);
  const columns = useMemo(
    () => [
      {
        Header: 'Company',
        accessor: 'Company',
        id: 'company',
        Cell: ({ value, row: { values } }) => <Company name={value || '--'} values={values} />,
      },
      {
        Header: 'State',
        accessor: 'Headquarters',
        id: 'state',
        Cell: ({ value }) => (value ? String(value) : '--'),
      },
      {
        Header: 'Primary Sector',
        accessor: 'Primary Sector',
        id: 'primarySector',
        Cell: ({ value }) => <SectorTag sector={value} />,
        minWidth: 230,
      },
      {
        Header: 'Active?',
        accessor: 'Active Brand (Y/N)',
        id: 'active',
        Cell: ({ value }) => (value === 'Y' ? '✓' : '--'),
      },
      {
        Header: 'Year Founded',
        accessor: 'Founded',
        id: 'yearFounded',
        Cell: ({ value }) => (value ? String(value) : '--'),
      },
      {
        Header: '# Employees',
        accessor: 'Employees',
        id: 'employees',
        Cell: ({ value }) => (value ? Number(value) : '--'),
      },
      {
        Header: 'Prison Industry Revenue Only?',
        accessor: 'Prison Industry Revenue Only(Y/N)',
        id: 'revenueOnly',
        Cell: ({ value }) => (value ? '✓' : '--'),
      },
      {
        Header: 'Parent Public Exposure',
        accessor: 'Parent Public Exposure',
        id: 'exposure',
        // These values are prepended with identifiers like "Tier 1 - ", so slice these off
        Cell: ({ value }) => (value ? value.split('-').slice(1).join('-') : '--'),
      },
      // Hidden columns; only necessary for company profile modal
      {
        accessor: 'Lead Executive',
        id: 'executive',
      },
      {
        accessor: 'Parent Company',
        id: 'parent',
      },
      {
        accessor: 'Harm Score',
        id: 'harmScore',
      },
      {
        accessor: 'Annual Revenues (Mn) - original',
        id: 'revenues',
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: tableData,
      initialState: { pageSize: 50, pageIndex: 0, hiddenColumns: ['executive', 'parent', 'harmScore', 'revenues'] },
    },
    useGlobalFilter,
    useFilters,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    setAllFilters,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  const toast = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Could not connect to database!',
        description: "Please try again or contact info@worthrises.org.",
        status: 'error',
        duration: 9000,
        position: 'top'
      })
    }
  }, [isError]);

  useEffect(() => {
    if (isLoading && isCacheMiss) {
      toast({
        title: 'Loading database!',
        description: "This may take a minute.",
        status: 'info',
        duration: null,
        position: 'top'
      })
    } else {
      toast.closeAll();
    }
  }, [isCacheMiss, isLoading]);

  return (
    <>
      <Flex p="10px" gap="1rem" bgColor="purple.100" justify="space-between" w="full">
        <Search setSearchTerm={setGlobalFilter} searchTerm={globalFilter} />
        <Filters setGlobalFilter={setGlobalFilter} globalFilter={globalFilter} setAllFilters={setAllFilters} />
      </Flex>
      <TableUI
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        getTableBodyProps={getTableBodyProps}
        page={page}
        prepareRow={prepareRow}
        isLoading={isLoading}
        isError={isError}
      />
      <Flex
        justify="space-between"
        align="center"
        p="1rem"
        bgColor="purple.100"
        color="white"
        h="50"
        pos="sticky"
        bottom="0"
      >
        <Pagination
          previousPage={previousPage}
          nextPage={nextPage}
          setPageSize={setPageSize}
          pageIndex={pageIndex}
          pageCount={pageCount}
          pageSize={pageSize}
          isPreviousPage={canPreviousPage}
          isNextPage={canNextPage}
        />
        <DownloadButton rows={rows} />
      </Flex>
    </>
  );
};

export default Table;
