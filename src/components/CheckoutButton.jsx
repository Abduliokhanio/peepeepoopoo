import React, { useEffect } from 'react';
import {
  Box, Flex, Heading, Text
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CheckoutButton() {
  const cart = useSelector(state => state.cart.items);
  const pendingOrders = cart.filter(item => item.sentToKitchen === false);
  const pendingOrdersTotalCount = pendingOrders.reduce((acc, item) => acc + parseInt(item.quantity), 0);
  const pendingOrdersTotalPrice = pendingOrders.reduce((acc, item) => acc + (parseInt(item.quantity) * parseFloat(item.item.price)), 0);
  const unPaidOrders = cart.filter(item => item.paid === false);
  const navigate = useNavigate();

  return (pendingOrders.length > 0 ? (
    <Flex
      onClick={() => navigate('/cart/checkout')}
      pos="fixed"
      bottom="0" 
      backdropFilter="blur(5px)"
      borderTop='1px solid rgba(255, 255, 255, 0.1)'
      bg="RGBA(255, 255, 255, 0.90)" 
      py="4" 
      w="100%" 
      justifyContent="center">
      <Box
        mx="6"
        w="100%"
        py="5"
        borderRadius="md"
        bg='black'
      >
        <Flex justifyContent='space-around' alignItems="center">
          <Box px="3" py="1" bg="white" borderRadius="md">
            <Text color="black" fontWeight="bold">{pendingOrdersTotalCount}</Text>
          </Box>
          <Heading color="white" fontWeight='semibold' size="md">View order</Heading>
          <Text color="white" mt="1" fontSize='1.1em' fontWeight='semibold'>${pendingOrdersTotalPrice.toFixed(2)}</Text>
        </Flex>
      </Box>
    </Flex>
  ) : null);
}