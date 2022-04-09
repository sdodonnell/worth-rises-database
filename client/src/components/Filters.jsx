import React, { useRef, useState } from 'react';
import Search from './Search';

const Filters = ({ setGlobalFilter, globalFilter, setAllFilters }) => {
  const [searchTerm, setSearchTerm] = useState(globalFilter);
  const [active, setActive] = useState(false);

  const filterForm = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // const formData = new FormData(filterForm.current);
    // const filters = Array.from(formData.entries()).map((pair) => ({
    //   id: pair[0],
    //   value: pair[1],
    // }));

    setGlobalFilter(searchTerm);
    // setAllFilters(filters);
  };

  return (
    <div className="w-96 h-full absolute top-0 left-0 bg-slate-400 z-10">
      <h1>Company Search Filters</h1>
      <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <form className="flex flex-col items-start" ref={filterForm} onSubmit={handleSubmit}>
        <input type="submit" value="Set filters" />
      </form>
    </div>
  );
};

export default Filters;
