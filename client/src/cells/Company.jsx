import {
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
      <Heading fontSize="11px" color="rgb(0 0 0 / 70%)" textTransform="uppercase" _notFirst={{ marginTop: '10px' }}>
        {text}
        {children}
      </Heading>
    );
  }
  return (
    <Heading fontSize="11px" color="rgb(0 0 0 / 70%)" textTransform="uppercase" _notFirst={{ marginTop: '10px' }}>
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

  const companyName = active === 'Y' ? name : `${name} (no longer operating)`;
  const employeeCount = employees === 'N/A' ? 'N/A' : Number(employees).toLocaleString('en-US');
  const hasSources =
    isURL(detentionSource) || isURL(corrections) || isURL(laborSource) || isURL(other) || isURL(financials);

  return (
    <>
      <Text fontWeight="bold" _hover={{ textDecor: 'underline', cursor: 'pointer' }} onClick={onOpen}>
        {name}
      </Text>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalCloseButton />
        <ModalContent bgColor="soft.gray">
          <ModalHeader>
            {website ? (
              <Link to={website}>
                <Heading size="lg">
                  {companyName} <ExternalLinkIcon mx="2px" />
                </Heading>
              </Link>
            ) : (
              <Heading size="lg">{companyName}</Heading>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="20px">
            <Grid templateRows="1fr 1fr 1fr" templateColumns="1fr 1fr 1fr 1fr 1fr 1fr" gap="18px">
              <GridItem colSpan={2} borderRadius="10px" p="10px" bgColor="white" boxShadow="md">
                <Heading size="sm">Overview</Heading>
                <Header text="Year Founded" />
                <Text>{yearFounded}</Text>
                <Header text="Headquarters" />
                <Text>{state}</Text>
                <Header text="Employees" />
                <Text>{employeeCount}</Text>
              </GridItem>
              <GridItem colSpan={2} borderRadius="10px" p="10px" bgColor="white" boxShadow="md">
                <Heading size="sm">Corporate Structure</Heading>
                <Header text="Parent Company" />
                <Text>{parent}</Text>
                <Header text="Major Investor" />
                <Text>{owner}</Text>
                <Header text="Last Acquired" />
                <Text>{acquired}</Text>
                <Header text="Public Market Exposure" />
                <Text>{exposure}</Text>
              </GridItem>
              <GridItem colSpan={2} borderRadius="10px" p="10px" bgColor="white" boxShadow="md">
                <Heading size="sm">Sectors</Heading>
                <Header text="Sector" />
                <Text>{primarySector}</Text>
                <Header text="Subsector" />
                <Text>{subsector}</Text>
              </GridItem>
              <GridItem colSpan={2} borderRadius="10px" p="10px" bgColor="white" boxShadow="md">
                <Heading size="sm">Harm</Heading>
                <Header text="Harm Score">
                  <Tooltip label="Include a tooltip here about what a harm score is" fontSize="md">
                    <QuestionOutlineIcon ml="5px" mt="-3px" />
                  </Tooltip>
                </Header>
                <Text>{harmScore}</Text>
                <UnorderedList>
                  {divestment && <ListItem>Divestment Target</ListItem>}
                  {laborInvolvement && <ListItem>Prison Labor</ListItem>}
                  {detentionInvolvement && <ListItem>Immigration Detemtion</ListItem>}
                </UnorderedList>
              </GridItem>
              <GridItem colSpan={1} borderRadius="10px" p="10px" bgColor="white" boxShadow="md">
                <Heading size="sm">Financials</Heading>
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
                <Text>{politicalSpending}</Text>
              </GridItem>
              {stock && (
                <GridItem colSpan={3} rowSpan={2}>
                  <TradingViewWidget stockTicker={stock} />
                </GridItem>
              )}
              {notes && (
                <GridItem colSpan={2} borderRadius="10px" p="10px" bgColor="white" boxShadow="md">
                  <Heading size="sm">Notes</Heading>
                  <Text>{notes}</Text>
                </GridItem>
              )}

              {hasSources && (
                <GridItem colSpan={1} borderRadius="10px" p="10px" bgColor="white" boxShadow="md">
                  <Heading size="sm">Sources</Heading>
                  {isURL(corrections) && (
                    <Link to={corrections}>
                      Corrections <ExternalLinkIcon mx="2px" />
                    </Link>
                  )}
                  {isURL(laborSource) && (
                    <Link to={corrections}>
                      Prison Labor <ExternalLinkIcon mx="2px" />
                    </Link>
                  )}
                  {isURL(detentionSource) && (
                    <Link to={corrections}>
                      Immigration Detention <ExternalLinkIcon mx="2px" />
                    </Link>
                  )}
                  {isURL(financials) && (
                    <Link to={corrections}>
                      Financials <ExternalLinkIcon mx="2px" />
                    </Link>
                  )}
                  {isURL(other) && (
                    <Link to={corrections}>
                      Other <ExternalLinkIcon mx="2px" />
                    </Link>
                  )}
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
