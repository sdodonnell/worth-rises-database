import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './components/Table';

const App = () => {
  const initialDataState = new Array(25).fill({});

  const [data, setData] = useState(initialDataState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const results = await axios.get('http://dev.thrillist.com:3002/api');
      const data = results.data.flat();
      setData(data);
      setIsLoading(false);
    };

    getData();
  }, []);

  return <Table data={data} isLoading={isLoading} />;
};

export default App;
