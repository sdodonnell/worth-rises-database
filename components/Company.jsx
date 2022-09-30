import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import { ExternalLinkIcon, InfoOutlineIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import { MdCheckBox } from 'react-icons/md';
import React, { useEffect } from 'react';
import * as NextLink from 'next/link';
import { isURL } from 'validator';
import TradingViewWidget from './TradingViewWidget';
import { EXPOSURE_TEXT, HARM_SCORE_TEXT, POLITICAL_SPENDING_TEXT } from './utils/copyUtils';
import { useRouter } from 'next/router';
import { sectorMapping } from './utils/dataUtils';
import ExposureTooltip from './ExposureTooltip';

const Header = ({ text, children, ...props }) => {
  if (children) {
    return (
      <Heading
        fontSize="sm"
        color="normal.gray"
        textTransform="uppercase"
        _notFirst={{ marginTop: '10px' }}
        {...props}
      >
        {text}
        {children}
      </Heading>
    );
  }
  return (
    <Heading
      fontSize="sm"
      color="normal.gray"
      textTransform="uppercase"
      _notFirst={{ marginTop: '10px' }}
      {...props}
    >
      <Text>{text}</Text>
    </Heading>
  );
};

const Source = ({ source, name, website = '' }) => {
  if (!source) return null;

  if (isURL(source)) {
    return (
      <Link href={source} isExternal className="source" textDecoration="underline">
        <Text fontSize="sm" fontStyle="italic">
          {name}
        </Text>
      </Link>
    );
  }

  if (name === 'Corrections' && source === 'See website') {
    return (
      <Text fontSize="sm" fontStyle="italic" className="source">
        {name}: See{' '}
        <Link href={website} isExternal textDecoration="underline">
          website
        </Link>
      </Text>
    );
  }

  return (
    <Text fontSize="sm" fontStyle="italic" className="source">
      {name}: {source}
    </Text>
  );
};

const Company = ({ name, values, handleModalOpen, handleModalClose }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    acquired = 'N/A',
    active,
    corrections = '',
    detentionInvolvement,
    detentionSource = '',
    divestment,
    employees = 'N/A',
    executive = 'N/A',
    exposure = 'N/A',
    financials = '',
    fiscalYear,
    harmScore = 'N/A',
    id,
    laborInvolvement,
    laborSource = '',
    notes,
    other = '',
    owner = 'N/A',
    parentName = 'N/A',
    parentRecord,
    politicalSpending = 'N/A',
    responsibility,
    responsiveness,
    revenueOnly,
    revenues,
    salience,
    sectors = [],
    state,
    stock,
    subsectors = [],
    website,
    yearFounded = 'N/A',
  } = values;

  const employeeCount = employees === 'N/A' ? 'N/A' : Number(employees).toLocaleString('en-US');
  const hasSources = detentionSource || corrections || laborSource || other || financials;

  const desktopTemplate = `"a a a a"
                           "c d e e"
                          `;

  const mobileTemplate = `"a"
                          "c"
                          "d"
                          "e"`;

  const router = useRouter();

  useEffect(() => {
    const safeId = decodeURIComponent(router.query.id);
    if (!isOpen && safeId === id) {
      onOpen();
    } else if (isOpen && safeId !== id) {
      onClose();
    }
  }, [router.query.id]);

  return (
    <>
      <Text
        fontWeight="bold"
        _hover={{ textDecor: 'underline', cursor: 'pointer' }}
        onClick={(e) => handleModalOpen(e, id, onOpen)}
      >
        {name}
      </Text>
      <Modal
        isOpen={isOpen}
        onClose={(e) => handleModalClose(e, onClose)}
        size="6xl"
        scrollBehavior="inside"
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent bgColor="white" overflow="visible" mx="16px">
          <ModalHeader color="black" pt="24px" pb="0">
            <Flex
              flexDirection={['column', 'row']}
              justifyContent="space-between"
              alignItems="baseline"
              gap={['8px', 0]}
              mb={['8px', 0]}
            >
              {website ? (
                <Link href={website} isExternal>
                  <Flex alignItems="baseline" gap="5px">
                    <Heading size="lg">{name}</Heading>
                    <ExternalLinkIcon mx="2px" />
                  </Flex>
                </Link>
              ) : (
                <Heading size="lg">{name}</Heading>
              )}
              {!active && (
                <Heading size="sm" color="normal.red" whiteSpace="nowrap">
                  BRAND INACTIVE
                </Heading>
              )}
            </Flex>
          </ModalHeader>
          <ModalCloseButton
            top="-10px"
            right="-10px"
            borderRadius="20px"
            bgColor="softer.gray"
            _hover={{ bgColor: 'soft.gray' }}
            _active={{ bgColor: 'soft.gray' }}
          />
          <ModalBody pb="72px" pt="18px" overflowX="hidden">
            <Grid
              templateAreas={[mobileTemplate, desktopTemplate]}
              templateRows={['auto', '200px 290px']}
              templateColumns={['auto', 'repeat(4, 1fr)']}
              gap="28px"
            >
              <GridItem gridArea="a">
                <Grid
                  gridTemplateColumns={['auto', '2fr 1fr']}
                  height="100%"
                  padding={[0, '20px 0']}
                  borderTop={['none', '1px solid black']}
                  borderBottom={['none', '1px solid black']}
                  gap={['20px', 0, 0, '20px']}
                >
                  <GridItem
                    display="grid"
                    gridTemplateColumns={['auto', 'repeat(4, 1fr)']}
                    gridTemplateRows={['auto', '80px 80px']}
                    borderRight={['none', '1px solid black']}
                    gap={['12px', 0]}
                  >
                    <Box>
                      <Header text="Founded" />
                      <Text>{yearFounded}</Text>
                    </Box>
                    <Box>
                      <Header text="Headquarters" />
                      <Text>{state}</Text>
                    </Box>
                    <Box>
                      <Header text="Employees" />
                      <Text>{employeeCount}</Text>
                    </Box>
                    <Box>
                      <Header text="Chief Executive" />
                      <Text>{executive}</Text>
                    </Box>
                    <Box>
                      <Header text="Parent Company" />
                      {parentRecord ? (
                        <Text _hover={{ textDecoration: 'underline' }}>
                          <Link as={NextLink} href={`/?id=${parentRecord}`}>
                            {parentName[0]}
                          </Link>
                        </Text>
                      ) : (
                        <Text>{parentName}</Text>
                      )}
                    </Box>
                    <Box>
                      <Header text="Ownership Investor" />
                      <Text>{owner}</Text>
                    </Box>
                    <Box>
                      <Header text="Last Acquired" />
                      <Text>{acquired}</Text>
                    </Box>
                  </GridItem>
                  <GridItem px={['0', '24px']}>
                    <Grid templateColumns="auto 30px" templateRows="44px 22px">
                      <GridItem
                        display="flex"
                        id="harm-score"
                        w={['auto', '280px']}
                        h="44px"
                        borderRadius="5px"
                        overflow="hidden"
                        fontFamily="heading"
                        fontWeight="bold"
                        border="1px solid black"
                      >
                        <Flex
                          bgColor="soft.gray"
                          w="228px"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Text textTransform="uppercase" fontSize="sm">
                            Harm Score
                          </Text>
                        </Flex>
                        <Flex bgColor="black" justifyContent="center" alignItems="center" flex="1">
                          <Text color="white" fontSize="22px">
                            {harmScore}
                          </Text>
                        </Flex>
                      </GridItem>
                      <GridItem display="flex" alignItems="center" justifyContent="center">
                        <Tooltip
                          label={HARM_SCORE_TEXT}
                          fontSize="sm"
                          fontWeight="normal"
                          bgColor="soft.gray"
                          placement="auto-start"
                        >
                          <InfoOutlineIcon ml="5px" mt="-3px" />
                        </Tooltip>
                      </GridItem>
                      <GridItem
                        display="flex"
                        mt="6px"
                        alignItems="center"
                        justifyContent="center"
                        overflow="hidden"
                      >
                        <Text fontSize="sm" borderRight="1px solid black" px="5px">
                          Salience: {salience}
                        </Text>
                        <Text fontSize="sm" borderRight="1px solid black" px="5px">
                          Responsibility: {responsibility}
                        </Text>
                        <Text fontSize="sm" px="5px">
                          Responsive: {responsiveness}
                        </Text>
                      </GridItem>
                    </Grid>
                    <Flex flexDirection="column" pt="10px">
                      {divestment && (
                        <Text
                          display="flex"
                          alignItems="center"
                          gap="5px"
                          color="normal.red"
                          fontWeight="bold"
                        >
                          <Icon as={MdCheckBox} /> Divestment Target
                        </Text>
                      )}
                      {laborInvolvement && (
                        <Text
                          display="flex"
                          alignItems="center"
                          gap="5px"
                          color="normal.red"
                          fontWeight="bold"
                        >
                          <Icon as={MdCheckBox} /> Supports Prison Labor
                        </Text>
                      )}
                      {detentionInvolvement && (
                        <Text
                          display="flex"
                          alignItems="center"
                          gap="5px"
                          color="normal.red"
                          fontWeight="bold"
                        >
                          <Icon as={MdCheckBox} /> Involved in Immigration Detention
                        </Text>
                      )}
                    </Flex>
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem gridArea="c" display="flex" flexDir="column" justifyContent="space-between">
                <Box>
                  <Header text="Sector" />
                  {sectors.map((sectorName) => {
                    return (
                      <React.Fragment key={`${name}_${sectorName}`}>
                        <Text fontSize="md">
                          {sectorName}
                        </Text>
                        <UnorderedList marginInlineStart="2em">
                          {sectorMapping?.[sectorName].map((subsectorName) => {
                            if (subsectors.includes(subsectorName)) {
                              return (
                                <ListItem key={`${name}_${subsectorName}`}>
                                  {subsectorName}
                                </ListItem>
                              );
                            }
                          })}
                        </UnorderedList>
                      </React.Fragment>
                    );
                  })}
                </Box>
              </GridItem>
              <GridItem
                gridArea="d"
                display="flex"
                flexDir="column"
                gap={['12px', '30px']}
              >
                <Flex flexDirection="column" justifyContent="space-between">
                  <Header text="Annual Revenue">
                    {fiscalYear && (
                      <Text as="span" fontSize="sm" fontWeight="normal" ml="6px">
                        ({fiscalYear})
                      </Text>
                    )}
                  </Header>
                  {revenues ? (
                    <>
                      <Text fontSize="2xl" fontWeight="light">
                        {revenues} M{' '}
                      </Text>
                      {revenueOnly && (
                        <Text display="flex" alignItems="center" gap="5px" mt="6px" color="normal.red">
                          <Icon as={MdCheckBox} />
                          Prison Industry Revenue Only
                        </Text>
                      )}
                    </>
                  ) : (
                    <Text fontSize="md" fontWeight="normal">
                      N/A
                    </Text>
                  )}
                </Flex>
                <Box>
                  <Header text="Capital Markets Exposure">
                    <Tooltip
                      label={<ExposureTooltip />}
                      fontSize="sm"
                      fontWeight="normal"
                      bgColor="soft.gray"
                      placement="auto-start"
                    >
                      <QuestionOutlineIcon ml="5px" mt="-3px" />
                    </Tooltip>
                  </Header>
                  <Text>{exposure}</Text>
                </Box>
                <Box>
                  <Header text="Political Spending">
                    <Tooltip
                      label={POLITICAL_SPENDING_TEXT}
                      fontSize="sm"
                      fontWeight="normal"
                      bgColor="soft.gray"
                      placement="auto-start"
                    >
                      <QuestionOutlineIcon ml="5px" mt="-3px" />
                    </Tooltip>
                  </Header>
                  <Text>
                    {politicalSpending === 'N/A'
                      ? 'N/A'
                      : `$${politicalSpending.toLocaleString('en-US')}`}
                  </Text>
                </Box>
              </GridItem>
              <GridItem gridArea="e" height={['300px', 'auto']}>
                {stock ? (
                  <TradingViewWidget stockTicker={stock} />
                ) : (
                  <Flex
                    border="1px solid"
                    borderColor="soft.gray"
                    borderRadius="4px"
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text fontStyle="italic" color="normal.gray">
                      This company is not publicly traded.
                    </Text>
                  </Flex>
                )}
              </GridItem>
            </Grid>
            {(notes || hasSources) && (
              <Flex position="relative" bottom="-72px" width="100%" flexDir="column" p="10px 0">
                {notes && (
                  <Flex gap="5px">
                    <Text fontStyle="italic" fontSize="sm">
                      Notes:
                    </Text>
                    <Text fontStyle="italic" fontSize="sm">
                      {notes}
                    </Text>
                  </Flex>
                )}
                {hasSources && (
                  <Flex gap="5px" className="source-list">
                    <Text fontSize="sm" fontStyle="italic">
                      Sources:
                    </Text>
                    <Source source={corrections} name="Corrections" website={website} />
                    <Source source={laborSource} name="Prison Labor" />
                    <Source source={detentionSource} name="Immigration Detention" />
                    <Source source={financials} name="Financials" />
                    <Source source={other} name="Other" />
                  </Flex>
                )}
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Company;
