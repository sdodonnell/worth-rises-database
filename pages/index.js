import React, { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import Table from '../components/Table';
import WelcomeModal from '../components/WelcomeModal';
import Cookies from 'js-cookie';
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

const getVisitedCookie = () => {
  return !Cookies.get('wr_db_visited');
};

const setVisitedCookie = () => {
  Cookies.set('wr_db_visited', '1');
};

const App = () => {
  const initialDataState = Array.from({ length: 25 }, (_, i) => ({ rowId: i }));
  const isFirstTime = getVisitedCookie();

  const { data, isLoading, isError, isLoadingSlowly } = useEntries();

  if (isError) {
    console.log('Something went wrong.');
  }

  return (
    <>
      <Head>
        <title>Worth Rises Database</title>
      </Head>
      <WelcomeModal isFirstTime={isFirstTime} setVisitedCookie={setVisitedCookie} />
      <Table
        data={data || initialDataState}
        isLoading={isLoading}
        isError={isError}
        isCacheMiss={isLoadingSlowly}
      />
    </>
  );
};

export default App;
