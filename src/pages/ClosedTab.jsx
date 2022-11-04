import React from 'react';
import { Link as ReachLink } from 'react-router-dom';
import {
  Flex, Heading, VStack, Text, Button, Link,
} from '@chakra-ui/react';

export default function ClosedTab() {
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
          <Heading size="lg">Thanks for visiting!</Heading>
          <Text textAlign="center">{localStorage.getItem('merchantName')}</Text>
        </VStack>
        <Link as={ReachLink} to="/">
          <Button width="100%">Return to Menu</Button>
        </Link>
      </VStack>
    </Flex>
  );
}
