import React, { useEffect, useState } from 'react';

const Table = ({ base }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    base('Sheet1')
      .select({
        view: 'Grid view',
      })
      .firstPage(function (err, records) {
        if (err) {
          console.error(err);
          return;
        }

        setData(records);
      });
  }, []);
  
  return <div></div>;
};

export default Table;
