import React, { useState } from 'react';
import Table from './Table';

const App = () => {
  const [data, setData] = useState(null);
 
  return <>{data ? <Table /> : <p>Loading...</p>}</>
}

export default App;
