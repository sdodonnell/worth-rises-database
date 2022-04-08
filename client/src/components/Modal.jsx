import React from 'react';

const Modal = ({ name, setActiveCompany }) => {
  const handleClick = (e) => {
    e.preventDefault();

    setActiveCompany(null);
  };
  return (
    <div className="absolute w-1/2 inset-0 h-fit m-auto bg-blue-300">
      <p>Modal for {name}</p>
      <p className="absolute top-0 right-0" onClick={handleClick}>
        x
      </p>
    </div>
  );
};

export default Modal;
