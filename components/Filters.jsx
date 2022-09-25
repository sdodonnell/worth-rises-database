import React, { memo, useEffect, useState, useRef } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Select,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { ChevronDownIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import { HARM_SCORE_TEXT } from './copyUtils';

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
  Equipment: [
    'Furnishings, Supplies, & Other Facility Equipment',
    'Security Equipment',
    'Security Technology',
  ],
  'Financial Services': ['Agency Payment Processing', 'Money Transfers', 'Cash & Release Cards'],
  'Food & Commissary': [
    'Care Packages',
    'Commissary',
    'Kitchen Equipment',
    'Prison Food',
    'Vending Machines',
  ],
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
  const [resetDisabled, setResetDisabled] = useState(true);
  const shouldToggleResetButton = useRef(true);

  const { register, reset, control, watch, setValue } = useForm({
    defaultValues: { maxHarmScore: 15, sector: [], subsector: [] },
  });

  register('sector');
  register('subsector');

  const sector = watch('sector');
  const data = watch();

  useEffect(() => {
    submitSearch(data);
  }, [data]);

  const submitSearch = (data) => {
    const {
      active,
      detention,
      divestment,
      exposure,
      keyword,
      labor,
      maxHarmScore,
      minHarmScore,
      sector,
      subsector,
    } = data;

    console.log('filtering by sectors: ', sector);

    const filters = [
      { id: 'sectors', value: sector },
      { id: 'subsector', value: subsector },
      { id: 'exposure', value: exposure },
      { id: 'detentionInvolvement', value: detention },
      { id: 'laborInvolvement', value: labor },
      { id: 'divestment', value: divestment },
    ];

    if (active) {
      filters.push({ id: 'active', value: true });
    }

    if (minHarmScore && maxHarmScore) {
      filters.push({ id: 'harmScore', value: [Number(minHarmScore), Number(maxHarmScore)] });
    }

    if (shouldToggleResetButton.current) {
      shouldToggleResetButton.current = false;
    } else {
      setResetDisabled(false);
    }

    setAllFilters(filters);
    setSearchTerm(keyword);
  };

  const resetFilters = () => {
    setAllFilters([]);
    setSearchTerm(null);
    reset();

    shouldToggleResetButton.current = true;
    setResetDisabled(true);
  };

  const updateSector = (sectors) => {
    setValue('sector', sectors);
  };

  const updateSubsector = (subsectors) => {
    setValue('subsector', subsectors);
  };

  return (
    <Flex direction="column" gap={5} overflow="hidden">
      <form id="filter-form">
        <FormControl>
          <Flex direction="column" gap="12px" overflow="hidden">
            <Box>
              <FormLabel color="black" htmlFor="keyword">
                <Heading size="sm">Keyword</Heading>
              </FormLabel>
              <Input
                placeholder="Enter Keyword"
                bgColor="white"
                focusBorderColor="soft.purple"
                {...register('keyword')}
              />
            </Box>
            <Box>
              <FormLabel color="black" htmlFor="sector">
                <Heading size="sm">Sector</Heading>
              </FormLabel>
              <Menu closeOnSelect={false}>
                <MenuButton
                  as={Button}
                  bgColor="white"
                  fontWeight="normal"
                  color="black"
                  width="100%"
                  textAlign="left"
                  _hover={{ bg: 'white' }}
                  _active={{ bg: 'white' }}
                  _focus={{ bg: 'white' }}
                  _expanded={{ bg: 'white' }}
                  rightIcon={<ChevronDownIcon />}
                >
                  Select Sector
                </MenuButton>
                <MenuList maxWidth="200px" height="200px" overflow="scroll">
                  <MenuOptionGroup type="checkbox" onChange={updateSector}>
                    {Object.keys(sectorMapping).map((sector) => (
                      <MenuItemOption key={sector} value={sector}>
                        {sector}
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Box>
            <Box>
              <FormLabel color="black" htmlFor="subsector">
                <Heading size="sm">Sub-sector</Heading>
              </FormLabel>
              <Menu closeOnSelect={false}>
                <MenuButton
                  as={Button}
                  isDisabled={!sector.length}
                  bgColor="white"
                  fontWeight="normal"
                  color="black"
                  width="100%"
                  textAlign="left"
                  _hover={{ bg: 'white' }}
                  _active={{ bg: 'white' }}
                  _focus={{ bg: 'white' }}
                  _expanded={{ bg: 'white' }}
                  rightIcon={<ChevronDownIcon />}
                >
                  Select Subsector
                </MenuButton>
                <MenuList maxWidth="200px">
                  <MenuOptionGroup type="checkbox" onChange={updateSubsector}>
                    {Object.entries(sectorMapping)
                      .map(([k, v]) => {
                        if (sector.includes(k)) {
                          return v.map((subsector) => (
                            <MenuItemOption key={subsector} value={subsector}>
                              {subsector}
                            </MenuItemOption>
                          ));
                        }

                        return [];
                      })
                      .flat()}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Box>
            <Box>
              <Heading size="sm" color="black">
                Harm Score
                <Tooltip
                  label={HARM_SCORE_TEXT}
                  fontSize="sm"
                  fontWeight="normal"
                  bgColor="soft.gray"
                  placement="auto-start"
                >
                  <QuestionOutlineIcon ml="5px" mt="-3px" color="black" />
                </Tooltip>
              </Heading>
              <Flex pt="5px" alignItems="center">
                <Box>
                  <Select
                    id="minHarmScore"
                    bgColor="white"
                    maxWidth="70px"
                    {...register('minHarmScore')}
                  >
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
                <Heading size="sm" color="black">
                  Capital Markets Exposure
                </Heading>
              </FormLabel>
              <Select
                id="exposure"
                placeholder="Select market exposure tier"
                bgColor="white"
                {...register('exposure')}
              >
                <option>Tier 1a (Publicly Traded - Targeted Exposure)</option>
                <option>Tier 1b (Publicly Traded - Other Exposure)</option>
                <option>Tier 2 (Investment Firm-Owned)</option>
                <option>Tier 3 (Large Privately-Owned)</option>
                <option>Tier 4 (Small Privately-Owned)</option>
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
                      borderColor="black"
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
                      borderColor="black"
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
                      borderColor="black"
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
                      borderColor="black"
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
      <Button colorScheme="brand" onClick={resetFilters} isDisabled={resetDisabled}>
        Reset Filters
      </Button>
    </Flex>
  );
};

export default memo(Filters);
