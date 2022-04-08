import React, { useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import TableUI from './TableUI';
import Pagination from './Pagination';
import DownloadButton from './DownloadButton';
import Company from '../cells/Company';
import Modal from './Modal';

const Table = ({ data }) => {
  const tableData = useMemo(() => data, []);
  const columns = useMemo(
    () => [
      {
        Header: 'Company',
        accessor: 'Company',
        Cell: ({ value }) => <Company name={value} setActiveCompany={setActiveCompany} />,
      },
      {
        Header: 'State',
        accessor: 'Headquarters',
      },
      {
        Header: 'Primary Sector',
        accessor: 'Primary Sector',
      },
      {
        Header: 'Active?',
        accessor: 'Active Brand (Y/N)',
        Cell: ({ value }) => value === 'Y' && '✓',
      },
      {
        Header: 'Year Founded',
        accessor: 'Founded',
        Cell: ({ value }) => (value ? String(value) : '--'),
      },
      {
        Header: '# Employees',
        accessor: 'Employees',
        Cell: ({ value }) => (value ? Number(value) : '--'),
      },
      {
        Header: 'Prison Industry Revenue Only?',
        accessor: 'Prison Industry Revenue Only(Y/N)',
        Cell: ({ value }) => value && '✓',
      },
      {
        Header: 'Parent Public Exposure',
        accessor: 'Parent Public Exposure',
        // These values are prepended with identifiers like "Tier 1 - ", so slice these off
        Cell: ({ value }) => value.split('-').slice(1).join('-'),
      },
    ],
    []
  );

  const tableInstance = useTable(
    { columns, data: tableData, initialState: { pageSize: 25, pageIndex: 0 } },
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
    state: { pageIndex, pageSize },
  } = tableInstance;

  return (
    <>
      <TableUI
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        getTableBodyProps={getTableBodyProps}
        page={page}
        prepareRow={prepareRow}
      />
      <section className="flex justify-between items-center px-4 py-2 bg-slate-300">
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
      {activeCompany && <Modal name={activeCompany} setActiveCompany={setActiveCompany} />}
    </>
  );
};

export default Table;
