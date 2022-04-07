import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const results = await axios.get('http://dev.thrillist.com:3002/api');
      const data = results.data.flat();
      setData(data);
    };

    getData();
  }, []);

  return <div className="">{data ? <Table data={data} /> : <p>Loading...</p>}</div>;
};

export default App;
