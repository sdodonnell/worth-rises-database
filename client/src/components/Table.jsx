import React, { useEffect, useMemo } from 'react';
import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
import { Box, Flex, Grid, GridItem, useToast } from '@chakra-ui/react';
import TableUI from './TableUI';
import Pagination from './Pagination';
import DownloadButton from './DownloadButton';
import Company from '../cells/Company';
import Search from './Search';
import Filters from './Filters';
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
        Header: 'Active?',
        accessor: 'Active Brand (Y/N)',
        id: 'active',
        Cell: ({ value }) => (value === 'Y' ? '✓' : ''),
      },
      {
        Header: 'Owner/Major Investor',
        accessor: 'Owner/Major Investor',
        id: 'owner',
        Cell: ({ value }) => (value ? String(value) : '--'),
      },
      {
        Header: 'Parent Company',
        accessor: 'Parent Company',
        id: 'parent',
        Cell: ({ value }) => (value ? String(value) : '--'),
      },
      {
        Header: 'Stock Ticker',
        accessor: 'Parent Stock Ticker',
        id: 'stock',
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
        Header: 'Sub-sector',
        accessor: 'Primary Sub-sector',
        id: 'subsector',
      },
      {
        Header: 'Harm Score',
        accessor: 'Harm Score',
        id: 'harmScore',
      },
      {
        Header: 'Involved in Immigration Detention',
        accessor: 'Immigration Detention Involvement',
        id: 'detention',
        Cell: ({ value }) => (value ? '✓' : ''),
      },
      {
        Header: 'Involved in Prison Labor',
        accessor: 'Supports Prison Labor',
        id: 'labor',
        Cell: ({ value }) => (value ? '✓' : ''),
      },
      {
        Header: 'Divestment',
        accessor: 'Divestment (Y/N)',
        id: 'divestment',
        Cell: ({ value }) => (value ? '✓' : ''),
      },
      // Hidden columns; only necessary for company profile modal
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
      {
        accessor: 'Lead Executive',
        id: 'executive',
      },
      {
        accessor: 'Annual Revenues (Mn) - original',
        id: 'revenues',
      },
      {
        accessor: 'Headquarters',
        id: 'state',
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: tableData,
      initialState: {
        pageSize: 50,
        pageIndex: 0,
        hiddenColumns: ['executive', 'harmScore', 'revenues', 'state', 'yearFounded', 'employees', 'exposure'],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
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
        description: 'Please try again or contact info@worthrises.org.',
        status: 'error',
        duration: 9000,
        position: 'top',
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isLoading && isCacheMiss) {
      toast({
        title: 'Loading database!',
        description: 'This may take a minute.',
        status: 'info',
        duration: null,
        position: 'top',
      });
    } else {
      toast.closeAll();
    }
  }, [isCacheMiss, isLoading]);

  return (
    <Grid h="full" w="full" templateRows="60px calc(100vh - 110px) 50px" templateColumns="300px auto">
      <GridItem rowSpan={3}>
        <Filters setGlobalFilter={setGlobalFilter} globalFilter={globalFilter} setAllFilters={setAllFilters} />
      </GridItem>
      <GridItem>
        <Flex p="10px" gap="1rem" bgColor="purple.100" justify="space-between" w="full">
          <Search setSearchTerm={setGlobalFilter} searchTerm={globalFilter} />
        </Flex>
      </GridItem>
      <GridItem overflow="scroll">
        <TableUI
          getTableProps={getTableProps}
          headerGroups={headerGroups}
          getTableBodyProps={getTableBodyProps}
          page={page}
          prepareRow={prepareRow}
          isLoading={isLoading}
          isError={isError}
        />
      </GridItem>
      <GridItem>
        <Flex justify="space-between" align="center" p="1rem" bgColor="purple.100" color="white" h="50">
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
      </GridItem>
    </Grid>
  );
};

export default Table;
