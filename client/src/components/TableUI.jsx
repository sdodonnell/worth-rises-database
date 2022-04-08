import React from 'react';

const TableUI = ({ getTableProps, headerGroups, getTableBodyProps, page, prepareRow, setActiveCompany }) => {
  const handleClick = values => {
    setActiveCompany(values);
}

  return (
    <table {...getTableProps()} className="w-11/12 m-auto">
      <thead className="text-xs font-light bg-slate-300 uppercase text-left">
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()} className="py-2 px-1">
                    {
                      // Render the header
                      column.render('Header')
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          page.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr
                {...row.getRowProps()}
                onClick={() => handleClick(row.values)}
                className="group odd:bg-slate-100 hover:scale-105 hover:cursor-pointer transition-transform duration-200"
              >
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()} className="p-1">
                        {
                          // Render the cell contents
                          cell.render('Cell')
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

export default TableUI;
