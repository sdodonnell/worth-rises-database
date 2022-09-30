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
  Select,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { HARM_SCORE_TEXT } from './utils/copyUtils';
import { sectorMapping } from './utils/dataUtils';
import ExposureTooltip from './ExposureTooltip';

const exposureOptions = [
  {
    value: 'Tier 1a (Publicly Traded - Targeted Exposure)',
    label: 'Tier 1a (Publicly Traded - Targeted Exposure)',
  },
  {
    value: 'Tier 1b (Publicly Traded - Other Exposure)',
    label: 'Tier 1b (Publicly Traded - Other Exposure)',
  },
  { value: 'Tier 2 (Investment Firm-Owned)', label: 'Tier 2 (Investment Firm-Owned)' },
  { value: 'Tier 3 (Large Privately-Owned)', label: 'Tier 3 (Large Privately-Owned)' },
  { value: 'Tier 4 (Small Privately-Owned)', label: 'Tier 4 (Small Privately-Owned)' },
];

const selectStyles = {
  control: (styles, { isFocused, isSelected }) => {
    return {
      ...styles,
      borderColor: isFocused || isSelected ? '#f1d6ff' : '',
      boxShadow: isFocused ? '0 0 0 1px #f1d6ff' : '',

      ':hover': {
        ...styles[':hover'],
        borderColor: '#f1d6ff',
      },
    };
  },
};

