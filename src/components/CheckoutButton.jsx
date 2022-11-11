import React from 'react';
import {
  Box, Flex, Heading, Text
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export default function CheckoutButton({ handleCheckout }) {
  const cart = useSelector(state => state.cart.items);
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
  
  return (cart.length > 0 ? (
    <Flex
      onClick={handleCheckout}
      pos="fixed"
      bottom="0" 
      bg="RGBA(255, 255, 255, 0.90)" 
      py="4" 
      blur="40%" w="100%" justifyContent="center">
      <Box
        mx="6"
        w="100%"
        py="5"
        borderRadius="md"
        backgroundColor={'black'}
      >
        <Flex justifyContent='space-around' alignItems="center">
          <Box px="3" py="1" bg="white" borderRadius="md">
            <Text color="black" fontWeight="bold">{cart.length}</Text>
          </Box>
          <Heading color="white" fontWeight='semibold' size="md">View order</Heading>
          <Text color="white" mt="1" fontSize='1.1em' fontWeight='semibold'>${totalPrice}</Text>
        </Flex>
      </Box>
    </Flex>
  ) : null);
}