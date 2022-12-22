/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  Stack, Container, Flex, Button, Text, Box, Heading, HStack, Divider
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { setOrderTip, updateCart } from '../context/slices/cartSlice';

export default function TipsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart.items);
  const orderTax = useSelector(state => state.cart.orderTax);

  const subTotal = cart.reduce((acc, item) => acc + (parseInt(item.item.price) * item.quantity), 0);
  const subTotalWithTax = (subTotal + (subTotal * (orderTax/100))).toFixed(2);
  const [tip, setTip] =  (useSelector(state => state.cart.tip));

  const [isFirstButtonSelected, setIsFirstButtonSelected] = useState(true);
  const [isSecondButtonSelected, setIsSecondButtonSelected] = useState(false);
  const [isThirdButtonSelected, setIsThirdButtonSelected] = useState(false);
  const [isFourthButtonSelected, setIsFourthButtonSelected] = useState(false);

  useEffect(() => {
    if (tip === null) setTip((subTotalWithTax*0.15).toFixed(2));
    prefillTip();
  },[]);

  const prefillTip = () => {
    const tipPercentage = (tip/subTotalWithTax).toFixed(2);
    if (tipPercentage === '0.15') {
      setIsFirstButtonSelected(true);
      setIsSecondButtonSelected(false);
      setIsThirdButtonSelected(false);
      setIsFourthButtonSelected(false);
    } else if (tipPercentage === '0.20') {
      setIsFirstButtonSelected(false);
      setIsSecondButtonSelected(true);
      setIsThirdButtonSelected(false);
      setIsFourthButtonSelected(false);
    } else if (tipPercentage === '0.25') {
      setIsFirstButtonSelected(false);
      setIsSecondButtonSelected(false);
      setIsThirdButtonSelected(true);
      setIsFourthButtonSelected(false);
    } else if (tipPercentage === '0.00') {
      setIsFirstButtonSelected(false);
      setIsSecondButtonSelected(false);
      setIsThirdButtonSelected(false);
      setIsFourthButtonSelected(true);
    }
  };

  const handleContinue = (selectedTip) => {
    dispatch(setOrderTip(selectedTip));
    navigate('/cart/checkout');
  };

  const handleFirstButton = () => {
    setIsFirstButtonSelected(true);
    setIsSecondButtonSelected(false);
    setIsThirdButtonSelected(false);
    setIsFourthButtonSelected(false);
    handleContinue((subTotalWithTax*0.15).toFixed(2));
  };
  
  const handleSecondButton = () => {
    setIsFirstButtonSelected(false);
    setIsSecondButtonSelected(true);
    setIsThirdButtonSelected(false);
    setIsFourthButtonSelected(false);
    handleContinue((subTotalWithTax*0.20).toFixed(2));
  };

  const handleThirdButton = () => {
    setIsFirstButtonSelected(false);
    setIsSecondButtonSelected(false);
    setIsThirdButtonSelected(true);
    setIsFourthButtonSelected(false);
    handleContinue((subTotalWithTax*0.25).toFixed(2));
  };

  const handleNoTipButton = () => {
    setIsFirstButtonSelected(false);
    setIsSecondButtonSelected(false);
    setIsThirdButtonSelected(false);
    setIsFourthButtonSelected(true);
    handleContinue(0);
  };
  
  return (
    <Box bg="#f6f6f6" minH="100vh">
      <Flex direction="column">
        <Navbar title={'Tips'} showBackButton={true} />
        <Stack mt="80px">
          <Container>
            <Heading mb="1rem" fontSize={'2rem'}>Show your support ❤️</Heading>
            <Text>100% of your tips goes to the wait staff</Text>
            <Stack mt="16" direction="column" spacing={4}>
              <Button
                size="lg"
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
              <Button
                size="lg" 
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
              <Button 
                onClick={() => handleNoTipButton()}
                size="lg" 
                bg={isFourthButtonSelected === true ? '#000000' : 'white'}
                _focus={{
                  bg: '#000000'
                }}
                border={isFourthButtonSelected === true ? 'none' : '1.5px solid #000000'}
                color={isFourthButtonSelected ? 'white' : 'black'}>
                <Text pr="4">Maybe next time</Text>                              
              </Button>            
            </Stack>
          </Container>
        </Stack>

      </Flex>
    </Box>
  );
}
