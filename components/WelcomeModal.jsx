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
import { WELCOME_HEADER_TEXT, WELCOME_SUBHEAD_TEXT } from './utils/copyUtils';

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
        <ModalContent p="48px 40px" textAlign="center">
          <ModalHeader p="0" mb="10px">{WELCOME_HEADER_TEXT}</ModalHeader>
          <ModalBody p="0" fontWeight="light">
            {WELCOME_SUBHEAD_TEXT}
          </ModalBody>
          <ModalFooter p="0" mt="20px" justifyContent="flex-start">
            <Button
              bgColor="normal.purple"
              m="0 auto"
              onClick={handleClose}
              px="40px"
              borderRadius="4px"
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WelcomeModal;
