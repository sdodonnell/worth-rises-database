import React, { useState } from 'react';
import { CSVLink } from 'react-csv';

const DownloadButton = ({ rows }) => {
  const [data, setData] = useState([]);

  const getUsers = (_, done) => {
    const csvData = rows.map((row) => {
      return row.values;
    });

    setData(csvData);
    done(true);
  };

  const getData = () => {
    return data;
  };

  return (
    <CSVLink
      className="border p-2"
      data={getData()}
      asyncOnClick={true}
      onClick={getUsers}
      filename="worth-rises-database.csv"
    >
      Download CSV
    </CSVLink>
  );
};

export default DownloadButton;
