import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';

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
        const results = await axios.get('/api');
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
    <ChakraProvider theme={theme}>
      <Table data={data} isLoading={isLoading} isError={isError} isCacheMiss={isCacheMiss} />;
    </ChakraProvider>
  );
};

export default App;