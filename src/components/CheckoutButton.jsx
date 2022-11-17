import React, { useEffect } from 'react';
import {
  Box, Flex, Heading, Text
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CheckoutButton() {
  const cart = useSelector(state => state.cart.items);

  const cartTotalCount = cart.reduce((acc, item) => acc + parseInt(item.quantity), 0);
  const cartTotalPrice = cart.reduce((acc, item) => acc + (parseInt(item.quantity) * parseFloat(item.item.price)), 0);
  const pendingOrders = cart.filter(item => item.orderSent === false);
  const pendingOrdersTotalCount = pendingOrders.reduce((acc, item) => acc + parseInt(item.quantity), 0);
  const pendingOrdersTotalPrice = pendingOrders.reduce((acc, item) => acc + (parseInt(item.quantity) * parseFloat(item.item.price)), 0);
  const unPaidOrders = cart.filter(item => item.paid === false);
  const unPaidOrdersTotalPrice = unPaidOrders.reduce((acc, item) => acc + (parseInt(item.quantity) * parseFloat(item.item.price)), 0);
  
  const cartUnpaidCount = unPaidOrders.reduce((acc, item) => acc + parseInt(item.quantity), 0);
  const isTabOpen = useSelector(state => state.merchant.isTabOpen);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('pendingOrders', pendingOrders);
  }, [cart]);

  return (pendingOrders.length > 0 ? (
    <Flex
      onClick={() => navigate('/cart/checkout')}
      pos="fixed"
      bottom="0" 
      bg="RGBA(255, 255, 255, 0.90)" 
      py="4" 
      blur="40%" w="100%" 
      justifyContent="center"
      borderTop="1px solid #e8e8e8">
      <Box
        mx="6"
        w="100%"
        py="5"
        borderRadius="md"
        backgroundColor={'black'}
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