import React from 'react';
import {
  Box, Flex, Heading, Text, Spacer, Link,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';


export default function CheckoutButton() {
  return (
    <Link as={ReachLink} to="/checkout">
      <Box
        pos="absolute"
        bottom="0"
        width="100vw"
        py="6"
        backgroundColor="#60cb7b"
      >
        <Flex justifyContent="center" alignItems="center">
          <Spacer />
          <Text>3</Text>
          <Spacer />
          <Heading size="lg">View Order</Heading>
          <Spacer />
          <Text>$6.50</Text>
          <Spacer />
        </Flex>
      </Box>
    </Link>
  );
}
