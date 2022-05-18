import { Tag } from '@chakra-ui/react';
import React from 'react';

const SectorTag = ({ sector, setAllFilters }) => {
  const sectorColors = {
    Healthcare: 'red',
    Equipment: 'orange',
    'Construction & Maintenance': 'yellow',
    Transportation: 'green',
    'Data & Information Systems': 'teal',
    'Programs & Labor': 'blue',
    'Food & Commissary': 'cyan',
    'Community Corrections': 'purple',
    'Operations & Management': 'pink',
    'Financial Services': '',
    Personnel: 'red',
    Investor: 'orange',
    Other: 'yellow',
    Telecom: 'green',
  };

  const handleClick = (e) => {
    e.preventDefault();

    setAllFilters([{ id: 'primarySector', value: e.target.innerText }]);
  };

  return (
    <Tag
      colorScheme={sectorColors[sector]}
      size="sm"
      whiteSpace="no-wrap"
      onClick={handleClick}
      _hover={{ cursor: 'pointer' }}
      title="Click to filter by sector"
    >
      {sector}
    </Tag>
  );
};

export default SectorTag;
