import React, { useMemo, useState } from 'react';
import { useTable, usePagination, useGlobalFilter, useFilters } from 'react-table';
import TableUI from './TableUI';
import Pagination from './Pagination';
import DownloadButton from './DownloadButton';
import Company from '../cells/Company';
import CompanyProfile from './CompanyProfile';
import Search from './Search';
import Filters from './Filters';

const Table = ({ data }) => {
  const tableData = useMemo(() => data, []);
  const columns = useMemo(
    () => [
      {
        Header: 'Company',
        accessor: 'Company',
        id: 'company',
        Cell: ({ value }) => <Company name={value} />,
      },
      {
        Header: 'State',
        accessor: 'Headquarters',
        id: 'state',
      },
      {
        Header: 'Primary Sector',
        accessor: 'Primary Sector',
        id: 'primarySector',
      },
      {
        Header: 'Active?',
        accessor: 'Active Brand (Y/N)',
        id: 'active',
        Cell: ({ value }) => value === 'Y' && '✓',
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
        Cell: ({ value }) => value && '✓',
      },
      {
        Header: 'Parent Public Exposure',
        accessor: 'Parent Public Exposure',
        id: 'exposure',
        // These values are prepended with identifiers like "Tier 1 - ", so slice these off
        Cell: ({ value }) => value.split('-').slice(1).join('-'),
      },
      // Hidden columns; only necessary for company profile
      {
        accessor: 'Lead Executive',
        id: 'executive',
      },
      {
        accessor: 'Parent Company',
        id: 'parent',
      },
    ],
    []
  );

  const tableInstance = useTable(
    { columns, data: tableData, initialState: { pageSize: 25, pageIndex: 0, hiddenColumns: ['executive', 'parent'] } },
    useGlobalFilter,
    useFilters,
    usePagination
  );

  const [activeCompany, setActiveCompany] = useState(null);

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

  return (
    <>
      <TableUI
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        getTableBodyProps={getTableBodyProps}
        page={page}
        prepareRow={prepareRow}
        setActiveCompany={setActiveCompany}
      />
      <Filters setGlobalFilter={setGlobalFilter} globalFilter={globalFilter} setAllFilters={setAllFilters} />
      <section className="flex justify-between items-center w-11/12 px-4 py-2 m-auto bg-slate-300 sticky bottom-0">
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
      </section>
      {activeCompany && <CompanyProfile data={activeCompany} setActiveCompany={setActiveCompany} />}
    </>
  );
};

export default Table;
