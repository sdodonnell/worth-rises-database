import React, { useEffect, useMemo } from 'react';
import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
import { Box, Flex, Grid, GridItem, Heading, Image, Link, Text, useToast } from '@chakra-ui/react';
import TableUI from './TableUI';
import Pagination from './Pagination';
import DownloadButton from './DownloadButton';
import Company from './Company';
import Filters from './Filters';
import SectorTag from './SectorTag';
import { INTRO_TEXT } from './copyUtils';
import { useRouter } from 'next/router';
import SectorTagList from './SectorTagList';

const Table = ({ data, isLoading, isError, isCacheMiss }) => {
  // const filterArray = useCallback((rows, id, filterValue) => {
  //   if (!filterValue || !Array.isArray(filterValue) || filterValue.length === 0) {
  //     return rows;
  //   }

  //   return rows.filter((row) => {
  //     const rowValue = row.values[id];
  //     return filterValue.includes(rowValue);
  //   });
  // }, []);

  const router = useRouter();

  const handleModalOpen = (e, name, onOpen) => {
    onOpen(e);
    router.push(`/?id=${name}`, undefined, { shallow: true });
  };
  
  const handleModalClose = (e, onClose) => {
    onClose(e);
    router.push(`/`, undefined, { shallow: true });
  };

  const tableData = useMemo(() => data, [data]);
  const columns = useMemo(
    () => [
      {
        Header: 'Corporate Name',
        accessor: 'fld8eXd7ySetKd4X3',
        id: 'company',
        getHeaderProps: () => ({
          textAlign: 'center',
        }),
        Cell: ({ value, row: { values } }) => (
          <Company
            name={value?.trim() || '--'}
            values={values}
            handleModalClose={handleModalClose}
            handleModalOpen={handleModalOpen}
          />
        ),
      },
      {
        Header: 'Parent Company',
        accessor: 'fldw832i7sKHSioYO',
        id: 'parent',
        Cell: ({ value }) => <Box textAlign="center">{value ? String(value) : '--'}</Box>,
      },
      {
        Header: 'Major Investor',
        accessor: 'fldnf3TVZdV0HDlJL',
        id: 'owner',
        Cell: ({ value }) => <Box textAlign="center">{value ? String(value) : '--'}</Box>,
      },
      {
        Header: 'Stock Ticker',
        accessor: 'fldxUScw6juEHQ4Bn',
        id: 'stock',
        Cell: ({ value }) => <Box textAlign="center">{value ? String(value) : '--'}</Box>,
      },
      {
        accessor: 'fldjEW6owmKk8OMlX',
        id: 'primarySector',
        // filter: filterArray
      },
      {
        Header: 'Sector',
        accessor: 'fldTcs1OaGwdUsHiW',
        id: 'sectors',
        filter: 'arrIncludesAll',
        Cell: ({ value, setAllFilters }) => {
          return <SectorTagList sectors={value} setAllFilters={setAllFilters} />;
        },
      },
      {
        Header: 'Subsectors',
        accessor: 'fld2YdygbDUIbFxv4',
        id: 'subsector',
        // filter: filterArray,
        Cell: ({ value, setAllFilters }) => (
          <SectorTag sector={value} setAllFilters={setAllFilters} variant="secondary" />
        ),
      },
      {
        Header: 'Harm Score',
        accessor: 'fldvURpMuHYQno2Ov',
        id: 'harmScore',
        filter: 'between',
        Cell: ({ value }) => <Box textAlign="center">{value ? String(value) : '--'}</Box>,
      },
      {
        Header: 'Divestment Target',
        accessor: 'fldkvqcyO7SQLSWQD',
        id: 'divestment',
      },
      {
        Header: 'Prison Labor',
        accessor: 'fldwPeONqYRZGmZCi',
        id: 'laborInvolvement',
      },
      {
        Header: 'Immigration Detention',
        accessor: 'fldCwqMsXdV3icjcV',
        id: 'detentionInvolvement',
      },
      // Hidden columns; only necessary for company profile modal
      {
        accessor: 'fld0y2NV1JILitqDo',
        id: 'salience',
      },
      {
        accessor: 'fldy2XjDq3zdH2Lru',
        id: 'responsibility',
      },
      {
        accessor: 'fldxxAWkjIXDjaEVH',
        id: 'responsiveness',
      },
      {
        Header: 'Active?',
        accessor: 'fldsfpUZ0ffXdPWRn',
        id: 'active',
      },
      {
        accessor: 'fldtzfIjlWilLHerb',
        id: 'yearFounded',
      },
      {
        accessor: 'fldziq1j5ISHdl39I',
        id: 'acquired',
      },
      {
        accessor: 'fldxvbSVSA45rk6U0',
        id: 'employees',
      },
      {
        accessor: 'fldfq1uEOvvHPGtvV',
        id: 'revenueOnly',
      },
      {
        accessor: 'fldEheyoZ5BIhvxTg',
        id: 'exposure',
      },
      {
        accessor: 'fldNEb9oxXo2iRE7j',
        id: 'executive',
      },
      {
        accessor: 'flddJDntfysxbxzES',
        id: 'revenues',
      },
      {
        accessor: 'fldX8YGq5L0tj8pnW',
        id: 'state',
      },
      {
        accessor: 'fldO5boHTuMns429O',
        id: 'fiscalYear',
      },
      {
        accessor: 'fldost1x5rtMTzGgb',
        id: 'politicalSpending',
      },
      {
        accessor: 'fldj3HcrNuA52r2Wj',
        id: 'notes',
      },
      {
        accessor: 'fldUm9IdFDzIylngB',
        id: 'website',
      },
      {
        accessor: 'fldrWMXPLVrKTedlx',
        id: 'corrections',
      },
      {
        accessor: 'fld0ZQ2ffWfx9vP6e',
        id: 'detentionSource',
      },
      {
        accessor: 'fldH3cErjmanHljuM',
        id: 'laborSource',
      },
      {
        accessor: 'fldL5Uu9CFlIGLynB',
        id: 'financials',
      },
      {
        accessor: 'fldfd54TBvL7YnGL7',
        id: 'other',
      },
    ],
    []
  );

  // const getSubRows = useCallback((row) => {
  //   const parent = row['Parent Company'] || null;

  //   if (parent) {
  //     const ret = tableData.filter((el) => el['Company'] === parent);
  //     return ret;
  //   }

  //   return [];
  // }, []);

  const tableInstance = useTable(
    {
      columns,
      data: tableData,
      // getSubRows,
      initialState: {
        pageSize: 50,
        pageIndex: 0,
        hiddenColumns: [
          'acquired',
          'active',
          'corrections',
          'detentionInvolvement',
          'detentionSource',
          'divestment',
          'employees',
          'executive',
          'exposure',
          'financials',
          'fiscalYear',
          'laborInvolvement',
          'laborSource',
          'notes',
          'other',
          'politicalSpending',
          'primarySector',
          'responsibility',
          'responsiveness',
          'revenueOnly',
          'revenues',
          'salience',
          'state',
          'subsector',
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
        position: 'bottom-right',
      });
    } else {
      toast.closeAll();
    }
  }, [isCacheMiss, isLoading]);

  return (
    <Grid h="full" w="full" templateRows="80px calc(100vh - 80px)" templateColumns="300px 1fr">
      <GridItem
        colSpan={2}
        rowSpan={1}
        p="15px"
        borderBottom="1px solid"
        bgColor="normal.purple"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center" gap="20px">
          <Link href="https://worthrises.org" isExternal>
            <Image src="logo-white-vertical.png" ml="33px" w="55px" />
          </Link>
          <Flex flexDir="column">
            <Flex gap="10px">
              <Heading color="white" fontSize="22px">
                Prison Industry Database
              </Heading>
              <Heading color="white" fontSize="22px" fontWeight="light">
                Private Sector Players
              </Heading>
            </Flex>
            <Text color="white" fontSize="12px">
              The prison industry is a $80 billion industry with thousands of corporations. Here’s
              who they are.
            </Text>
          </Flex>
        </Flex>
        <DownloadButton rows={rows} />
      </GridItem>
      <GridItem
        colSpan={1}
        rowSpan={1}
        borderRight="2px"
        borderColor="soft.gray"
        bgColor="softer.gray"
        p="24px"
        overflowY="scroll"
        overflowX="hidden"
      >
        <Flex flexDir="column" gap="36px" overflow="hidden">
          <Box>
            <Text fontSize="sm" fontWeight="light">
              {INTRO_TEXT}
            </Text>
            <Link
              href="https://worthrises.org/theprisonindustry2020"
              isExternal
              textDecor="underline"
              fontWeight="bold"
              fontSize="sm"
              color="normal.purple"
            >
              See our methodology here.
            </Link>
          </Box>
          <Filters
            setGlobalFilter={setGlobalFilter}
            globalFilter={globalFilter}
            setAllFilters={setAllFilters}
            setSearchTerm={setGlobalFilter}
          />
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
        <Flex
          justify="flex-start"
          align="center"
          p="1rem"
          bgColor="softer.gray"
          color="white"
          h="50"
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
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default Table;
