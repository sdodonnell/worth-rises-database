import { Tag, Text } from '@chakra-ui/react';
import React from 'react';

const SectorTag = ({ sector, setAllFilters, variant }) => {
  // const sectorColors = {
  //   Healthcare: 'red',
  //   Equipment: 'orange',
  //   'Construction & Maintenance': 'yellow',
  //   Transportation: 'green',
  //   'Data & Information Systems': 'teal',
  //   'Programs & Labor': 'blue',
  //   'Food & Commissary': 'cyan',
  //   'Community Corrections': 'purple',
  //   'Operations & Management': 'pink',
  //   'Financial Services': '',
  //   Personnel: 'red',
  //   Investor: 'orange',
  //   Other: 'yellow',
  //   Telecom: 'green',
  // };

  const sortBySector = (e) => {
    e.preventDefault();

    setAllFilters([{ id: 'primarySector', value: e.target.innerText }]);
  };

  const sortBySubsector = (e) => {
    e.preventDefault();

    setAllFilters([{ id: 'subsector', value: e.target.innerText }]);
  };

  if (variant === 'primary') {
    // return (
    //   <Tag
    //     colorScheme={sectorColors[sector]}
    //     size="sm"
    //     whiteSpace="no-wrap"
    //     onClick={sortBySector}
    //     _hover={{ cursor: 'pointer' }}
    //     title="Click to filter by sector"
    //   >
    //     {sector}
    //   </Tag>
    // );
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
