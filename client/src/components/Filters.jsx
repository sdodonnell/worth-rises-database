import React, { memo, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Select,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { QuestionOutlineIcon } from '@chakra-ui/icons';

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
    'IT & Communications Infrastructure & Services',
    'Medical Records Systems',
  ],
  Equipment: ['Furnishings, Supplies, & Other Facility Equipment', 'Security Equipment', 'Security Technology'],
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
  const { register, reset, control, watch } = useForm({ defaultValues: { maxHarmScore: 15 } });
  const sector = watch('sector');
  const data = watch();

  useEffect(() => {
    submitSearch(data);
  }, [data]);

  const submitSearch = (data) => {
    const { active, detention, divestment, exposure, keyword, labor, maxHarmScore, minHarmScore, sector, subsector } =
      data;

    const filters = [
      { id: 'primarySector', value: sector },
      { id: 'subsector', value: subsector },
      { id: 'exposure', value: exposure },
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
    <Flex p="10px" direction="column" gap="10px" height="100%" bgColor="softer.purple" overflow="scroll">
      <Link href="https://worthrises.org" isExternal>
        <Image src="logo2.png" h="50px" />
      </Link>
      <Flex direction="column" p="15px" gap={5}>
        <form id="filter-form">
          <FormControl>
            <Flex direction="column" gap="12px">
              <Box>
                <FormLabel color="brand.500" htmlFor="keyword">
                  <Heading size="sm">Keyword</Heading>
                </FormLabel>
                <Input placeholder="Enter Keyword" bgColor="white" {...register('keyword')} />
              </Box>
              <Box>
                <FormLabel color="brand.500" htmlFor="sector">
                  <Heading size="sm">Sector</Heading>
                </FormLabel>
                <Select id="sector" placeholder="Select sector" bgColor="white" {...register('sector')}>
                  {Object.keys(sectorMapping).map((sector) => (
                    <option key={sector}>{sector}</option>
                  ))}
                </Select>
              </Box>
              <Box>
                <FormLabel color="brand.500" htmlFor="subsector">
                  <Heading size="sm">Sub-sector</Heading>
                </FormLabel>
                <Select id="subsector" placeholder="Select sub-sector" bgColor="white" isDisabled={!sector} {...register('subsector')}>
                  {sector && sectorMapping[sector].map((subsector) => <option key={subsector}>{subsector}</option>)}
                </Select>
              </Box>
              <Box>
                <Heading size="sm" color="brand.500">
                  Harm Score
                  <Tooltip label="Include a tooltip here about what a harm score is" fontSize="md">
                    <QuestionOutlineIcon ml="5px" mt="-3px" color="brand.500" />
                  </Tooltip>
                </Heading>
                <Flex pt="5px" alignItems="center">
                  <Box>
                    <Select id="minHarmScore" bgColor="white" maxWidth="70px" {...register('minHarmScore')}>
                      {Array(13)
                        .fill()
                        .map((_, i) => (
                          <option key={i}>{i + 3}</option>
                        ))}
                    </Select>
                  </Box>
                  <Text px="5px">to</Text>
                  <Box>
                    <Select
                      id="maxHarmScore"
                      bgColor="white"
                      maxWidth="70px"
                      defaultValue="15"
                      {...register('maxHarmScore')}
                    >
                      {Array(13)
                        .fill()
                        .map((_, i) => (
                          <option key={i}>{i + 3}</option>
                        ))}
                    </Select>
                  </Box>
                </Flex>
              </Box>
              <Box>
                <FormLabel htmlFor="exposure">
                  <Heading size="sm" color="brand.500">
                    Public Markets Exposure
                  </Heading>
                </FormLabel>
                <Select
                  id="exposure"
                  placeholder="Select market exposure tier"
                  bgColor="white"
                  {...register('exposure')}
                >
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
                      <Checkbox
                        id="divestment"
                        isChecked={value}
                        borderColor="brand.500"
                        onChange={(e) => onChange(e.target.checked)}
                      >
                        Divestment Target
                      </Checkbox>
                    )}
                  />
                  <Controller
                    control={control}
                    name="labor"
                    defaultValue={false}
                    render={({ field: { value, onChange } }) => (
                      <Checkbox
                        id="labor"
                        isChecked={value}
                        borderColor="brand.500"
                        onChange={(e) => onChange(e.target.checked)}
                      >
                        Supports Prison Labor
                      </Checkbox>
                    )}
                  />
                  <Controller
                    control={control}
                    name="detention"
                    defaultValue={false}
                    render={({ field: { value, onChange } }) => (
                      <Checkbox
                        id="detention"
                        isChecked={value}
                        borderColor="brand.500"
                        colorScheme="brand"
                        onChange={(e) => onChange(e.target.checked)}
                      >
                        Involved in Immigration Detention
                      </Checkbox>
                    )}
                  />
                  <Controller
                    control={control}
                    name="active"
                    defaultValue={false}
                    render={({ field: { value, onChange } }) => (
                      <Checkbox
                        id="active"
                        isChecked={value}
                        borderColor="brand.500"
                        colorScheme="brand"
                        onChange={(e) => onChange(e.target.checked)}
                      >
                        Active Brands Only
                      </Checkbox>
                    )}
                  />
                </Stack>
              </Box>
            </Flex>
          </FormControl>
        </form>
        <Button colorScheme="brand" onClick={resetFilters}>
          Reset Filters
        </Button>
      </Flex>
    </Flex>
  );
};

export default memo(Filters);
