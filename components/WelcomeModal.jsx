import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { useEffect } from 'react';

const WelcomeModal = ({ isFirstTime, setVisitedCookie }) => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClose = () => {
    setVisitedCookie();
    onClose();
  };

  useEffect(() => {
    setShowWelcomeModal(isFirstTime);
  }, []);

  useEffect(() => {
    if (showWelcomeModal) {
      onOpen();
    }
  }, [showWelcomeModal]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent p="48px 40px">
          <ModalHeader p="0">Welcome to the Prison Industry Database</ModalHeader>
          <ModalBody p="0" fontWeight="light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </ModalBody>
          <ModalFooter p="0" mt="30px" justifyContent="flex-start">
            <Button bgColor="normal.purple" m="0 auto" onClick={handleClose} px="40px" borderRadius="4px">
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WelcomeModal;
