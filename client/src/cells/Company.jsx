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
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { ExternalLinkIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import React from 'react';

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
    stock = '--',
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
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="1px">
                {website && (
                  <Box>
                    <Heading size="sm">Website</Heading>
                    <Link href={website} isExternal>
                      {website} <ExternalLinkIcon mx="2px" />
                    </Link>
                  </Box>
                )}
              </GridItem>
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="1px">
                <Box>
                  <Heading size="sm">Year Founded</Heading>
                  <Text>{yearFounded}</Text>
                </Box>
              </GridItem>
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="1px">
                <Box>
                  <Heading size="sm">Active Brand?</Heading>
                  <Text>{active}</Text>
                </Box>
              </GridItem>
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="1px">
                <Box>
                  <Heading size="sm">
                    Harm Score (3-15){' '}
                    <Tooltip label="Include a tooltip here about what a harm score is" fontSize="md">
                      <InfoOutlineIcon />
                    </Tooltip>
                  </Heading>
                  <Text>{harmScore}</Text>
                </Box>
              </GridItem>
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="1px">
                <Box>
                  <Heading size="sm">Headquarters</Heading>
                  <Text>{state}</Text>
                  <Heading size="sm">Number of Employees</Heading>
                  <Text>{Number(employees).toLocaleString('en-US') || '--'}</Text>
                </Box>
              </GridItem>
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="1px">
                <Box>
                  <Heading size="sm">Last Acquired</Heading>
                  <Text>{acquired}</Text>
                  <Heading size="sm">Lead Executive</Heading>
                  <Text>{executive}</Text>
                  <Heading size="sm">Owner/Major Investor</Heading>
                  <Text>{owner}</Text>
                  <Heading size="sm">Parent Company</Heading>
                  <Text>{parent}</Text>
                </Box>
              </GridItem>
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="1px">
                <Box>
                  <Heading size="sm">Primary Sector</Heading>
                  <Text>{primarySector}</Text>
                  <Heading size="sm">Parent Public Exposure</Heading>
                  <Text>{exposure}</Text>
                  <Heading size="sm">Parent Stock Ticker</Heading>
                  <Text>{stock}</Text>
                </Box>
              </GridItem>
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="1px">
                <Box>

                  <Heading size="sm">Annual Revenues (Mn)</Heading>
                  <Text>{revenues}</Text>
                  <Heading size="sm">Prison Industry Revenue Only</Heading>
                  <Text>{revenueOnly}</Text>
                  <Heading size="sm">Revenue Fiscal Year</Heading>
                  <Text>{fiscalYear}</Text>
                  <Heading size="sm">Financials</Heading>
                  <Text>{financials}</Text>
                </Box>
              </GridItem>
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="1px">
                <Box>
                  <Heading size="sm">
                    Political Spending{' '}
                    <Tooltip label="Cumulative Since 2010" fontSize="md">
                      <InfoOutlineIcon />
                    </Tooltip>
                  </Heading>
                  <Text>{politicalSpending}</Text>
                </Box>
              </GridItem>
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="1px">
                <Box>
                  <Heading size="sm">Immigration Detention</Heading>
                  <Text>{detention  ? 'Y' : 'N'}</Text>
                  <Heading size="sm">Immigration Detention Involvement</Heading>
                  <Text>{detentionInvolvement ? 'Y' : 'N'}</Text>
                  <Heading size="sm">Prison Labor</Heading>
                  <Text>{labor ? 'Y' : 'N'}</Text>
                  <Heading size="sm">Supports Prison Labor</Heading>
                  <Text>{laborInvolvement ? 'Y' : 'N'}</Text>
                  <Heading size="sm">Divestment (Y/N)</Heading>
                  <Text>{divestment  ? 'Y' : 'N'}</Text>
                </Box>
              </GridItem>
              <GridItem borderRadius="10px" p="10px" bgColor="white" boxShadow="1px">
                {notes && (
                  <Box>
                    <Heading size="sm">Notes</Heading>
                    <Text>{notes}</Text>
                  </Box>
                )}
                {corrections && (
                  <Box>
                    <Heading size="sm">Corrections</Heading>
                    <Text>{corrections}</Text>
                  </Box>
                )}
                {other && (
                  <Box>
                    <Heading size="sm">Other</Heading>
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
