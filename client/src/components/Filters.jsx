import React, { useState } from 'react';
import Search from './Search';
import ActiveSwitch from './filters/ActiveSwitch';
import StateSelect from './filters/StateSelect';

const Filters = ({ setGlobalFilter, globalFilter }) => {
  const [formData, setFormData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(globalFilter);

  const handleSubmit = e => {
    e.preventDefault();
    setGlobalFilter(searchTerm);
  }

  return (
    <div className="w-96 h-full absolute top-0 left-0 bg-slate-400 z-10">
      <h1>Company Search Filters</h1>
      <Search
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
      <form className="flex flex-col items-start" onSubmit={handleSubmit}>
        {/* <ActiveSwitch /> */}
        {/* <StateSelect /> */}
        <input type="submit" value="Set filters" />
      </form>
    </div>
  );
};

export default Filters;
