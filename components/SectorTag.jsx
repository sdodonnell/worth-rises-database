import { Text } from '@chakra-ui/react';
import React from 'react';

const SectorTag = ({ sector, setAllFilters, variant }) => {
  const sortBySector = (e) => {
    e.preventDefault();

    setAllFilters([{ id: 'primarySector', value: e.target.innerText }]);
  };

  const sortBySubsector = (e) => {
    e.preventDefault();

    setAllFilters([{ id: 'subsector', value: e.target.innerText }]);
  };

  if (variant === 'primary') {
    return (
      <Text minHeight="16px" onClick={sortBySector} _hover={{ cursor: 'pointer', textDecoration: 'underline' }}>
        {sector}
      </Text>
    );
  }

  return (
    <Text minHeight="16px" onClick={sortBySubsector} _hover={{ cursor: 'pointer', textDecoration: 'underline' }}>
      {sector}
    </Text>
  );
};

export default SectorTag;
