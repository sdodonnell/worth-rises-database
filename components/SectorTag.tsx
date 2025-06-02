import { Text } from '@chakra-ui/react';
import React from 'react';

const SectorTag = ({ sector, setAllFilters, variant, isLast }) => {
  const sortBySector = (e) => {
    e.preventDefault();

    const cleanSector = e.target.innerText.trim().replace(/;$/, '');
    setAllFilters([{ id: 'sectors', value: [cleanSector] }]);
  };

  const sortBySubsector = (e) => {
    e.preventDefault();

    setAllFilters([{ id: 'subsector', value: [e.target.innerText] }]);
  };

  if (variant === 'primary') {
    return (
      <Text
        minHeight="16px"
        as="span"
        onClick={sortBySector}
        _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
      >
        {sector}
        {isLast ? '' : '; '}
      </Text>
    );
  }

  return (
    <Text
      minHeight="16px"
      as="span"
      onClick={sortBySubsector}
      _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
    >
      {sector}
      {isLast ? '' : '; '}
    </Text>
  );
};

export default SectorTag;
