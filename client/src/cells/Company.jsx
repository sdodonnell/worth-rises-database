import {
  Box,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

const Company = ({ name, values }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    company,
    state,
    primarySector,
    active,
    yearFounded = '--',
    employees = '--',
    revenueOnly,
    exposure = '--',
    executive = '--',
    parent = '--',
    revenues,
    labor,
    divestment,
    detention,
    harmScore = 'Not calculated',
  } = values;

  return (
    <>
      <Text fontWeight="bold" _hover={{ textDecor: 'underline', cursor: 'pointer' }} onClick={onOpen}>
        {name}
      </Text>
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalCloseButton />
        <ModalContent>
          <ModalHeader>
            <Heading size="md">{company}</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box>
              <Heading size="sm">Active Brand?</Heading>
              <Text>{active}</Text>
            </Box>
            <Box>
              <Heading size="sm">Headquarters</Heading>
              <Text>{state}</Text>
            </Box>
            <Box>
            <Box>
              <Heading size="sm">Number of Employees</Heading>
              <Text>{Number(employees).toLocaleString('en-US') || '--'}</Text>
            </Box>
            <Box>
              <Heading size="sm">Year Founded</Heading>
              <Text>{yearFounded}</Text>
            </Box>
            <Box>
              <Heading size="sm">Lead Executive</Heading>
              <Text>{executive}</Text>
            </Box>
              <Heading size="sm">Harm Score (3-15)</Heading>
              <Text>{harmScore}</Text>
            </Box>
            <Box>
              <Heading size="sm">Primary Sector</Heading>
              <Text>{primarySector}</Text>
            </Box>
            <Box>
              <Heading size="sm">Parent Public Exposure</Heading>
              <Text>{exposure}</Text>
            </Box>
            <Box>
              <Heading size="sm">Parent Company</Heading>
              <Text>{parent}</Text>
            </Box>
            <Box>
              <Heading size="sm">Supports Prison Labor</Heading>
              <Text>{labor ? 'Y' : 'N'}</Text>
            </Box>
            <Box>
              <Heading size="sm">Divestment (Y/N)</Heading>
              <Text>{divestment}</Text>
            </Box>
            <Box>
              <Heading size="sm">Immigration Detention Involvement</Heading>
              <Text>{detention ? 'Y' : 'N'}</Text>
            </Box>
            <Box>
              <Heading size="sm">Annual Revenues (Mn)</Heading>
              <Text>{revenues}</Text>
            </Box>
            <Box>
              <Heading size="sm">Prison Industry Revenue Only</Heading>
              <Text>{revenueOnly}</Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Company;
