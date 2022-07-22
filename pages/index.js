import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import Table from '../components/Table';

const fetcher = url => axios.get(url).then(res => res.data)

const App = () => {
  const initialDataState = new Array(25).fill({});

  const [data, setData] = useState(initialDataState);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isCacheMiss, setIsCacheMiss] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsCacheMiss(true), 1500);

    const getData = async () => {
      try {
        const { results, error } = await useSWR('/api/getEntries', fetcher);

        if (error) {
          throw Error('Something went wrong with SWR');
        }
        
        clearTimeout(timeout);
        const data = results.data.flat();
        setData(data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        clearTimeout(timeout);
        setIsError(true);
      }
    };

    getData();
  }, []);

  return (
      <Table data={data} isLoading={isLoading} isError={isError} isCacheMiss={isCacheMiss} />
  );
};

export default App;
