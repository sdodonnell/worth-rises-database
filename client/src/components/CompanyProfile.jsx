import React from 'react';

const CompanyProfile = ({ data, setActiveCompany }) => {
  const handleClick = (e) => {
    e.preventDefault();

    setActiveCompany(null);
  };

  const {
    company,
    state,
    primarySector,
    active,
    yearFounded = '--',
    employees = '--',
    revenueOnly,
    exposure = '--',
    executive = '--',
    parent = '--',
  } = data;

  return (
    <div className="absolute w-1/2 inset-0 h-fit m-auto bg-blue-300">
      <h1>{company}</h1>
      <div>
        <section>
          <div>
            <h3>Year Founded</h3>
            <h2>{yearFounded}</h2>
          </div>
          <div>
            <h3>Number of Employees</h3>
            <h2>{employees}</h2>
          </div>
          <div>
            <h3>Lead Executive</h3>
            <h2>{executive}</h2>
          </div>
          <div>
            <h3>Parent Company</h3>
            <h2>{parent}</h2>
          </div>
        </section>
        <section></section>
      </div>
      <p className="absolute top-0 right-0" onClick={handleClick}>
        x
      </p>
    </div>
  );
};

export default CompanyProfile;
