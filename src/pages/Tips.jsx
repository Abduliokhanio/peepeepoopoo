/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { supabasePrivate } from '../services/supabasePrivate';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PlaceOrderButton from '../components/PlaceOrderButton';
import {
  Stack, Container, Flex, Button, Text, Box, Heading, HStack, Divider
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { setOrderTip } from '../context/slices/cartSlice';

export default function TipsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart.items);
  const [loading, setLoading] = useState(false);
  const [totalCost, setTotalCost] = useState(cart.reduce((acc, item) => acc + (parseInt(item.item.price) * item.quantity), 0));
  const [isFirstButtonSelected, setIsFirstButtonSelected] = useState(true);
  const [isSecondButtonSelected, setIsSecondButtonSelected] = useState(false);
  const [isThirdButtonSelected, setIsThirdButtonSelected] = useState(false);
  const [tip, setTip] = useState((totalCost*0.15).toFixed(2));

  const roomId = 'nu-wood-fire-grill';
  const userId = 'user1';

  supabasePrivate
    .channel('private:orders')
    .on('postgres_changes', { event: 'INSERT', schema: 'private', table: 'orders' }, payload => handleOrderInsert(payload))
    .subscribe();

  const handleOrderInsert = (payload) => {
    console.log('INSERT', payload);
    navigate('/order-confirmed');
    setLoading(false);
  };

  const handleSendOrder = async () => {
    const res = await supabasePrivate.from('orders').insert({
      room_id: roomId,
      user_id: userId,
      message: `amount: ${(totalCost+parseFloat(tip)).toFixed(2)}
      ${cart}`
    });

    console.log('res: ', res);

    if (res.status !== 201) {
      throw `${err}: Error placing order`;
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    
    await handleSendOrder();
    dispatch(setOrderTip(tip));
  };

  /////////////////////////////

  const handleFirstButton = () => {
    setIsFirstButtonSelected(true);
    setIsSecondButtonSelected(false);
    setIsThirdButtonSelected(false);
    setTip((totalCost*0.15).toFixed(2));
  };
  
  const handleSecondButton = () => {
    setIsFirstButtonSelected(false);
    setIsSecondButtonSelected(true);
    setIsThirdButtonSelected(false);
    setTip((totalCost*0.20).toFixed(2));
  };

  const handleThirdButton = () => {
    setIsFirstButtonSelected(false);
    setIsSecondButtonSelected(false);
    setIsThirdButtonSelected(true);
    setTip((totalCost*0.25).toFixed(2));
  };

  return (
    <Box>
      <Flex direction="column">
        <Navbar title={'Tips'} showBackButton={true} />
        <Stack mt="32">
          <Container>
            <Heading mb="1rem" fontSize={'2.5rem'}>Show your support ❤️</Heading>
            <Text>100% of your tips goes to the wait staff</Text>
            <Stack mt="16" direction="column" spacing={4}>
              <Button size="lg"
                onClick={() => handleFirstButton()}
                bg={isFirstButtonSelected === true ? '#000000' : 'gray.100'}
                _focus={{
                  bg: '#000000'
                }}
                color={isFirstButtonSelected  === true ? 'white' : 'black'}>
                <Text pr="4">Nice!</Text>
                <Text pr="1">${(totalCost*0.15).toFixed(2)}</Text>
                <Text>(15%)</Text>
              </Button>
              <Button size="lg" 
                onClick={handleSecondButton}
                bg={isSecondButtonSelected === true ? '#000000' : 'gray.100'}
                _focus={{
                  bg: '#000000'
                }}
                color={isSecondButtonSelected === true ? 'white' : 'black'}>
                <Text pr="4">You&apos;re Great!</Text>
                <Text pr="1">${(totalCost*0.20).toFixed(2)}</Text>
                <Text>(20%)</Text>
              </Button>
              <Button 
                onClick={() => handleThirdButton()}
                size="lg" 
                bg={isThirdButtonSelected === true ? '#000000' : 'gray.100'}
                _focus={{
                  bg: '#000000'
                }}
                color={isThirdButtonSelected ? 'white' : 'black'}>
                <Text pr="4">Thank you so much!</Text>
                <Text pr="1">${(totalCost*0.25).toFixed(2)}</Text>
                <Text>(25%)</Text>
              </Button>
            </Stack>
          </Container>
        </Stack>
        <Divider mt="16" mb="4" />
  
        <HStack w="100%" spacing={4} justifyContent='center'>
          <Text fontSize="lg" fontWeight={'bold'}>Your Tip: </Text>
          <Text fontSize="lg" >${tip}</Text>
        </HStack>

      </Flex>
      <PlaceOrderButton isLoading={loading} handleOnClick={() => handlePlaceOrder()} totalPrice={(totalCost+parseFloat(tip)).toFixed(2)} />
    </Box>
  );
}
