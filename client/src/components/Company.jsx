import {
  Flex,
  Grid,
  GridItem,
  Heading,
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
import { ExternalLinkIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import React from 'react';
import isURL from 'validator/es/lib/isURL';
import TradingViewWidget from '../components/TradingViewWidget';

const Header = ({ text, children }) => {
  if (children) {
    return (
      <Heading fontSize="11px" color="normal.gray" textTransform="uppercase" _notFirst={{ marginTop: '10px' }}>
        {text}
        {children}
      </Heading>
    );
  }
  return (
    <Heading fontSize="11px" color="normal.gray" textTransform="uppercase" _notFirst={{ marginTop: '10px' }}>
      <Text>{text}</Text>
    </Heading>
  );
};

const Company = ({ name, values }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    acquired = 'N/A',
    active,
    corrections = '',
    detentionSource = '',
    detentionInvolvement = 'N/A',
    divestment = 'N/A',
    employees = 'N/A',
    executive = 'N/A',
    exposure = 'N/A',
    financials = '',
    fiscalYear = 'N/A',
    harmScore = 'N/A',
    laborSource = '',
    laborInvolvement = 'N/A',
    notes,
    other = '',
    owner = 'N/A',
    parent = 'N/A',
    politicalSpending = 'N/A',
    primarySector,
    revenueOnly,
    revenues = 'N/A',
    state,
    stock,
    subsector,
    website,
    yearFounded = 'N/A',
  } = values;

  const employeeCount = employees === 'N/A' ? 'N/A' : Number(employees).toLocaleString('en-US');
  const hasSources =
    isURL(detentionSource) || isURL(corrections) || isURL(laborSource) || isURL(other) || isURL(financials);

  const companyHeading =
    active === 'Y' ? (
      <Heading size="lg">{name}</Heading>
    ) : (
      <Flex gap="5px" alignItems="baseline">
        <Heading size="lg">{name}</Heading>
        <Text size="md">(brand not active)</Text>
      </Flex>
    );

  return (
    <>
      <Text fontWeight="bold" _hover={{ textDecor: 'underline', cursor: 'pointer' }} onClick={onOpen}>
        {name}
      </Text>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalCloseButton />
        <ModalContent bgColor="soft.gray">
          <ModalHeader color="normal.purple">
            {website ? (
              <Link href={website}>
                <Flex alignItems="baseline">
                  {companyHeading}
                  <ExternalLinkIcon mx="2px" />
                </Flex>
              </Link>
            ) : (
              companyHeading
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="20px">
            <Grid templateRows="1fr 1fr 1fr" templateColumns="repeat(8, 1fr)" gap="18px">
              <GridItem
                colSpan={2}
                borderRadius="10px"
                p="10px"
                bgColor="white"
                borderLeft="5px solid"
                borderColor="normal.green"
                boxShadow="md"
              >
                <Heading size="sm" color="normal.purple">
                  Overview
                </Heading>
                <Header text="Year Founded" />
                <Text>{yearFounded}</Text>
                <Header text="Headquarters" />
                <Text>{state}</Text>
                <Header text="Employees" />
                <Text>{employeeCount}</Text>
                <Header text="Lead Executive" />
                <Text>{executive}</Text>
              </GridItem>
              <GridItem
                colSpan={2}
                borderRadius="10px"
                p="10px"
                bgColor="white"
                borderLeft="5px solid"
                borderColor="normal.green"
                boxShadow="md"
              >
                <Heading size="sm" color="normal.purple">
                  Corporate Structure
                </Heading>
                <Header text="Parent Company" />
                <Text>{parent}</Text>
                <Header text="Major Investor" />
                <Text>{owner}</Text>
                <Header text="Last Acquired" />
                <Text>{acquired}</Text>
                <Header text="Public Market Exposure" />
                <Text>{exposure}</Text>
              </GridItem>
              <GridItem
                colSpan={2}
                borderRadius="10px"
                p="10px"
                bgColor="white"
                borderLeft="5px solid"
                borderColor="normal.green"
                boxShadow="md"
              >
                <Heading size="sm" color="normal.purple">
                  Sectors
                </Heading>
                <Header text="Sector" />
                <Text>{primarySector}</Text>
                <Header text="Subsector" />
                <Text>{subsector}</Text>
              </GridItem>
              <GridItem
                colSpan={2}
                borderRadius="10px"
                p="10px"
                bgColor="white"
                borderLeft="5px solid"
                borderColor="normal.green"
                boxShadow="md"
              >
                <Heading size="sm" color="normal.purple">
                  Harm Score: {harmScore}
                  <Tooltip label="Include a tooltip here about what a harm score is" fontSize="md">
                    <QuestionOutlineIcon ml="5px" mt="-3px" />
                  </Tooltip>
                </Heading>
                <UnorderedList>
                  {divestment && <ListItem>Divestment Target</ListItem>}
                  {laborInvolvement && <ListItem>Prison Labor</ListItem>}
                  {detentionInvolvement && <ListItem>Immigration Detemtion</ListItem>}
                </UnorderedList>
              </GridItem>
              <GridItem
                colSpan={2}
                borderRadius="10px"
                p="10px"
                bgColor="white"
                borderLeft="5px solid"
                borderColor="normal.green"
                boxShadow="md"
              >
                <Heading size="sm" color="normal.purple">
                  Financials
                </Heading>
                <Header text="Annual Revenues ($Mn)" />
                <Text>{revenues}</Text>
                <Header text="Prison Industry Revenue Only?" />
                <Text>{revenueOnly ? 'Y' : 'N'}</Text>
                <Header text="Revenue Fiscal Year" />
                <Text>{fiscalYear}</Text>
                <Header text="Political Spending">
                  <Tooltip label="Cumulative Since 2010" fontSize="md">
                    <QuestionOutlineIcon ml="5px" mt="-3px" />
                  </Tooltip>
                </Header>
                <Text>{politicalSpending === 'N/A' ? 'N/A' : `$${politicalSpending}`}</Text>
              </GridItem>
              {notes && (
                <GridItem
                  colSpan={2}
                  borderRadius="10px"
                  p="10px"
                  bgColor="white"
                  borderLeft="5px solid"
                  borderColor="normal.green"
                  boxShadow="md"
                >
                  <Heading size="sm" color="normal.purple">
                    Notes
                  </Heading>
                  <Text>{notes}</Text>
                </GridItem>
              )}

              {hasSources && (
                <GridItem
                  colSpan={2}
                  borderRadius="10px"
                  p="10px"
                  bgColor="white"
                  borderLeft="5px solid"
                  borderColor="normal.green"
                  boxShadow="md"
                >
                  <Heading size="sm" color="normal.purple">
                    Sources
                  </Heading>
                  {isURL(corrections) && (
                    <Link href={corrections} isExternal>
                      Corrections <ExternalLinkIcon mx="2px" />
                    </Link>
                  )}
                  {isURL(laborSource) && (
                    <Link href={laborSource} isExternal>
                      Prison Labor <ExternalLinkIcon mx="2px" />
                    </Link>
                  )}
                  {isURL(detentionSource) && (
                    <Link href={detentionSource} isExternal>
                      Immigration Detention <ExternalLinkIcon mx="2px" />
                    </Link>
                  )}
                  {isURL(financials) && (
                    <Link href={financials} isExternal>
                      Financials <ExternalLinkIcon mx="2px" />
                    </Link>
                  )}
                  {isURL(other) && (
                    <Link href={other} isExternal>
                      Other <ExternalLinkIcon mx="2px" />
                    </Link>
                  )}
                </GridItem>
              )}

              {stock && (
                <GridItem colSpan={4} rowSpan={2}>
                  <TradingViewWidget stockTicker={stock} />
                </GridItem>
              )}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Company;
