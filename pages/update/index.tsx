import React, { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import Table from '../../components/Table';
import WelcomeModal from '../../components/WelcomeModal';
import Head from 'next/head';

const fetcher = (url) => axios.get(url).then((res) => res.data);

function useEntries() {
  const { data, error } = useSWR('/api/getEntries', fetcher, {
    onLoadingSlow: () => setIsLoadingSlowly(true),
    shouldRetryOnError: false,
  });
  const [isLoadingSlowly, setIsLoadingSlowly] = useState(false);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    isLoadingSlowly,
  };
}

const AppUpdate = () => {
  const initialDataState = Array.from({ length: 25 }, (_, i) => ({ rowId: i }));

  const { data, isLoading, isError, isLoadingSlowly } = useEntries();

  if (isError) {
    console.log('Something went wrong.');
  }

  return (
    <>
      <Head>
        <title>Worth Rises Database</title>
      </Head>
      <WelcomeModal isFirstTime={false} />
      <Table
        data={data || initialDataState}
        isLoading={isLoading}
        isError={isError}
        isCacheMiss={isLoadingSlowly}
      />
    </>
  );
};

export default AppUpdate;
