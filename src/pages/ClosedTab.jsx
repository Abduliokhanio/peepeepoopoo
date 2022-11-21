/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
import {
  Flex, Heading, VStack, Text, Button, Link, Box
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import Payment from '../tools/payment';

export default function ClosedTab() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const merchantURLPath = useSelector(state => state.merchant.urlPath);
  const tableNumber = useSelector(state => state.cart.tableNumber);
  const merchant = useSelector(state => state.merchant.brandName);
  const payment = new Payment(process.env.REACT_APP_STC_SK);
  const reciept = useSelector(state => state.cart);

  useEffect(() => {
    payment.recordOrder(reciept, tableNumber, merchant, user, dispatch);
  },[]);    
  
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
            <Button onClick={() => navigate(`/${merchantURLPath}`)} _hover={{
              bg: 'black'
            }} size="lg" bg="black" color='white' width="100%">Return to Menu</Button>
          </VStack>
        </Flex>
      </Flex>
     
    </Box>
  );
}
