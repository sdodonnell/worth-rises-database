import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { InfoOutlineIcon } from '@chakra-ui/icons';

const Filters = ({ setAllFilters, searchTerm = '', setSearchTerm }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const {
      keyword,
      primarySector,
      subsector,
      minHarmScore,
      maxHarmScore,
      detentionInvolvement,
      labor,
      divestment,
      active,
    } = data;
    
    console.log('data');

    const filters = [
      { id: 'primarySector', value: primarySector },
      { id: 'subsector', value: subsector },
      { id: 'detentionInvolvement', value: detentionInvolvement },
      { id: 'labor', value: labor },
    ];

    if (active) {
      filters.push({ id: 'active', value: 'Y' });
    }

    if (divestment) {
      filters.push({ id: 'divestment', value: 'Y' });
    }

    if (minHarmScore && maxHarmScore) {
      filters.push({ id: 'harmScore', value: [Number(minHarmScore), Number(maxHarmScore)] });
    }

    setAllFilters(filters);
    setSearchTerm(keyword);
  };

  const resetFilters = () => {
    // This should also clear all input fields
    setAllFilters([]);
    setSearchTerm(null);
    reset();
  };

  return (
    <Flex direction="column" p="10px" gap={5}>
      <Heading size="lg">Filters</Heading>
      {/* This is awkward, but it's a requirement for react-hook-form */}
      <form id="filter-form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Flex direction="column" gap="12px">
            <Box>
              <FormLabel htmlFor="keyword">
                <Heading size="sm">Keyword</Heading>
              </FormLabel>
              <Input placeholder="Enter Keyword" {...register('keyword')} />
            </Box>
            <Box>
              <FormLabel htmlFor="primarySector">
                <Heading size="sm">Sector</Heading>
              </FormLabel>
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
              <FormLabel htmlFor="subsector">
                <Heading size="sm">Sub-sector</Heading>
              </FormLabel>
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
                Harm Score
                <Tooltip label="Include a tooltip here about what a harm score is" fontSize="md">
                  <InfoOutlineIcon />
                </Tooltip>
              </Heading>
              <Flex pt="5px">
                <Box>
                  <NumberInput
                    id="minHarmScore"
                    maxWidth="60px"
                    size="sm"
                    step={1}
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
                <Text px="5px">to</Text>
                <Box>
                  <NumberInput
                    id="maxHarmScore"
                    maxWidth="60px"
                    size="sm"
                    step={1}
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
              </Flex>
            </Box>
            <Box>
              <FormLabel htmlFor="exposure">
                <Heading size="sm">Public Markets Exposure</Heading>
              </FormLabel>
              <Select id="exposure" placeholder="Select market exposure tier" {...register('exposure')}>
                <option>Tier 1a - Publicly Traded - Targeted Correctional Exposure</option>
                <option>Tier 1b - Publicly Traded - Other</option>
                <option>Tier 2 - Investment Firm-Owned</option>
                <option>Tier 4 - Small Privately-Owned</option>
                <option>Tier 3 - Large Privately-Owned, requires outside financing</option>
              </Select>
            </Box>
            <Box>
              <Stack spacing={3} direction="column">
                <Checkbox id="divestment" {...register('divestment')}>
                  Divestment Target
                </Checkbox>
                <Checkbox id="labor" {...register('labor')}>
                  Supports Prison Labor
                </Checkbox>
                <Checkbox id="detention" {...register('detentionInvolvement')}>
                  Involved in Immigration Detention
                </Checkbox>
                <Checkbox id="active" {...register('active')}>
                  Active Brands Only
                </Checkbox>
              </Stack>
            </Box>
          </Flex>
        </FormControl>
      </form>
      <Button colorScheme="purple" type="submit" form="filter-form">
        Save
      </Button>
      <Button colorScheme="purple" variant="outline" onClick={resetFilters}>
        Reset Filters
      </Button>
    </Flex>
  );
};

export default Filters;
