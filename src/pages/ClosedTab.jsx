/* eslint-disable no-undef */
import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import {
  Flex, Heading, VStack, Text, Button, Link, Box
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../context/slices/cartSlice';

export default function ClosedTab() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const merchantURLPath = useSelector(state => state.merchant.urlPath);
  
  const handleReturnButton = () => {
    dispatch(clearCart());
    navigate(`/${merchantURLPath}`);
  };

  return (
    <Box>
      <Flex direction="column">
        <Navbar title={'Tab Closed'} showLeftButton={false} />
        <Flex
          mt="12"
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
            <Button onClick={handleReturnButton} _hover={{
              bg: 'black'
            }} size="lg" bg="black" color='white' width="100%">Return to Menu</Button>
          </VStack>
        </Flex>
      </Flex>
     
    </Box>
  );
}
