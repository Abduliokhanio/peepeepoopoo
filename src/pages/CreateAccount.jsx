import React from 'react';
import {
  Flex, Link, Heading, Input, VStack, Text, Button, InputGroup, InputLeftAddon, InputLeftElement,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';

export default function CreateAccount() {
  return (
    <Flex
      mt="20"
      direction="column"
    >
      <VStack
        spacing={4}
        align="stretch"
        px="6"
      >
        <VStack px="6" h="20" mb="6" alignItems="center">
          <Heading size="lg">
            Receive Order Updates
          </Heading>
          <Text textAlign="center">1-click checkout, reward points, updates, and more. This creates an account.</Text>
        </VStack>
        <Input placeholder="Full Name" size="md" />
        <InputGroup>
          <InputLeftAddon children="+1" />
          <Input type="tel" placeholder="Phone Number" size="md" />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children="@"
          />
          <Input placeholder="Email" size="md" />
        </InputGroup>
        <Link as={ReachLink} to="/order-confirmed">
          <Button width="100%">Get Updates</Button>
        </Link>
      </VStack>
    </Flex>
  );
}
