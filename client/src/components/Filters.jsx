import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Tooltip,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { InfoOutlineIcon } from '@chakra-ui/icons';

const Filters = ({ setAllFilters }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // onClose();
  };

  return (
    <Flex direction="column" p="10px" gap={5}>
      <Heading size="lg">Filters</Heading>
      <form id="filter-form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Flex direction="column" gap="12px">
            <Box>
              <FormLabel htmlFor="primarySector"><Heading size="sm">Sector</Heading></FormLabel>
              <Select id="primarySector" placeholder="Select sector" {...register('primarySector')}>
                <option>Community Corrections</option>
                <option>Construction &amp; Maintenance</option>
                <option>Data &amp; Information Systems</option>
                <option>Equipment</option>
                <option>Financial Services</option>
                <option>Food &amp; Commissary</option>
                <option>Healthcare</option>
                <option>Investor</option>
                <option>Investor</option>
                <option>Operations &amp; Management</option>
                <option>Other</option>
                <option>Personnel</option>
                <option>Programs &amp; Labor</option>
                <option>Telecom</option>
                <option>Transportation</option>
              </Select>
            </Box>
            <Box>
              <FormLabel htmlFor="subsector"><Heading size="sm">Sub-sector</Heading></FormLabel>
              <Select id="subsector" placeholder="Select sub-sector" {...register('subsector')}>
                <option>Ambulance Services</option>
                <option>Agency Payment Processing</option>
                <option>Agency Transportation</option>
                <option>Architecture &amp; Engineerging</option>
                <option>Arrest, Court, &amp; Probation Data Systems</option>
                <option>Bail &amp; Surety</option>
                <option>Care Packages</option>
                <option>Cash &amp; Release Cards</option>
                <option>Commissary</option>
                <option>Construction</option>
                <option>Construction, Equipment, &amp; Acquisition Financing</option>
                <option>Corrections Data Systems</option>
                <option>Day Reporting Center</option>
                <option>Education Services, Materials, &amp; Technology</option>
                <option>Electronic Monitoring</option>
                <option>Equity/Debt Investor</option>
                <option>Furnishings, Supplies, &amp; Other Facility Equipment</option>
                <option>IT &amp; Communcations Infrastructure &amp; Service</option>
                <option>Immigration Detention Operator</option>
                <option>Kitchen Equipment</option>
                <option>Maintenance Services</option>
                <option>Medical Equipment</option>
                <option>Medical Healthcare</option>
                <option>Medical Records Systems</option>
                <option>Mental Health Services</option>
                <option>Money Transfers</option>
                <option>Other</option>
                <option>Outpatient Programs</option>
                <option>Pharmacy</option>
                <option>Prison Communications</option>
                <option>Prison Food</option>
                <option>Prison Transportation</option>
                <option>Private Prison Operator</option>
                <option>Probation, Parole, &amp; Other Supervision</option>
                <option>Procurement, Contracting, &amp; Other Admin Services</option>
                <option>Rehab Programming</option>
                <option>Residential Programs</option>
                <option>Security Equipment</option>
                <option>Security Technology</option>
                <option>Staff Management Systems</option>
                <option>Staff Training</option>
                <option>Substance Abuse Treatment</option>
                <option>Tablets</option>
                <option>Telecom Surveillance &amp; Security</option>
                <option>Third Party Staffing</option>
                <option>Utility/Energy</option>
                <option>Vending Machines</option>
                <option>Visitor Transportation</option>
                <option>Vocation/Industries (Prison Labor)</option>
              </Select>
            </Box>
            <Box>
              <Heading size="sm">
                Harm Score{' '}
                <Tooltip label="Include a tooltip here about what a harm score is" fontSize="md">
                  <InfoOutlineIcon />
                </Tooltip>
              </Heading>
              <Flex>
                <Box>
                  <FormLabel htmlFor="maxHarmScore">Maximum</FormLabel>
                  <NumberInput
                    id="maxHarmScore"
                    maxWidth="60px"
                    size="sm"
                    step={1}
                    defaultValue={7}
                    min={3}
                    max={15}
                    {...register('maxHarmScore')}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Box>
                  <FormLabel htmlFor="minHarmScore">Minimum</FormLabel>
                  <NumberInput
                    id="minHarmScore"
                    maxWidth="60px"
                    size="sm"
                    step={1}
                    defaultValue={3}
                    min={3}
                    max={15}
                    {...register('minHarmScore')}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
              </Flex>
            </Box>
            <Box>
              <Stack spacing={3} direction="column">
                <Checkbox id="detention" {...register('detention')}>
                  Involved in Immigration Detention
                </Checkbox>
                <Checkbox id="labor" {...register('labor')}>
                  Involved in Prison Labor
                </Checkbox>
                <Checkbox id="divestment" {...register('divestment')}>
                  Divestment
                </Checkbox>
              </Stack>
            </Box>
          </Flex>
        </FormControl>
      </form>
      <Button colorScheme="blue" type="submit" form="filter-form">
        Save
      </Button>
    </Flex>
  );
};

export default Filters;
