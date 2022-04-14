import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
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
  } = values;

  return (
    <>
      <Text fontWeight="bold" _hover={{ textDecor: 'underline', cursor: 'pointer' }} onClick={onOpen}>
        {name}
      </Text>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalCloseButton />
        <ModalContent>
          <ModalHeader>{company}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <div>
            <h3>Year Founded</h3>
            <h2>{yearFounded}</h2>
          </div>
          <div>
            <h3>Number of Employees</h3>
            <h2>{employees}</h2>
          </div>
          <div>
            <h3>Lead Executive</h3>
            <h2>{executive}</h2>
          </div>
          <div>
            <h3>Parent Company</h3>
            <h2>{parent}</h2>
          </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Company;
