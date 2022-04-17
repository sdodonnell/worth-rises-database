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
              <Heading size="sm">Location</Heading>
              <Text>{state}</Text>
            </Box>
            <Box>
              <Heading size="sm">Harm Score</Heading>
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
              <Heading size="sm">Year Founded</Heading>
              <Text>{yearFounded}</Text>
            </Box>
            <Box>
              <Heading size="sm">Number of Employees</Heading>
              <Text>{employees}</Text>
            </Box>
            <Box>
              <Heading size="sm">Lead Executive</Heading>
              <Text>{executive}</Text>
            </Box>
            <Box>
              <Heading size="sm">Parent Company</Heading>
              <Text>{parent}</Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Company;
