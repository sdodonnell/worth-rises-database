import React, { useEffect, useMemo } from 'react';
import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
import { Box, Flex, Grid, GridItem, Image, Link, useToast } from '@chakra-ui/react';
import TableUI from './TableUI';
import Pagination from './Pagination';
import DownloadButton from './DownloadButton';
import Company from '../cells/Company';
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
        Cell: ({ value }) => <SectorTag sector={value} setAllFilters={setAllFilters} />,
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
        filter: 'between',
      },
      {
        Header: 'Involved in Immigration Detention',
        accessor: 'Immigration Detention Involvement',
        id: 'detentionInvolvement',
        Cell: ({ value }) => (value ? '✓' : ''),
      },
      {
        Header: 'Involved in Prison Labor',
        accessor: 'Supports Prison Labor',
        id: 'laborInvolvement',
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
        accessor: 'Founded',
        id: 'yearFounded',
      },
      {
        accessor: 'Last Acquired',
        id: 'acquired',
      },
      {
        accessor: 'Employees',
        id: 'employees',
      },
      {
        accessor: 'Prison Industry Revenue Only(Y/N)',
        id: 'revenueOnly',
      },
      {
        accessor: 'Parent Public Exposure',
        id: 'exposure',
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
      {
        accessor: 'Revenue Fiscal Year',
        id: 'fiscalYear',
      },
      {
        accessor: 'Political Spending (Cumalative Since 2010)',
        id: 'politicalSpending',
      },
      {
        accessor: 'Notes',
        id: 'notes',
      },
      {
        accessor: 'Website',
        id: 'website',
      },
      {
        accessor: 'Corrections',
        id: 'corrections',
      },
      {
        accessor: 'Immigration Detention',
        id: 'detention',
      },
      {
        accessor: 'Prison Labor',
        id: 'labor',
      },
      {
        accessor: 'Financials',
        id: 'financials',
      },
      {
        accessor: 'Other',
        id: 'other',
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
        hiddenColumns: [
          'acquired',
          'corrections',
          'detention',
          'employees',
          'executive',
          'exposure',
          'financials',
          'fiscalYear',
          'harmScore',
          'labor',
          'notes',
          'other',
          'politicalSpending',
          'revenueOnly',
          'revenues',
          'state',
          'website',
          'yearFounded',
        ],
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
    <Grid h="full" w="full" templateRows="60px calc(100vh - 110px) 50px" templateColumns="300px 1fr">
      <GridItem colSpan={3}>
        <Flex p="10px" gap="2rem" bgColor="purple.500" w="full">
          <Link href="https://worthrises.org" isExternal>
            <Image src="logo.png" h="40px" />
          </Link>
        </Flex>
      </GridItem>
      <GridItem borderRight="1px" borderColor="purple.400">
        <Filters
          setGlobalFilter={setGlobalFilter}
          globalFilter={globalFilter}
          setAllFilters={setAllFilters}
          setSearchTerm={setGlobalFilter}
          searchTerm={globalFilter}
        />
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
      <GridItem colSpan={3}>
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
