import React from "react";

const Company = ({ name, setActiveCompany }) => {
    const handleClick = (e) => {
        e.preventDefault();

        setActiveCompany(name);
    }

    return (
        <p className="font-bold" onClick={handleClick}>{name}</p>
    )
}

export default Company;
