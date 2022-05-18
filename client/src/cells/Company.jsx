import {
  Box,
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
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, ExternalLinkIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import React from 'react';
import TradingViewWidget from '../components/TradingViewWidget';

const Header = ({ text, children }) => {
  if (children) {
    return (
      <Heading fontSize="11px" color="rgb(0 0 0 / 70%)" textTransform="uppercase">
        {text}
        {children}
      </Heading>
    );
  }
  return (
    <Heading fontSize="11px" color="rgb(0 0 0 / 70%)" textTransform="uppercase" _notFirst={{ marginTop: "10px"}}>
      <Text>{text}</Text>
    </Heading>
  );
};

const CheckOrCloseIcon = isTrue => {
  if (isTrue) {
    return <CheckIcon />
  }

  return <CloseIcon />
}

const Company = ({ name, values }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    acquired = '--',
    active,
    company,
    corrections = '--',
    detention = '--',
    detentionInvolvement = '--',
    divestment = '--',
    employees = '--',
    executive = '--',
    exposure = '--',
    financials = '--',
    fiscalYear = '--',
    harmScore = 'Not calculated',
    labor,
    laborInvolvement = '--',
    notes,
    other,
    owner = '--',
    parent = '--',
    politicalSpending = '--',
    primarySector,
    revenueOnly = '--',
    revenues = '--',
    state,
    stock,
    website,
    yearFounded = '--',
  } = values;

  return (
    <>
      <Text fontWeight="bold" _hover={{ textDecor: 'underline', cursor: 'pointer' }} onClick={onOpen}>
        {name}
      </Text>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalCloseButton />
        <ModalContent bgColor="soft.gray">
          <ModalHeader>
            <Heading size="md">{company}</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateRows="auto 1fr 1fr 1fr" templateColumns="1fr 1fr 1fr 1fr" gap="18px">
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="md">
                {website && (
                  <Box>
                    <Header text="Website" />
                    <Link href={website} isExternal>
                      {website} <ExternalLinkIcon mx="2px" />
                    </Link>
                  </Box>
                )}
              </GridItem>
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="md">
                <Box>
                  <Header text="Year Founded" />
                  <Text>{yearFounded}</Text>
                </Box>
              </GridItem>
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="md">
                <Box>
                  <Header text="Active Brand?" />
                  <Text>{active}</Text>
                </Box>
              </GridItem>
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="md">
                <Box>
                  <Header text="Harm Score (3-15)">
                    <Tooltip label="Include a tooltip here about what a harm score is" fontSize="md">
                      <InfoOutlineIcon />
                    </Tooltip>
                  </Header>
                  <Text>{harmScore}</Text>
                </Box>
              </GridItem>
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="md">
                <Box>
                  <Header text="Headquarters" />
                  <Text>{state}</Text>
                  <Header text="Number of Employees" />
                  <Text>{Number(employees).toLocaleString('en-US') || '--'}</Text>
                </Box>
              </GridItem>
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="md">
                <Box>
                  <Header text="Last Acquired" />
                  <Text>{acquired}</Text>
                  <Header text="Lead Executive" />
                  <Text>{executive}</Text>
                  <Header text="Owner/Major Investor" />
                  <Text>{owner}</Text>
                  <Header text="Parent Company" />
                  <Text>{parent}</Text>
                </Box>
              </GridItem>
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="md">
                <Box>
                  <Header text="Primary Sector" />
                  <Text>{primarySector}</Text>
                  <Header text="Parent Public Exposure" />
                  <Text>{exposure}</Text>
                  <Header text="Parent Stock Ticker" />
                  <Text>{stock || '--'}</Text>
                </Box>
              </GridItem>
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="md">
                <Box>
                  <Header text="Annual Revenues (Mn)" />
                  <Text>{revenues}</Text>
                  <Header text="Prison Industry Revenue Only" />
                  <Text>{revenueOnly}</Text>
                  <Header text="Revenue Fiscal Year" />
                  <Text>{fiscalYear}</Text>
                  <Header text="Financials" />
                  <Text>{financials}</Text>
                </Box>
              </GridItem>
              {stock && (
                <GridItem colSpan={2} rowSpan={2}>
                  <TradingViewWidget stockTicker={stock} />
                </GridItem>
              )}
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="md">
                <Box>
                  <Header text="Political Spending">
                    <Tooltip label="Cumulative Since 2010" fontSize="md">
                      <InfoOutlineIcon />
                    </Tooltip>
                  </Header>
                  <Text>{politicalSpending}</Text>
                </Box>
              </GridItem>
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="md">
                <SimpleGrid templateColumns="auto 20px">
                  <Header text="Immigration Detention" />
                  <CheckOrCloseIcon isTrue={detention} />
                  <Header text="Immigration Detention Involvement" />
                  <CheckOrCloseIcon isTrue={detentionInvolvement} />
                  <Header text="Prison Labor" />
                  <CheckOrCloseIcon isTrue={labor} />
                  <Header text="Supports Prison Labor" />
                  <CheckOrCloseIcon isTrue={laborInvolvement} />
                  <Header text="Divestment (Y/N)" />
                  <CheckOrCloseIcon isTrue={divestment} />
                </SimpleGrid>
              </GridItem>
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="md">
                {notes && (
                  <Box>
                    <Header text="Notes" />
                    <Text>{notes}</Text>
                  </Box>
                )}
                {corrections && (
                  <Box>
                    <Header text="Corrections" />
                    <Text>{corrections}</Text>
                  </Box>
                )}
                {other && (
                  <Box>
                    <Header text="Other" />
                    <Text>{other}</Text>
                  </Box>
                )}
              </GridItem>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Company;
