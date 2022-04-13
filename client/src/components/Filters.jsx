import React, { useRef, useState } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  useDisclosure,
} from '@chakra-ui/react';

const Filters = ({ setAllFilters }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Set Filters</Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerCloseButton />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Company Search Filters</DrawerHeader>
          <DrawerBody>
            <FormControl>
              <FormLabel htmlFor="active">Include Active Brands?</FormLabel>
              <Switch id="active" />
              <FormLabel htmlFor="exposure">Parent Public Exposure</FormLabel>
              <Select id="exposure" placeholder="Select parent public exposure">
                <option>Tier 1a - Publicly Traded - Targeted Correctional Exposure</option>
                <option>Tier 1b - Publicly Traded - Other</option>
                <option>Tier 2 - Investment Firm-Owned</option>
                <option>Tier 3 - Large Privately-Owned, requires outside financing</option>
                <option>Tier 4 - Small Privately-Owned</option>
              </Select>{' '}
            </FormControl>
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Filters;
