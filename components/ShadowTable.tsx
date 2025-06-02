import { VisuallyHidden } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useFilters, useTable } from 'react-table';
import Company from './Company';

const ShadowTable = ({ data, columns }) => {
  const [isRowSelected, setIsRowSelected] = useState(false);
  const tableData = useMemo(() => data, [data]);

  const getRowId = useCallback((row) => {
    return row.rowId;
  }, []);

  const tableInstance = useTable(
    {
      columns,
      data: tableData,
      getRowId,
    },
    useFilters
  );

  const router = useRouter();

  useEffect(() => {
    if (router.query.id && router.query.link) {
      const safeId = decodeURIComponent(router.query.id);
      setAllFilters([{ id: 'rowId', value: safeId }]);
      setIsRowSelected(true);
    } else {
      setIsRowSelected(false);
    }
  }, [router.query.id]);

  const { rows, setAllFilters } = tableInstance;

  return (
    <VisuallyHidden>
      {isRowSelected &&
        rows.map((row) => {
          if (row.values) {
            return (
              <Company
                key={row.values.company}
                name={row.values.company}
                values={row.values}
                forceOpen
              />
            );
          }
        })}
    </VisuallyHidden>
  );
};

export default ShadowTable;
