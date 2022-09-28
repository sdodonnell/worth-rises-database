import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';

const headers = [
  { label: 'Company Name', key: 'company' },
  { label: 'Parent Company', key: 'parentName' },
  { label: 'Ownership Investor', key: 'owner' },
  { label: 'Stock Ticker', key: 'stock' },
  { label: 'Sectors', key: 'sectors' },
  { label: 'Subsectors', key: 'subsectors' },
  { label: 'Divestment Target?', key: 'divestment' },
  { label: 'Prison Labor Involvement', key: 'laborInvolvement' },
  { label: 'Detention Involvement', key: 'detentionInvolvement' },
  { label: 'Harm Score', key: 'harmScore' },
  { label: 'Salience', key: 'salience' },
  { label: 'Responsibility', key: 'responsibility' },
  { label: 'Responsiveness', key: 'responsiveness' },
  { label: 'Active?', key: 'active' },
  { label: 'Year Founded', key: 'yearFounded' },
  { label: 'Last Acquired', key: 'acquired' },
  { label: '# of Employees', key: 'employees' },
  { label: 'Prision Revenue Only?', key: 'revenueOnly' },
  { label: 'Capital Markets Exposure', key: 'exposure' },
  { label: 'Executive', key: 'executive' },
  { label: 'Revenues', key: 'revenues' },
  { label: 'Headquarters', key: 'state' },
  { label: 'Fiscal Year', key: 'fiscalYear' },
  { label: 'Political Spending', key: 'politicalSpending' },
  { label: 'Website', key: 'website' },
];

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
    <Button size="sm" colorScheme="brand" bgColor="#AE88EB">
      <CSVLink
        data={getData()}
        asyncOnClick={true}
        onClick={getUsers}
        filename="worth-rises-database.csv"
        headers={headers}
      >
        Download CSV
      </CSVLink>
    </Button>
  );
};

export default DownloadButton;
