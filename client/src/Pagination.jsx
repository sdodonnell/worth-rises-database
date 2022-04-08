import React from 'react';

const Pagination = ({
  previousPage,
  nextPage,
  setPageSize,
  pageIndex,
  pageCount,
  pageSize,
  isPreviousPage,
  isNextPage,
}) => {
  return (
    <div className="pagination">
      <button onClick={() => previousPage()} disabled={!isPreviousPage}>
        {'<'}
      </button>
      <button onClick={() => nextPage()} disabled={!isNextPage}>
        {'>'}
      </button>
      <span>
        Page
        <strong>
          {pageIndex + 1} of {pageCount}
        </strong>
      </span>
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[25, 50, 100].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