const Filters = ({ setAllFilters, setSearchTerm, disableFilters }) => {
  const [resetDisabled, setResetDisabled] = useState(true);
  const shouldToggleResetButton = useRef(true);

  const { register, reset, control, watch, setValue } = useForm({
    defaultValues: {
      includeMissingHarmScore: true,
      keyword: '',
      maxHarmScore: 15,
      minHarmScore: 3,
      sectors: [],
      subsectors: [],
      exposure: null,
    },
  });

  register('sectors');
  register('subsectors');
  register('exposure');
  register('keyword');

  const sectors = watch('sectors');
  const subsectors = watch('subsectors');
  const exposure = watch('exposure');
  const keyword = watch('keyword');
  const data = watch();

  useEffect(() => {
    if (!disableFilters) {
      submitSearch(data);
    }
  }, [data]);

  const submitSearch = (data) => {
    const {
      active,
      detention,
      divestment,
      exposure,
      keyword,
      includeMissingHarmScore,
      labor,
      maxHarmScore,
      minHarmScore,
      sectors,
      subsectors,
    } = data;

    const filters = [
      { id: 'sectors', value: sectors },
      { id: 'subsectors', value: subsectors },
      { id: 'exposure', value: exposure },
      { id: 'detentionInvolvement', value: detention },
      { id: 'laborInvolvement', value: labor },
      { id: 'divestment', value: divestment },
    ];

    if (active) {
      filters.push({ id: 'active', value: true });
    }

    if (minHarmScore && maxHarmScore) {
      const possibleValues = [];

      for (let i = Number(minHarmScore); i < Number(maxHarmScore) + 1; i++) {
        possibleValues.push(i);
      }

      if (includeMissingHarmScore) {
        possibleValues.push(0);
      }

      filters.push({ id: 'harmScore', value: possibleValues });
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

  // Options for the sector select, formatted according to react-select rules
  const sectorOptions = Object.keys(sectorMapping).map((sector) => {
    return {
      value: sector,
      label: sector,
    };
  });

  // Options for the subsector select, formatted according to react-select rules
  const subsectorOptions = Object.entries(sectorMapping)
    .map(([k, v]) => {
      if (sectors.includes(k)) {
        return v.map((subsector) => ({ label: subsector, value: subsector }));
      }

      return [];
    })
    .flat()
    .sort((a, b) => (a.value.toUpperCase() < b.value.toUpperCase() ? -1 : 1));

  // Helper function to update sector value stored in react-hook-form state
  const updateSector = (sectors) => {
    const sectorNames = sectors.map((el) => el.value);
    setValue('sectors', sectorNames);
  };

  // Helper function to update subsector value stored in react-hook-form state
  const updateSubsector = (subsectors) => {
    const subsectorNames = subsectors.map((el) => el.value);
    setValue('subsectors', subsectorNames);
  };

  const updateExposure = (exposure) => {
    setValue('exposure', exposure.value);
  };

  const updateKeyword = (e) => {
    setValue('keyword', e.target.value);
  };

  return (
    <Flex direction="column" gap={5} overflow="hidden">
      <form id="filter-form">
        <FormControl>
          <Flex direction="column" gap="12px" overflow="visible">
            <Box>
              <FormLabel color="black" htmlFor="keyword">
                <Heading size="sm">Keyword</Heading>
              </FormLabel>
              <Input
                placeholder="Enter Keyword"
                bgColor="white"
                focusBorderColor="soft.purple"
                borderRadius="4px"
                onChange={updateKeyword}
                value={keyword}
              />
            </Box>
            <Box>
              <FormLabel color="black" htmlFor="sector">
                <Heading size="sm">Sector</Heading>
              </FormLabel>
              <ReactSelect
                options={sectorOptions}
                isMulti
                onChange={updateSector}
                placeholder="Select sectors"
                styles={selectStyles}
                value={sectors.map((el) => ({ value: el, label: el }))}
              />
            </Box>
            <Box>
              <FormLabel color="black" htmlFor="subsector">
                <Heading size="sm">Subsector</Heading>
              </FormLabel>
              <ReactSelect
                options={subsectorOptions}
                isMulti
                onChange={updateSubsector}
                isDisabled={!sectors.length}
                placeholder="Select subsectors"
                styles={selectStyles}
                value={subsectors.map((el) => ({ value: el, label: el }))}
              />
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
                    maxWidth="90px"
                    defaultValue="3"
                    _focus={{
                      outlineColor: 'soft.purple',
                    }}
                    _focusVisible={{
                      outlineColor: 'soft.purple',
                    }}
                    {...register('minHarmScore')}
                  >
                    {Array.from({ length: 13 }, (_, i) => i + 3)
                      .filter((num) => num <= data.maxHarmScore)
                      .map((num) => (
                        <option key={`minHarmScore_${num}`}>{num}</option>
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
                    _focus={{
                      outlineColor: 'soft.purple',
                    }}
                    _focusVisible={{
                      outlineColor: 'soft.purple',
                    }}
                    {...register('maxHarmScore')}
                  >
                    {Array.from({ length: 13 }, (_, i) => i + 3)
                      .filter((num) => num >= data.minHarmScore)
                      .map((num) => (
                        <option key={`maxHarmScore_${num}`}>{num}</option>
                      ))}
                  </Select>
                </Box>
              </Flex>
              <Controller
                control={control}
                name="includeMissingHarmScore"
                defaultValue={true}
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    id="includeMissingHarmScore"
                    size="sm"
                    isChecked={value}
                    borderColor="black"
                    onChange={(e) => onChange(e.target.checked)}
                    mt="5px"
                    alignItems="flex-start"
                  >
                    Include corporations without harm score
                  </Checkbox>
                )}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="exposure">
                <Heading size="sm" color="black">
                  Capital Markets Exposure
                  <Tooltip
                    label={<ExposureTooltip />}
                    fontSize="sm"
                    fontWeight="normal"
                    bgColor="soft.gray"
                    placement="auto-start"
                  >
                    <QuestionOutlineIcon ml="5px" mt="-3px" color="black" />
                  </Tooltip>
                </Heading>
              </FormLabel>
              <ReactSelect
                options={exposureOptions}
                styles={selectStyles}
                onChange={updateExposure}
                value={exposure ? { value: exposure, label: exposure } : null}
                placeholder="Select tier"
              />
            </Box>
            <Box>
              <Heading size="sm" color="black" mb="6px">
                Other
              </Heading>
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
                      alignItems={['center', 'flex-start']}
                    >
                      Involved in Immigration Detention
                    </Checkbox>
                  )}
                />
                <Controller
                  control={control}
                  name="active"
                  defaultValue={true}
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
