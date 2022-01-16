import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import Page from "./Page";

interface Props {
  children: React.ReactNode;
  onHandleClose?: () => void;
  placeholder?: string;
  title?: string;
}

export const LomModal = ({
  children,
  onHandleClose,
  placeholder,
  title
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Page>
      <Button onClick={onOpen}>{placeholder}</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Page>
  );

  //   return (
  //     <Styled.Wrapper>
  //       <Styled.Modal>
  //         {onHandleClose && (
  //           <Styled.CloseIcon
  //             src="/assets/icons/close.svg"
  //             onClick={() => onHandleClose()}
  //           />
  //         )}
  //         {children}
  //       </Styled.Modal>
  //     </Styled.Wrapper>
  //   );
};
