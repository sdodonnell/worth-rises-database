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
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import React, { useEffect } from 'react';
import * as NextLink from 'next/link';
import { isURL } from 'validator';
import TradingViewWidget from './TradingViewWidget';
import { HARM_SCORE_TEXT, POLITICAL_SPENDING_TEXT } from './utils/copyUtils';
import { useRouter } from 'next/router';
import { sectorMapping } from './utils/dataUtils';

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

  const template = `"a a a a"
                    "c d e e"
                    `;

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
        <ModalContent bgColor="white" overflow="visible">
          <ModalHeader color="black" pt="24px" pb="0">
            <Flex justifyContent="space-between" alignItems="baseline">
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
          <ModalBody pb="72px">
            <Grid
              templateAreas={template}
              templateRows="200px 290px"
              templateColumns="repeat(4, 1fr)"
              gap="28px"
            >
              <GridItem gridArea="a">
                <Grid
                  gridTemplateColumns="2fr 1fr"
                  height="100%"
                  padding="20px 0"
                  borderTop="1px solid black"
                  borderBottom="1px solid black"
                  gap="20px"
                >
                  <GridItem
                    display="grid"
                    gridTemplateColumns="repeat(4, 1fr)"
                    gridTemplateRows="1fr 1fr"
                    borderRight="1px solid black"
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
                  <GridItem px="24px">
                    <Grid templateColumns="280px 30px" templateRows="44px 22px">
                      <GridItem
                        display="flex"
                        id="harm-score"
                        w="280px"
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
                        <Flex bgColor="black" w="52px" justifyContent="center" alignItems="center">
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
                      <GridItem display="flex" mt="6px" alignItems="center" overflow="hidden">
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
                      <Text
                        display="flex"
                        alignItems="center"
                        gap="5px"
                        color={divestment ? 'normal.red' : 'black'}
                        fontWeight={divestment ? 'bold' : 'normal'}
                      >
                        {divestment ? (
                          <Icon as={MdCheckBox} />
                        ) : (
                          <Icon as={MdCheckBoxOutlineBlank} />
                        )}
                        Divestment Target
                      </Text>
                      <Text
                        display="flex"
                        alignItems="center"
                        gap="5px"
                        color={laborInvolvement ? 'normal.red' : 'black'}
                        fontWeight={laborInvolvement ? 'bold' : 'normal'}
                      >
                        {laborInvolvement ? (
                          <Icon as={MdCheckBox} />
                        ) : (
                          <Icon as={MdCheckBoxOutlineBlank} />
                        )}
                        Supports Prison Labor
                      </Text>
                      <Text
                        display="flex"
                        alignItems="center"
                        gap="5px"
                        color={detentionInvolvement ? 'normal.red' : 'black'}
                        fontWeight={detentionInvolvement ? 'bold' : 'normal'}
                      >
                        {detentionInvolvement ? (
                          <Icon as={MdCheckBox} />
                        ) : (
                          <Icon as={MdCheckBoxOutlineBlank} />
                        )}
                        Involved in Immigration Detention
                      </Text>
                    </Flex>
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem gridArea="c" display="flex" flexDir="column" justifyContent="space-between">
                <Box>
                  <Header text="Sector" />
                  {sectors.map((sectorName) => {
                    return (
                      <>
                        <Text fontSize="md" fontWeight="bold">
                          {sectorName}
                        </Text>
                        <UnorderedList marginInlineStart="2em">
                          {sectorMapping[sectorName].map((subsectorName) => {
                            if (subsectors.includes(subsectorName)) {
                              return <ListItem>{subsectorName}</ListItem>;
                            }
                          })}
                        </UnorderedList>
                      </>
                    );
                  })}
                </Box>
              </GridItem>
              <GridItem gridArea="d" display="flex" flexDir="column" justifyContent="space-between">
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
                      <Text fontSize="5xl" fontWeight="light">
                        {revenues} M{' '}
                      </Text>
                      {revenueOnly && (
                        <Text display="flex" alignItems="center" gap="5px" color="normal.red">
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
                      label={POLITICAL_SPENDING_TEXT}
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
              <GridItem gridArea="e">
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
