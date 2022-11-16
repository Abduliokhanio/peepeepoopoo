import React from 'react';
import { supabasePrivate } from '../services/supabasePrivate';
import {
  Link, Flex, Heading, VStack, Text, Button, Box,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function OrderConfirmed() {

  const tableNumber = useSelector(state => state.merchant.tableNumber);

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
          <Heading size="lg">Thank you! </Heading>
          <Text textAlign="center">Your order will be out shortly</Text>
        </VStack>
        <VStack>
          <Box borderWidth="1px" width="100%" py="6">
            <Heading mb="6" size="lg" textAlign="center">Table #{tableNumber}</Heading>
            <Flex justify="space-between" px="6">
              <Text>Dumplings (5pcs)</Text>
              <Text>x1</Text>
            </Flex>
          </Box>
        </VStack>
        <Link as={ReachLink} to="/menu/nu">
          <Button width="100%">Keep Tab Open</Button>
        </Link>
        <Link as={ReachLink} to="/closed-tab">
          <Button width="100%" variant="outline">Close Tab</Button>
        </Link>
      </VStack>
    </Flex>
  );
}
