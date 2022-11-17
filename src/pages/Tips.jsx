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
  const hasPaymentMethod = useSelector(state => state.customer.hasPaymentMethod);
  const [loading, setLoading] = useState(false);

  const [subTotal, setSubTotal] = useState(cart.reduce((acc, item) => acc + (parseInt(item.item.price) * item.quantity), 0));
  const [subTotalWithTax, setSubTotalWithTax] = useState((subTotal + (subTotal * (0.0825))).toFixed(2));
  const [tip, setTip] = useState((subTotalWithTax*0.15).toFixed(2));
  const [totalCost, setTotalCost] = useState(subTotalWithTax+tip);

  const [isFirstButtonSelected, setIsFirstButtonSelected] = useState(true);
  const [isSecondButtonSelected, setIsSecondButtonSelected] = useState(false);
  const [isThirdButtonSelected, setIsThirdButtonSelected] = useState(false);

  const [orderSentSuccessfully, setOrderSentSuccessfully] = useState(false);

  const roomId = 'nu-wood-fire-grill';
  const userId = 'user1';

  supabasePrivate
    .channel('private:orders')
    .on('postgres_changes', { event: 'INSERT', schema: 'private', table: 'orders' }, payload => handleOrderInsert(payload))
    .subscribe();

  const handleOrderInsert = (payload) => {
    console.log('INSERT', payload);
    setOrderSentSuccessfully(true);
  };

  const handleSendOrder = async () => {
    const res = await supabasePrivate.from('orders').insert({
      room_id: roomId,
      user_id: userId,
      message: `amount: ${totalCost}
      ${cart}`
    });

    console.log('res: ', res);

    if (orderSentSuccessfully === true) navigate('/order-confirmed');
    if (res.status !== 201) throw `${err}: Error placing order`;
  };

  const handleSelectTip = async () => {
    setLoading(true);
    
    await handleSendOrder();
    dispatch(setOrderTip(tip));
  };

  /////////////////////////////

  const handleFirstButton = () => {
    setIsFirstButtonSelected(true);
    setIsSecondButtonSelected(false);
    setIsThirdButtonSelected(false);
    setTip((subTotalWithTax*0.15).toFixed(2));
  };
  
  const handleSecondButton = () => {
    setIsFirstButtonSelected(false);
    setIsSecondButtonSelected(true);
    setIsThirdButtonSelected(false);
    setTip((subTotalWithTax*0.20).toFixed(2));
  };

  const handleThirdButton = () => {
    setIsFirstButtonSelected(false);
    setIsSecondButtonSelected(false);
    setIsThirdButtonSelected(true);
    setTip((subTotalWithTax*0.25).toFixed(2));
  };

  return (
    <Box bg="#f6f6f6" minH="100vh">
      <Flex direction="column">
        <Navbar title={'Tips'} showBackButton={true} />
        <Stack mt="32">
          <Container>
            <Heading mb="1rem" fontSize={'2rem'}>Show your support ❤️</Heading>
            <Text>100% of your tips goes to the wait staff</Text>
            <Stack mt="16" direction="column" spacing={4}>
              <Button size="lg"
                onClick={() => handleFirstButton()}
                bg={isFirstButtonSelected === true ? '#000000' : 'white'}
                _focus={{
                  bg: '#000000'
                }}
                border={isFirstButtonSelected === true ? 'none' : '1.5px solid #000000'}
                color={isFirstButtonSelected  === true ? 'white' : 'black'}>
                <Text pr="4">Nice!</Text>
                <Text pr="1">${(subTotalWithTax*0.15).toFixed(2)}</Text>
                <Text>(15%)</Text>
              </Button>
              <Button size="lg" 
                onClick={handleSecondButton}
                bg={isSecondButtonSelected === true ? '#000000' : 'white'}
                _focus={{
                  bg: '#000000'
                }}
                border={isSecondButtonSelected === true ? 'none' : '1.5px solid #000000'}
                color={isSecondButtonSelected === true ? 'white' : 'black'}>
                <Text pr="4">You&apos;re Great!</Text>
                <Text pr="1">${(subTotalWithTax*0.20).toFixed(2)}</Text>
                <Text>(20%)</Text>
              </Button>
              <Button 
                onClick={() => handleThirdButton()}
                size="lg" 
                bg={isThirdButtonSelected === true ? '#000000' : 'white'}
                _focus={{
                  bg: '#000000'
                }}
                border={isThirdButtonSelected === true ? 'none' : '1.5px solid #000000'}
                color={isThirdButtonSelected ? 'white' : 'black'}>
                <Text pr="4">Thank you so much!</Text>
                <Text pr="1">${(subTotalWithTax*0.25).toFixed(2)}</Text>
                <Text>(25%)</Text>
              </Button>
            </Stack>
          </Container>
        </Stack>
        <Divider mt="16" mb="4" />

      </Flex>
      <PlaceOrderButton 
        isLoading={loading} 
        subTotal={subTotal}
        tip={parseFloat(tip)} 
        handleOnClick={() => handleSelectTip()} 
        subTotalWithTax={subTotalWithTax} 
        buttonLabel={'Continue'} />
    </Box>
  );
}
