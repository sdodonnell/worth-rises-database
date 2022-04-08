import React from "react";

const Company = ({ name, setActiveCompany }) => {
    const handleClick = (e) => {
        e.preventDefault();

        setActiveCompany(name);
    }

    return (
        <p className="font-bold group-hover:underline" onClick={handleClick}>{name}</p>
    )
}

export default Company;
