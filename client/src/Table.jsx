import React, { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import TableUI from './TableUI';
import Pagination from './Pagination';
import DownloadButton from './DownloadButton';

const Table = ({ data }) => {
  const tableData = useMemo(() => data, []);
  const columns = useMemo(
    () => [
      {
        Header: 'Company',
        accessor: 'Company',
      },
      {
        Header: 'Headquarters',
        accessor: 'Headquarters',
      },
    ],
    []
  );

  const tableInstance = useTable(
    { columns, data: tableData, initialState: { pageSize: 25, pageIndex: 0 } },
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
    </>
  );
};

export default Table;
