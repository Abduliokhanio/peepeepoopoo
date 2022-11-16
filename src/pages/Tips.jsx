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
  const [totalCost, setTotalCost] = useState(cart.reduce((acc, item) => acc + (parseInt(item.item.price) * item.quantity), 0));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isFirstButtonSelected, setIsFirstButtonSelected] = useState(true);
  const [isSecondButtonSelected, setIsSecondButtonSelected] = useState(false);
  const [isThirdButtonSelected, setIsThirdButtonSelected] = useState(false);
  const [tip, setTip] = useState((totalCost*0.15).toFixed(2));

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

  useEffect(() => {
    checkCart();
    console.log('totalCost: type ', typeof totalCost);
    console.log('tip: type ', typeof tip);
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
      <PlaceOrderButton handleOnClick={handlePlaceOrder} totalPrice={(totalCost+parseFloat(tip)).toFixed(2)} />
    </Box>
  );
}
