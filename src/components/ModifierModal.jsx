import React from 'react';
import {
  useNumberInput,
  Radio, RadioGroup, Stack, Heading, Image, Text, Flex, Spacer, Textarea, HStack, Input,
  Modal, Button, ModalOverlay, ModalCloseButton, ModalContent, ModalFooter, ModalBody,
} from '@chakra-ui/react';

function modifierButton(modifier) {
  if (modifier === 'new') {
    return (
      <Button colorScheme="blue">
        Add to Order
      </Button>
    );
  }
  return (
    <Button colorScheme="blue">
      Update
    </Button>
  );
}

export default function ModifierModal({ isOpen, onClose, modifierType }) {
  const [value, setValue] = React.useState('1');
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 20,
    precision: 0,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx="6">
        <Image maxH="10rem" objectFit="cover" src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZHVtcGxpbmdzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60" />
        <ModalCloseButton />
        <ModalBody>
          <Stack direction="row" my="4">
            <Flex>
              <Heading size="md" mr="1">Dumplings</Heading>
              <Text>(5 Pcs)</Text>
            </Flex>
            <Spacer />
            <Text>$2.00</Text>
          </Stack>
          <Heading fontSize="md" pb="2">Choose Style</Heading>
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction="column">
              <Radio value="1">First</Radio>
              <Radio value="2">Second</Radio>
              <Radio value="3">Third</Radio>
            </Stack>
          </RadioGroup>
          <Heading fontSize="md" mt="4" pb="2">Special instructions</Heading>
          <Textarea placeholder="Add any requests here." />
        </ModalBody>
        <ModalFooter pb="6">
          <Stack width="100%">
            <Flex justifyContent="center" mb="4">
              <HStack maxW="320px">
                <Button {...inc}>+</Button>
                <Input maxW="75px" textAlign="center" {...input} />
                <Button {...dec}>-</Button>
              </HStack>
            </Flex>
            {modifierButton(modifierType)}
            <Button onClick={onClose}>Cancel</Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
