import React, { useCallback, useEffect, useMemo } from 'react';
import * as NextLink from 'next/link';
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useFilters,
  useSortBy,
  useRowSelect,
} from 'react-table';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Show,
  Text,
  useToast,
} from '@chakra-ui/react';
import TableUI from './TableUI';
import Pagination from './Pagination';
import DownloadButton from './DownloadButton';
import Company from './Company';
import Filters from './Filters';
import { HEADER_TEXT, INTRO_TEXT } from './utils/copyUtils';
import SectorTagList from './SectorTagList';
import FilterModal from './FilterModal';
import ShadowTable from './ShadowTable';
import CompanyList from './CompanyList';

const Table = ({ data, isLoading, isError, isCacheMiss }) => {
  const alphanumericSort = useCallback((rowA, rowB, id, desc) => {
    const a = rowA.values[id]?.toLowerCase();
    const b = rowB.values[id]?.toLowerCase();

    if (!a || !b || !id) {
      return;
    }

    return a.localeCompare(b);
  }, []);

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
          <Company name={value?.trim() || '--'} values={values} />
        ),
        sortType: alphanumericSort,
      },
      {
        Header: 'Parent Company',
        accessor: 'fldCHnO5AgJL6lOlP',
        id: 'parentNames',
        Cell: ({
          value,
          row: {
            values: { parentRecords },
          },
        }) => <CompanyList companyNames={value} companyRecords={parentRecords} />,
        disableSortBy: true,
      },
      {
        accessor: 'fldyzMDmZLns6BNxS',
        id: 'parentRecords',
      },
      {
        accessor: 'fldZGLF7h7Hq1B1Q2',
        id: 'childRecords',
      },
      {
        accessor: 'fldDFNClyvPGXieqQ',
        id: 'childNames',
      },
      {
        Header: 'Ownership Investor',
        accessor: 'fldnf3TVZdV0HDlJL',
        id: 'owner',
        Cell: ({ value }) => <Box textAlign="center">{value ? String(value) : '--'}</Box>,
        disableSortBy: true,
      },
      {
        Header: 'Stock Ticker',
        accessor: 'fldxUScw6juEHQ4Bn',
        id: 'stock',
        Cell: ({ value }) => <Box textAlign="center">{value ? String(value) : '--'}</Box>,
        disableSortBy: true,
      },
      {
        Header: 'Sector',
        accessor: 'fldTcs1OaGwdUsHiW',
        id: 'sectors',
        filter: 'includesSome',
        Cell: ({ value, setAllFilters }) => {
          return value ? <SectorTagList sectors={value} setAllFilters={setAllFilters} /> : '--';
        },
        disableSortBy: true,
      },
      {
        Header: 'Subsectors',
        accessor: 'fldH1GqbAoe33w0GK',
        id: 'subsectors',
        filter: 'includesSome',
      },
      {
        Header: 'Harm Score',
        accessor: 'fldvURpMuHYQno2Ov',
        id: 'harmScore',
        filter: 'includesValue',
        Cell: ({ value }) => (
          <Box textAlign="center" fontWeight="bold">
            {value ? String(value) : '--'}
          </Box>
        ),
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
      {
        accessor: 'rowId',
        id: 'rowId',
      },
    ],
    []
  );

  const getRowId = useCallback((row) => {
    return row.rowId;
  }, []);

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
          'childRecords',
          'childNames',
          'corrections',
          'detentionInvolvement',
          'detentionSource',
          'divestment',
          'employees',
          'executive',
          'exposure',
          'financials',
          'fiscalYear',
          'rowId',
          'laborInvolvement',
          'laborSource',
          'notes',
          'other',
          'parentRecords',
          'politicalSpending',
          'responsibility',
          'responsiveness',
          'revenueOnly',
          'revenues',
          'salience',
          'state',
          'subsectors',
          'website',
          'yearFounded',
        ],
        sortBy: [{ id: 'harmScore', desc: true }, { id: 'company' }],
      },
      getRowId,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect
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
    state: { pageIndex, pageSize },
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
    <Grid
      h="full"
      w="full"
      templateRows={['80px 80px calc(100vh - 160px)', '80px calc(100vh - 80px)']}
      templateColumns={['100%', '300px 1fr']}
    >
      <GridItem
        colSpan={[1, 2]}
        rowSpan={1}
        p="15px"
        borderBottom="1px solid"
        bgColor="normal.purple"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center" gap="28px">
          <Link href="https://worthrises.org" isExternal>
            <Image src="logo-white-vertical.png" ml="9px" w="55px" />
          </Link>
          <Flex flexDir="column">
            <Flex gap={['0', '10px']} flexDirection={['column', 'row']}>
              <Heading color="white" fontSize={['20px', '24px']}>
                The Prison Industry
              </Heading>
              <Heading color="white" fontSize={['20px', '24px']} fontWeight="light">
                Corporate Database
              </Heading>
            </Flex>
            <Show above="sm">
              <Text color="white" fontSize="14px">
                {HEADER_TEXT}
              </Text>
            </Show>
          </Flex>
        </Flex>
        <Show above="sm">
          <DownloadButton rows={rows} />
        </Show>
      </GridItem>
      <GridItem
        colSpan={1}
        rowSpan={1}
        borderRight="2px"
        borderColor="soft.gray"
        bgColor="softer.gray"
        p={['10px', '24px']}
        overflowY={['hidden', 'scroll']}
        overflowX="hidden"
      >
        <Show above="sm">
          <Flex flexDir="column" gap="36px" overflow="hidden">
            <Box>
              <Text fontSize="sm" fontWeight="light" color="black">
                {INTRO_TEXT}
              </Text>
              <Link
                href="https://worthrises.org/corpdata-methodology"
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
              setAllFilters={setAllFilters}
              setSearchTerm={setGlobalFilter}
              disableFilters={isLoading || isError}
            />
          </Flex>
        </Show>
        <Show below="md">
          <Flex overflow="hidden" gap="20px" alignItems="center">
            <Text fontSize="sm" fontWeight="light">
              {INTRO_TEXT}
            </Text>
            <FilterModal setAllFilters={setAllFilters} setSearchTerm={setGlobalFilter} />
          </Flex>
        </Show>
      </GridItem>
      <GridItem overflow="hidden" pb={['50px', '0']} _hover={{ overflow: 'scroll' }}>
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
          position={['fixed', 'relative']}
          bottom="0"
          width={['100%', 'auto']}
          justify="space-between"
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
          <Text color="black" fontSize="9px" w="230px" textAlign="right">
            <Link color="normal.green" fontWeight="bold" as={NextLink} href="/">
              Prison Industry Database: Private Sector Players
            </Link>{' '}
            © 2022 by{' '}
            <Link color="normal.green" fontWeight="bold" href="https://worthrises.org" isExternal>
              Worth Rises
            </Link>{' '}
            is licensed under{' '}
            <Link
              color="normal.green"
              fontWeight="bold"
              href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
              isExternal
            >
              CC BY-NC-SA 4.0​
            </Link>
          </Text>
        </Flex>
        <ShadowTable data={data} columns={columns} />
      </GridItem>
    </Grid>
  );
};

export default Table;
