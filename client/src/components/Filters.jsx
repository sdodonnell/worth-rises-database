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
import { useForm } from 'react-hook-form';

const Filters = ({ setAllFilters }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log(data);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>Set Filters</Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Company Search Filters</DrawerHeader>
          <DrawerBody>
            <form id="filter-form" onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel htmlFor="active">Include Active Brands?</FormLabel>
                <Switch id="active" defaultChecked {...register('active')} />
                <FormLabel htmlFor="exposure">Parent Public Exposure</FormLabel>
                <Select id="exposure" placeholder="Select parent public exposure" {...register('exposure')}>
                  <option>Tier 1a - Publicly Traded - Targeted Correctional Exposure</option>
                  <option>Tier 1b - Publicly Traded - Other</option>
                  <option>Tier 2 - Investment Firm-Owned</option>
                  <option>Tier 3 - Large Privately-Owned, requires outside financing</option>
                  <option>Tier 4 - Small Privately-Owned</option>
                </Select>
              </FormControl>
            </form>
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="blue" type="submit" form="filter-form">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Filters;
