/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { supabasePrivate } from '../services/supabasePrivate';
import { useNavigate } from 'react-router-dom';
import {
  Flex, Heading, VStack, Text, Button, Box, Spacer, StackDivider, Divider
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import {updateCart, setIsTabOpen, clearCart } from '../context/slices/cartSlice';
import Payment from '../tools/payment';

export default function OrderConfirmed() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const payment = new Payment(process.env.REACT_APP_STC_SK);
  const cart = useSelector(state => state.cart.items);
  const subTotal = cart.reduce((acc, item) => acc + (parseInt(item.item.price) * item.quantity), 0);
  const subTotalWithTax = (subTotal + (subTotal * (0.0825))).toFixed(2);
  const tip = (subTotalWithTax*0.15).toFixed(2);
  const totalCost = (parseFloat(subTotalWithTax)+parseFloat(tip)).toFixed(2);
  
  const orderType = useSelector(state => state.cart.orderType);
  const pendingOrders = useState(cart.filter(order => order.orderSent === false));
  const unPaidOrders = useState(cart.filter(order => order.orderPaid === false));
  const merchantURLPath = useSelector(state => state.merchant.urlPath);
  const tableNumber = useSelector(state => state.merchant.tableNumber);

  const [loadingPayment, setLoadingPayment] = useState(false);
  const [loadingKeepTabOpen, setLoadingKeepTabOpen] = useState(false);

  const handleKeepTabOpen = async () => { 
    setLoadingKeepTabOpen(true);
    dispatch(setIsTabOpen(true));
    await  pendingOrders.forEach( (order) => {
      dispatch(updateCart({...order, orderSent: true}));
    });
    
    navigate(`/${merchantURLPath}`);
    setLoadingKeepTabOpen(false);
  };

  const handlePayment = async () => {
    setLoadingPayment(true);

    const cardInfo = {
      'ccnumber': 4111111111111111,
      'ccexp': 1025,
      'cvv': 999
    };

    const salesParams = {
      'type': 'sale',
      'amount': totalCost
    };

    payment.setCardPayment(cardInfo);
    payment.processSale(salesParams, dispatch, clearCart, navigate);
  };
  
  return (
    <Box bg="#f6f6f6" minH="100vh">
      <Navbar title={'Summary'} showLeftButton={false} />
      <Flex direction="column">
        <Flex
          mt="80px"
          direction="column"
        >
        
          <VStack px="6" mt="4">
            <Box bg="white" borderWidth="1px" width="100%" pt="6">
              {tableNumber === null ? (
                <Heading pl="6" mb="6" size="md" textAlign="left">{orderType}</Heading>
              ) : (
                <Heading pl="6" mb="6" size="md" textAlign="left">Table #{tableNumber}</Heading>
              )}
              {cart.map((item, index) => {
                return(
                  <Flex 
                    mb="6"
                    key={index}
                    px="6">
                    <Box backgroundColor={'gray.100'} borderRadius="2" mr="4" px="3.5" py="1">
                      <Text textAlign="left" fontSize="lg">{item.quantity}</Text>
                    </Box>
                    <Text fontWeight='bold' fontSize={'1.25rem'}>{item.item.name}</Text>
                  </Flex>
                );}
              )}
              <VStack
                mt="8"
                spacing={2}
                align="stretch"
                px="6">
                <Flex>
                  <Text>Subtotal</Text>
                  <Spacer />
                  <Text>${subTotal}</Text>
                </Flex> 
                <Flex>
                  <Text>Tax</Text>
                  <Spacer />
                  <Flex alignItems='center'>
                    <Text mr="2" fontSize={'12'} color='gray.700'>(8.25%)</Text>
                    <Text pr="1">${subTotalWithTax}</Text>
                  </Flex>
                </Flex>
                <Flex>
                  <Text>Tip</Text>
                  <Spacer />
                  <Text>${tip}</Text>
                </Flex>
                <Divider py="2" borderColor='gray.300'/>
                <Flex pb="4" pt="2">
                  <Text fontSize={'2rems'} fontWeight={'bold'}>Total</Text>
                  <Spacer />
                  <Text fontSize={'2rems'} fontWeight={'bold'}>${totalCost}</Text>
                </Flex>
              </VStack>
            </Box>
              
            <VStack
              pos="fixed"
              bottom="0" 
              w="100%"
              px="6"
              bg="white"
              py="4" 
              blur="40%" 
              spacing={4}
              align="stretch">
              <Button isLoading={loadingKeepTabOpen} onClick={() => handleKeepTabOpen()} w="100%" _hover={{bg: 'black'}} size="lg" bg="black" color="white">Keep Tab Open</Button>
              <Button isLoading={loadingPayment} onClick={() => handlePayment()} w="100%" size="lg" variant="outline" borderColor="black">Close Tab</Button>
            </VStack>
          </VStack>

        </Flex>

      </Flex>
     
    </Box>
  );
}
