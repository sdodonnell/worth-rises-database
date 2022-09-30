import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { EXPOSURE_TEXT } from './utils/copyUtils';

const ExposureTooltip = () => (
  <Box>
    {EXPOSURE_TEXT.split('\n').map((el) => <Text>{el}</Text>)}
  </Box>
);

export default ExposureTooltip;
