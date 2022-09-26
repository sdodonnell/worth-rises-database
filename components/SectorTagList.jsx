import React from 'react';
import { Text } from '@chakra-ui/react';
import SectorTag from './SectorTag';

const SectorTagList = ({ sectors = [], setAllFilters }) => {
  return (
    <Text>
      {sectors.map((sector, i) => {
        const rand = Math.random();
        if (i === sectors.length - 1) {
          return <SectorTag key={`${sector}_${rand}`} sector={sector} setAllFilters={setAllFilters} isLast />;
        } else {
          return <SectorTag key={`${sector}_${rand}`} sector={sector} setAllFilters={setAllFilters} />;
        }
      })}
    </Text>
  );
};

export default SectorTagList;
