/* eslint-disable no-undef */
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { supabasePrivate } from '../services/supabasePrivate';
import { useNavigate } from 'react-router-dom';
import {
  Link, Flex, Heading, VStack, Text, Button, Box, Spacer, StackDivider
} from '@chakra-ui/react';
import jsonToQueryString from '../tools/jsonToQueryString';
import queryStringToJSON from '../tools/queryStringToJSON';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../context/slices/cartSlice';

export default function OrderConfirmed() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);
  const merchantURLPath = useSelector(state => state.merchant.urlPath);
  const tableNumber = useSelector(state => state.merchant.tableNumber);
  const tip = useSelector(state => state.cart.tip);
  const [totalCost, setTotalCost] = useState(cart.reduce((acc, item) => acc + (parseInt(item.item.price) * item.quantity), 0));
  const [totalSubCost, setTotalSubCost] = useState(totalCost*(0.0825));
  const [loadingPayment, setLoadingPayment] = useState(false);

  const handleKeepTabOpen = () => { 
    // TODO: Update Cart items order status to ordered
    navigate(`/${merchantURLPath}`);
  };

  const handlePayment = async () => {
    setLoadingPayment(true);

    const data = {
      'security_key': process.env.REACT_APP_STC_SK,
      'type': 'sale',
      'amount': (totalCost+parseFloat(tip)).toFixed(2),
      'ccnumber': 4111111111111111,
      'ccexp': 1025,
      'cvv': 999
    };

    fetch(`https://cors-anywhere.herokuapp.com/https://sharingthecredit.transactiongateway.com/api/transact.php${jsonToQueryString(data)}`, {
      method: 'POST'
    })
      .then(response => {
        response.text().then((query) => {
          const jsonQuery = queryStringToJSON(query);

          if (jsonQuery.responsetext === 'SUCCESS') {
            dispatch(clearCart());
            navigate('/cart/closed-tab');
            
            // TODO: UPDATE ORDER STATUS TO PAID
            // client recipt log
            // merchant recipt log
            setLoadingPayment(false);
            return;
          }
          setLoadingPayment(false);
          console.log('100: ', jsonQuery);
          throw `${jsonQuery.responsetext}: Error making payment`;
        
        });
      });
  };
  
  return (
    <Box bg="#f6f6f6" minH="100vh">
      <Flex direction="column">
        <Flex
          mt="16"
          direction="column"
        >
          <VStack
            spacing={4}
            align="stretch"
            px="6"
          >
            <VStack px="6" h="20" mb="4" alignItems="center">
              <Heading size="lg">Thank you!</Heading>
              <Text textAlign="center">Your order will be out shortly</Text>
            </VStack>
            <VStack>
              <Box borderWidth="1px" width="100%" py="6">
                {tableNumber === null ? (
                  <Heading mb="8" size="lg" textAlign="center">Pickup</Heading>
                ) : (
                  <Heading mb="8" size="lg" textAlign="center">Table #{tableNumber}</Heading>
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
                  px="6"
                  divider={<StackDivider borderColor='gray.200'/>} >
                  <Flex>
                    <Text>Subtotal</Text>
                    <Spacer />
                    <Text>${totalCost.toFixed(2)}</Text>
                  </Flex>
                  <Flex>
                    <Text>Tax</Text>
                    <Spacer />
                    <Flex alignItems='center'>
                      <Text mr="2" fontSize={'12'} color='gray.700'>(8.25%)</Text>
                      <Text pr="1">${totalSubCost.toFixed(2)}</Text>
                    </Flex>
                  </Flex>
                  <Flex>
                    <Text>Tip</Text>
                    <Spacer />
                    <Text>${parseFloat(tip).toFixed(2)}</Text>
                  </Flex>
                  <Flex pb="4">
                    <Text fontSize={'2rems'} fontWeight={'bold'}>Total</Text>
                    <Spacer />
                    <Text fontSize={'2rems'} fontWeight={'bold'}>${(totalCost+totalSubCost+parseFloat(tip)).toFixed(2)}</Text>
                  </Flex>
                </VStack>

              </Box>
              <VStack
                pos="fixed"
                bottom="0" 
                w="100%"
                px="6"
                bg="RGBA(255, 255, 255, 0.90)" 
                py="4" 
                blur="40%" 
                spacing={4}
                align="stretch">
                <Button onClick={() => handleKeepTabOpen()} w="100%" _hover={{bg: 'black'}} size="lg" bg="black" color="white">Keep Tab Open</Button>
                <Button isLoading={loadingPayment} onClick={() => handlePayment()} w="100%" size="lg" variant="outline" borderColor="black">Close Tab</Button>
              </VStack>
            </VStack>
    
          </VStack>
        </Flex>

      </Flex>
     
    </Box>
  );
}
