import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { ExternalLinkIcon, InfoOutlineIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import React from 'react';
import { isURL } from 'validator';
import TradingViewWidget from './TradingViewWidget';
import { HARM_SCORE_TEXT, POLITICAL_SPENDING_TEXT } from './copyUtils';

const Header = ({ text, children, ...props }) => {
  if (children) {
    return (
      <Heading fontSize="sm" color="normal.gray" textTransform="uppercase" _notFirst={{ marginTop: '10px' }} {...props}>
        {text}
        {children}
      </Heading>
    );
  }
  return (
    <Heading fontSize="sm" color="normal.gray" textTransform="uppercase" _notFirst={{ marginTop: '10px' }} {...props}>
      <Text>{text}</Text>
    </Heading>
  );
};

const Source = ({ source, name }) => {
  if (!source) return null;

  if (isURL(source)) {
    return (
      <Link href={source} isExternal className="source">
        <Text fontSize="sm" fontStyle="italic" textDecor="underline">
          {name} <ExternalLinkIcon mx="2px" />
        </Text>
      </Link>
    );
  }

  return (
    <Text fontSize="sm" fontStyle="italic" className="source">
      {name}: {source}
    </Text>
  );
};

const Company = ({ name, values }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    acquired = 'N/A',
    active,
    corrections = '',
    detentionSource = '',
    employees = 'N/A',
    executive = 'N/A',
    exposure = 'N/A',
    financials = '',
    fiscalYear = 'N/A',
    harmScore = 'N/A',
    laborSource = '',
    notes,
    other = '',
    owner = 'N/A',
    parent = 'N/A',
    politicalSpending = 'N/A',
    primarySector,
    responsibility,
    responsiveness,
    revenueOnly,
    revenues,
    salience,
    state,
    stock,
    subsector,
    website,
    yearFounded = 'N/A',
  } = values;

  const employeeCount = employees === 'N/A' ? 'N/A' : Number(employees).toLocaleString('en-US');
  const hasSources = detentionSource || corrections || laborSource || other || financials;

  const companyHeading =
    active === 'Y' ? (
      <Heading size="lg">{name}</Heading>
    ) : (
      <Heading size="lg">
        {name} <span style={{ fontSize: '16px' }}>(brand not active)</span>
      </Heading>
    );

  const template = `"a a a a"
                    "b b b b"
                    "c d e e"
                    `;

  return (
    <>
      <Text fontWeight="bold" _hover={{ textDecor: 'underline', cursor: 'pointer' }} onClick={onOpen}>
        {name}
      </Text>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalCloseButton />
        <ModalContent bgColor="white" overflow="hidden">
          <ModalHeader color="black" pt="24px" pb="0">
            {website ? (
              <Link href={website} isExternal>
                <Flex alignItems="baseline" gap="5px">
                  {companyHeading}
                  <ExternalLinkIcon mx="2px" />
                </Flex>
              </Link>
            ) : (
              companyHeading
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="72px">
            <Grid templateAreas={template} templateRows={`20px 80px 336px`} templateColumns="repeat(4, 1fr)" gap="28px">
              <GridItem gridArea="a" display="flex" gap="28px">
                <Text>
                  <Text as="span" fontWeight="bold" fontSize="sm" textTransform="uppercase" fontFamily="heading">
                    Sector:{' '}
                  </Text>
                  {primarySector}
                </Text>
                <Text>
                  <Text as="span" fontWeight="bold" fontSize="sm" textTransform="uppercase" fontFamily="heading">
                    Subsector:{' '}
                  </Text>
                  {subsector}
                </Text>
              </GridItem>
              <GridItem
                gridArea="b"
                display="flex"
                justifyContent="space-between"
                borderBottom="1px solid black"
                pb="28px"
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
                    <Flex bgColor="soft.gray" w="228px" justifyContent="center" alignItems="center">
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
                    <Tooltip label={HARM_SCORE_TEXT} fontSize="sm" bgColor="soft.gray" placement="auto-start">
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
              </GridItem>
              <GridItem gridArea="c" display="flex" flexDir="column" justifyContent="space-between">
                <Box>
                  <Header text="Public Market Exposure" />
                  <Text>{exposure}</Text>
                </Box>
                <Box>
                  <Header text="Parent Company" />
                  <Text>{parent}</Text>
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
              <GridItem gridArea="d" display="flex" flexDir="column" justifyContent="space-between">
                <Box>
                  <Header text="Annual Revenue" />
                  <Text fontSize={revenues ? '5xl' : 'md'} fontWeight={revenues ? 'light' : 'normal'}>
                    {revenues ? `${revenues} M` : 'N/A'}
                  </Text>
                </Box>
                <Box>
                  <Header text="Revenue Fiscal Year" />
                  <Text>{fiscalYear}</Text>
                </Box>
                <Box>
                  <Header text="Prison Industry Revenue Only" />
                  <Text>{revenueOnly ? 'Yes' : 'No'}</Text>
                </Box>
                <Box>
                  <Header text="Political Spending">
                    <Tooltip label={POLITICAL_SPENDING_TEXT} fontSize="sm" bgColor="soft.gray" placement="auto-start">
                      <QuestionOutlineIcon ml="5px" mt="-3px" />
                    </Tooltip>
                  </Header>
                  <Text>{politicalSpending === 'N/A' ? 'N/A' : `$${politicalSpending}`}</Text>
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
                    <Source source={corrections} name="Corrections" />
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
