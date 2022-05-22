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
import { Controller, useForm, useWatch } from 'react-hook-form';
import { InfoOutlineIcon } from '@chakra-ui/icons';

const sectorMapping = {
  'Community Corrections': [
    'Bail & Surety',
    'Day Reporting Center',
    'Electronic Monitoring',
    'Outpatient Programs',
    'Residential Programs',
  ],
  'Construction & Maintenance': [
    'Architecture & Engineering',
    'Construction',
    'Maintenance Services',
    'Utility/Energy',
  ],
  'Data & Information Systems': [
    'Arrest, Court, & Probation Data Systems',
    'Corrections Data Systems',
    'Immigration Data Systems',
    'IT & Communications',
    'Infrastructure & Services',
    'Medical Records Systems',
  ],
  Equipment: ['Furnishings & Supplies', 'Security Equipment', 'Security Technology'],
  'Financial Services': ['Agency Payment Processing', 'Money Transfers', 'Cash & Release Cards'],
  'Food & Commissary': ['Care Packages', 'Commissary', 'Kitchen Equipment', 'Prison Food', 'Vending Machines'],
  Healthcare: [
    'Ambulance Services',
    'Medical Equipment',
    'Medical Healthcare',
    'Mental Health Services',
    'Medical Records Systems',
    'Pharmacy',
    'Substance Abuse Treatment',
    'Third Party Staffing',
  ],
  Investor: [],
  'Operations & Management': [
    'Immigration Detention Operator',
    'Private Prison Operator',
    'Procurement, Contracting, & Other Admin Services',
  ],
  Other: [],
  Personnel: ['Staff Management System', 'Staff Training', 'Third Party Staffing'],
  'Programs & Labor': [
    'Education Services, Materials, & Technology',
    'Rehab Programming',
    'Vocation/Industries (Prison Labor)',
  ],
  Telecom: ['Prison Communications', 'Tablets', 'Telecom Surveillance & Security'],
  Transportation: ['Agency Transportation', 'Prison Transportation', 'Visitor Transportation'],
};

const Filters = ({ setAllFilters, setSearchTerm }) => {
  const { register, handleSubmit, reset, control } = useForm();
  const sector = useWatch({ control, name: 'sector' });

  const onSubmit = (data) => {
    const { keyword, sector, subsector, minHarmScore, maxHarmScore, detention, labor, divestment, active } = data;

    const filters = [
      { id: 'primarySector', value: sector },
      { id: 'subsector', value: subsector },
      { id: 'detentionInvolvement', value: detention },
      { id: 'laborInvolvement', value: labor },
      { id: 'divestment', value: divestment },
    ];

    if (active) {
      filters.push({ id: 'active', value: 'Y' });
    }

    if (minHarmScore && maxHarmScore) {
      filters.push({ id: 'harmScore', value: [Number(minHarmScore), Number(maxHarmScore)] });
    }

    setAllFilters(filters);
    setSearchTerm(keyword);
  };

  const resetFilters = () => {
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
              <FormLabel htmlFor="sector">
                <Heading size="sm">Sector</Heading>
              </FormLabel>
              <Select id="sector" placeholder="Select sector" {...register('sector')}>
                {Object.keys(sectorMapping).map((sector) => (
                  <option key={sector}>{sector}</option>
                ))}
              </Select>
            </Box>
            <Box>
              <FormLabel htmlFor="subsector">
                <Heading size="sm">Sub-sector</Heading>
              </FormLabel>
              <Select id="subsector" placeholder="Select sub-sector" {...register('subsector')}>
                {sector && sectorMapping[sector].map((subsector) => <option key={sector}>{subsector}</option>)}
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
                <Controller
                  control={control}
                  name="divestment"
                  defaultValue={false}
                  render={({ field: { value, onChange } }) => (
                    <Checkbox id="divestment" isChecked={value} onChange={(e) => onChange(e.target.checked)}>
                      Divestment Target
                    </Checkbox>
                  )}
                />
                <Controller
                  control={control}
                  name="labor"
                  defaultValue={false}
                  render={({ field: { value, onChange } }) => (
                    <Checkbox id="labor" isChecked={value} onChange={(e) => onChange(e.target.checked)}>
                      Supports Prison Labor
                    </Checkbox>
                  )}
                />
                <Controller
                  control={control}
                  name="detention"
                  defaultValue={false}
                  render={({ field: { value, onChange } }) => (
                    <Checkbox id="detention" isChecked={value} onChange={(e) => onChange(e.target.checked)}>
                      Involved in Immigration Detention
                    </Checkbox>
                  )}
                />
                <Controller
                  control={control}
                  name="active"
                  defaultValue={false}
                  render={({ field: { value, onChange } }) => (
                    <Checkbox id="active" isChecked={value} onChange={(e) => onChange(e.target.checked)}>
                      Active Brands Only
                    </Checkbox>
                  )}
                />
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
