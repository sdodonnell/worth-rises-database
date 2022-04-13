import { Tag } from '@chakra-ui/react';
import React from 'react';

const SectorTag = ({ sector }) => {
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

  return (
    <Tag colorScheme={sectorColors[sector]} size="sm" whiteSpace="no-wrap">
      {sector}
    </Tag>
  );
};

export default SectorTag;
