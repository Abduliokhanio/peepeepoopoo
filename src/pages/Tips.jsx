import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PlaceOrderButton from '../components/PlaceOrderButton';
import {
  Stack, Container, Flex, Button, Text, Box, Heading, HStack, Divider
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';

export default function TipsPage() {
  const cart = useSelector(state => state.cart.items);
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    checkCart();
  }, [false]);

  const checkCart = async () => { 
    //TODO: check total price
    // caluate tip percentages
    // calc total price after tip
    // make payment
  };

  const handlePlaceOrder = () => {
    return;
  };

  return (
    <Box>
      <Flex direction="column">
        <Navbar title={localStorage.getItem('merchantName')} showBackButton={true} brandColor={localStorage.getItem('brandColor')} />
        <Stack mt="32">
          <Container>
            <Heading mb="1rem" fontSize={'2.5rem'}>Show your support</Heading>
            <Text>100% of your tips goes to the wait staff</Text>
            <Stack mt="16" direction="column" spacing={4}>
              <Button size="lg" backgroundColor="black" color="white">
                <Text pr="4">Nice!</Text>
                <Text pr="1">$3.00</Text>
                <Text>(15%)</Text>
              </Button>
              <Button size="lg">
                <Text pr="4">You&apos;re Great!</Text>
                <Text pr="1">$3.00</Text>
                <Text>(20%)</Text>
              </Button>
              <Button size="lg">
                <Text pr="4">Thank you so much!</Text>
                <Text pr="1">$3.00</Text>
                <Text>(25%)</Text>
              </Button>
            </Stack>
          </Container>
        </Stack>
        <Divider mt="16" mb="4" />
  
        <HStack w="100%" spacing={4} justifyContent='center'>
          <Text fontSize="lg" fontWeight={'bold'}>Your Tip: </Text>
          <Text fontSize="lg" >$24</Text>
        </HStack>

      </Flex>
      <PlaceOrderButton handleOnClick={handlePlaceOrder} totalPrice={totalPrice} />
    </Box>
  );
}
