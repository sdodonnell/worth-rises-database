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
      <Button width="150px" variant="outline" colorScheme="black" fontWeight="normal">
        Filters
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="6xl"
        scrollBehavior="inside"
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent bgColor="white" overflow="visible">
          <ModalCloseButton
            top="-10px"
            right="-10px"
            bgColor="softer.gray"
            _hover={{ bgColor: 'soft.gray' }}
            _active={{ bgColor: 'soft.gray' }}
          />
          <ModalBody>
            <Filters setAllFilters={setAllFilters} setSearchTerm={setSearchTerm} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FilterModal;
