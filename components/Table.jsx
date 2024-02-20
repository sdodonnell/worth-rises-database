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
  Button,
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
import * as IDS from '../utils';

const Table = ({ data, isLoading, isError, isCacheMiss }) => {
  const alphanumericSort = useCallback((rowA, rowB, id, desc) => {
    const a = rowA.values[id]?.toLowerCase();
    const b = rowB.values[id]?.toLowerCase();

    if (!a) {
      return desc ? -1 : 1;
    } else if (!b) {
      return desc ? 1 : -1;
    }

    return a.localeCompare(b);
  }, []);

  const alphanumericArraySort = useCallback((rowA, rowB, id, desc) => {
    const a = rowA.values[id]?.join(',').toLowerCase();
    const b = rowB.values[id]?.join(',').toLowerCase();

    if (!a) {
      return desc ? -1 : 1;
    } else if (!b) {
      return desc ? 1 : -1;
    }

    return a.localeCompare(b);
  }, []);

  const tableData = useMemo(() => data, [data]);
  const columns = useMemo(
    () => [
      {
        Header: 'Corporate Name',
        accessor: IDS.COMPANY_ID,
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
        accessor: IDS.PARENT_NAMES_ID,
        id: 'parentNames',
        Cell: ({
          value,
          row: {
            values: { parentRecords },
          },
        }) => <CompanyList companyNames={value} companyRecords={parentRecords} />,
        sortType: alphanumericArraySort,
      },
      {
        accessor: IDS.PARENT_RECORDS_ID,
        id: 'parentRecords',
      },
      {
        accessor: IDS.CHILD_RECORDS_ID,
        id: 'childRecords',
      },
      {
        accessor: IDS.CHILD_NAMES_ID,
        id: 'childNames',
      },
      {
        id: 'owner',
        accessor: IDS.OWNER_ID,
      },
      {
        id: 'investorRecords',
        accessor: IDS.INVESTOR_RECORDS_ID,
      },
      {
        Header: 'Ownership Investor',
        id: 'investorNames',
        accessor: IDS.INVESTOR_NAMES_ID,
        Cell: ({
          value,
          row: {
            values: { investorRecords },
          },
        }) => <CompanyList companyNames={value} companyRecords={investorRecords} />,
        sortType: alphanumericArraySort
      },
      {
        Header: 'Stock Ticker',
        accessor: IDS.STOCK_TICKER_ID,
        id: 'stock',
        Cell: ({ value }) => <Box textAlign="center">{value ? String(value) : '--'}</Box>,
        sortType: alphanumericSort,
      },
      {
        Header: 'Sector',
        accessor: IDS.SECTORS_ID,
        id: 'sectors',
        filter: 'includesSome',
        Cell: ({ value, setAllFilters }) => {
          return value ? <SectorTagList sectors={value} setAllFilters={setAllFilters} /> : '--';
        },
        sortType: alphanumericArraySort
      },
      {
        Header: 'Subsectors',
        accessor: IDS.SUBSECTORS_ID,
        id: 'subsectors',
        filter: 'includesSome',
      },
      {
        Header: 'Harm Score',
        accessor: IDS.HARM_SCORE_ID,
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
        accessor: IDS.DIVESTMENT_ID,
        id: 'divestment',
      },
      {
        Header: 'Prison Labor',
        accessor: IDS.LABOR_INVOLVEMENT_ID,
        id: 'laborInvolvement',
      },
      {
        Header: 'Immigration Detention',
        accessor: IDS.DETENTION_INVOLVEMENT_ID,
        id: 'detentionInvolvement',
      },
      // Hidden columns; only necessary for company profile modal
      {
        accessor: IDS.SALIENCE_ID,
        id: 'salience',
      },
      {
        accessor: IDS.RESPONSIBILITY_ID,
        id: 'responsibility',
      },
      {
        accessor: IDS.RESPONSIVENESS_ID,
        id: 'responsiveness',
      },
      {
        Header: 'Active?',
        accessor: IDS.ACTIVE_ID,
        id: 'active',
      },
      {
        accessor: IDS.YEAR_FOUNDED_ID,
        id: 'yearFounded',
      },
      {
        accessor: IDS.ACQUIRED_ID,
        id: 'acquired',
      },
      {
        accessor: IDS.EMPOLOYEES_ID,
        id: 'employees',
      },
      {
        accessor: IDS.REVENUE_ONLY_ID,
        id: 'revenueOnly',
      },
      {
        accessor: IDS.EXPOSURE_ID,
        id: 'exposure',
      },
      {
        accessor: IDS.EXECUTIVE_ID,
        id: 'executive',
      },
      {
        accessor: IDS.REVENUES_ID,
        id: 'revenues',
      },
      {
        accessor: IDS.STATE_ID,
        id: 'state',
      },
      {
        accessor: IDS.FISCAL_YEAR_ID,
        id: 'fiscalYear',
      },
      {
        accessor: IDS.POLITICAL_SPENDING_ID,
        id: 'politicalSpending',
      },
      {
        accessor: IDS.NOTES_ID,
        id: 'notes',
      },
      {
        accessor: IDS.WEBSITE_ID,
        id: 'website',
      },
      {
        accessor: IDS.CORRECTIONS_ID,
        id: 'corrections',
      },
      {
        accessor: IDS.DETENTION_SOURCE_ID,
        id: 'detentionSource',
      },
      {
        accessor: IDS.LABOR_SOURCE_ID,
        id: 'laborSource',
      },
      {
        accessor: IDS.FINANCIALS_ID,
        id: 'financials',
      },
      {
        accessor: IDS.OTHER_ID,
        id: 'other',
      },
      {
        accessor: IDS.ROWID_ID,
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
          'investorRecords',
          'laborInvolvement',
          'laborSource',
          'notes',
          'other',
          'owner',
          'parentRecords',
          'politicalSpending',
          'responsibility',
          'responsiveness',
          'revenueOnly',
          'revenues',
          'rowId',
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
          <Flex gap="20px">
            <Button
              size="sm"
              colorScheme="brand"
              bgColor="rgb(174, 136, 235)"
              _hover={{ bgColor: 'rgba(174, 136, 235, 0.8)' }}
            >
              <Link
                href="https://worthrises.org/submitacorporation"
                isExternal
                _hover={{ textDecor: 'none' }}
              >
                Submit a Corporation
              </Link>
            </Button>
            <DownloadButton rows={rows} />
          </Flex>
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
              <Text fontSize="sm" color="black">
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
