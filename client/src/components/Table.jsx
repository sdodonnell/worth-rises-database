import React, { useEffect, useMemo } from 'react';
import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
import { Box, Flex, Grid, GridItem, Heading, Image, Link, Text, useToast } from '@chakra-ui/react';
import TableUI from './TableUI';
import Pagination from './Pagination';
import DownloadButton from './DownloadButton';
import Company from './Company';
import Filters from './Filters';
import SectorTag from './SectorTag';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const Table = ({ data, isLoading, isError, isCacheMiss }) => {
  const tableData = useMemo(() => data, [data]);
  const columns = useMemo(
    () => [
      {
        Header: 'Corporate Name',
        accessor: 'Company',
        id: 'company',
        Cell: ({ value, row: { values } }) => <Company name={value || '--'} values={values} />,
      },
      {
        Header: 'Parent Company',
        accessor: 'Parent Company',
        id: 'parent',
        Cell: ({ value }) => (value ? String(value) : '--'),
      },
      {
        Header: 'Major Investor',
        accessor: 'Owner/Major Investor',
        id: 'owner',
        Cell: ({ value }) => (value ? String(value) : '--'),
      },
      {
        Header: 'Stock Ticker',
        accessor: 'Parent Stock Ticker',
        id: 'stock',
        Cell: ({ value }) => (value ? String(value) : '--'),
      },
      {
        Header: 'Sectors',
        accessor: 'Primary Sector',
        id: 'primarySector',
        Cell: ({ value }) => <SectorTag sector={value} setAllFilters={setAllFilters} variant="primary" />,
      },
      {
        Header: 'Subsectors',
        accessor: 'Primary Sub-sector',
        id: 'subsector',
        Cell: ({ value }) => <SectorTag sector={value} setAllFilters={setAllFilters} variant="secondary" />,
      },
      {
        Header: 'Harm Score',
        accessor: 'Harm Score',
        id: 'harmScore',
        filter: 'between',
        Cell: ({ value }) => (value ? String(value) : '--'),
      },
      {
        Header: 'Divestment Target',
        accessor: 'Divestment (Y/N)',
        id: 'divestment',
        Cell: ({ value }) => (
          <Box minHeight="16px" textAlign="center">
            {value ? '✓' : ''}
          </Box>
        ),
      },
      {
        Header: 'Prison Labor',
        accessor: 'Supports Prison Labor',
        id: 'laborInvolvement',
        Cell: ({ value }) => (
          <Box minHeight="16px" textAlign="center">
            {value ? '✓' : ''}
          </Box>
        ),
      },
      {
        Header: 'Immigration Detention',
        accessor: 'Immigration Detention Involvement',
        id: 'detentionInvolvement',
        Cell: ({ value }) => (
          <Box minHeight="16px" textAlign="center">
            {value ? '✓' : ''}
          </Box>
        ),
      },
      // Hidden columns; only necessary for company profile modal
      {
        Header: 'Active?',
        accessor: 'Active Brand (Y/N)',
        id: 'active',
      },
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
        id: 'detentionSource',
      },
      {
        accessor: 'Prison Labor',
        id: 'laborSource',
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
          'active',
          'corrections',
          'detentionSource',
          'employees',
          'executive',
          'exposure',
          'financials',
          'fiscalYear',
          'laborSource',
          'notes',
          'other',
          'politicalSpending',
          'revenueOnly',
          'revenues',
          'state',
          'website',
          'yearFounded',
        ],
        sortBy: [{ id: 'harmScore', desc: true }, { id: 'company' }],
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
        colorScheme: 'brand',
      });
    } else {
      toast.closeAll();
    }
  }, [isCacheMiss, isLoading]);

  return (
    <Grid h="full" w="full" templateRows="160px calc(100vh - 210px) 50px" templateColumns="300px 1fr">
      <GridItem colSpan={1} rowSpan={3} borderRight="1px" borderColor="purple.100">
        <Filters
          setGlobalFilter={setGlobalFilter}
          globalFilter={globalFilter}
          setAllFilters={setAllFilters}
          setSearchTerm={setGlobalFilter}
        />
      </GridItem>
      <GridItem colSpan={2} p="15px" borderBottom="1px solid" borderColor="purple.100">
        <Heading color="normal.purple">Prison Industry: Private Sector Players</Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </Text>
        <Link href="https://worthrises.org/theprisonindustry2020" isExternal>
          <Text fontWeight="bold" color="normal.gray">
            Methodology <ExternalLinkIcon />
          </Text>
        </Link>
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
      <GridItem colSpan={2} colStart={2}>
        <Flex justify="space-between" align="center" p="1rem" bgColor="brand.100" color="white" h="50">
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
