import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import Filters from './Filters';

const FilterModal = ({ setAllFilters, setSearchTerm }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        width="150px"
        variant="outline"
        colorScheme="black"
        fontWeight="normal"
        onClick={onOpen}
      >
        Filters
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="xl">
        <ModalOverlay />
        <ModalContent bgColor="white" mx="16px">
          <ModalCloseButton
            top="-10px"
            right="-10px"
            borderRadius="20px"
            bgColor="softer.gray"
            _active={{ bgColor: 'soft.gray' }}
          />
          <ModalBody p="24px">
            <Filters setAllFilters={setAllFilters} setSearchTerm={setSearchTerm} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FilterModal;
