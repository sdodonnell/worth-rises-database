import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import Table from '../components/Table';

const fetcher = url => axios.get(url).then(res => res.data);

function useEntries () {
  const { data, error } = useSWR('/api/getEntries', fetcher, {onLoadingSlow: () => setIsLoadingSlowly(true), shouldRetryOnError: false});
  const [isLoadingSlowly, setIsLoadingSlowly] = useState(false);

  return {
    data: data?.flat(),
    isLoading: !error && !data,
    isError: error,
    isLoadingSlowly
  }
}

const App = () => {
  const initialDataState = new Array(25).fill({});

  const { data, isLoading, isError, isLoadingSlowly } = useEntries();

  if (isError) {
    console.log('Something went wrong.');
  }

  return (
      <Table data={data || initialDataState} isLoading={isLoading} isError={isError} isCacheMiss={isLoadingSlowly} />
  );
};

export default App;
