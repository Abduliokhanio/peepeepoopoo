import React from 'react';
import {
  Box, Flex, Heading, Text
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CheckoutButton() {
  const cart = useSelector(state => state.cart.items);

  const cartTotalCount = cart.reduce((acc, item) => acc + parseInt(item.quantity), 0);
  const navigate = useNavigate();

  const cartTotalCost = () => {
    let totalCost = 0;
    if (cart.length > 0) {
      totalCost = cart.reduce((acc, item) => {
        console.log('item: ', item);
        return acc + (item.quantity * item.item.price);
      }, 0);
      
    }
    return totalCost.toFixed(2);
  };
  
  return (cart.length > 0 ? (
    <Flex
      onClick={() => navigate('/checkout')}
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
            <Text color="black" fontWeight="bold">{cartTotalCount}</Text>
          </Box>
          <Heading color="white" fontWeight='semibold' size="md">View order</Heading>
          <Text color="white" mt="1" fontSize='1.1em' fontWeight='semibold'>${cartTotalCost()}</Text>
        </Flex>
      </Box>
    </Flex>
  ) : null);
}