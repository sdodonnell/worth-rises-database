import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';

const headers = [
  { label: 'Name', key: 'company' },
  { label: 'Active', key: 'active' },
  { label: 'Year Founded', key: 'yearFounded' },
  { label: 'Year Last Acquired', key: 'acquired' },
  { label: 'Headquarters', key: 'state' },
  { label: 'Number of Employees', key: 'employees' },
  { label: 'Lead Executive', key: 'executive' },
  { label: 'Ownership Investor', key: 'owner' },
  { label: 'Parent Company/Companies', key: 'parentNames' },
  { label: 'Related Companies', key: 'childNames' },
  { label: 'Parent Public Exposure', key: 'exposure' },
  { label: 'Stock Ticker', key: 'stock' },
  { label: 'Sector(s)', key: 'sectors' },
  { label: 'Subsector(s)', key: 'subsectors' },
  { label: 'Prison Labor', key: 'laborInvolvement' },
  { label: 'Immigration Detention', key: 'detentionInvolvement' },
  { label: 'Harm Score', key: 'harmScore' },
  { label: 'Salience', key: 'salience' },
  { label: 'Responsibility', key: 'responsibility' },
  { label: 'Responsiveness', key: 'responsiveness' },
  { label: 'Divestment', key: 'divestment' },
  { label: 'Annual Revenues', key: 'revenues' },
  { label: 'Revenues Year', key: 'fiscalYear' },
  { label: 'Prision Industry Revenue Only', key: 'revenueOnly' },
  { label: 'Political Spending (Since 2010)', key: 'politicalSpending' },
  { label: 'Notes', key: 'notes' },
  { label: 'Website', key: 'website' },
  { label: 'Corrections Source', key: 'corrections' },
  { label: 'Prison Labor Source', key: 'laborSource' },
  { label: 'Immigration Detention Source', key: 'detentionSource' },
  { label: 'Financials Source', key: 'financials' },
  { label: 'Other Source', key: 'other' },
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
    <Button size="sm" colorScheme="brand" bgColor="rgb(174, 136, 235)" _hover={{ bgColor: 'rgba(174, 136, 235, 0.8)' }}>
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
