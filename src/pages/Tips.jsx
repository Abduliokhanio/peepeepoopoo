import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PlaceOrderButton from '../components/PlaceOrderButton';
import {
  Stack, Flex, Textarea, Text, Box, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';

export default function TipsPage() {
  const cart = useSelector(state => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    checkCart();
  }, [false]);

  const checkCart = async () => { 
    //TODO: check total price
  };

  const handlePlaceOrder = () => {
    return;
  };

  return (
    <Box>
      <Flex direction="column">
        <Navbar title={localStorage.getItem('merchantName')} showBackButton={true} brandColor={localStorage.getItem('brandColor')} />
        <Text mt="16">Modifiers page</Text>
        <Text>15%</Text>
        <Text>20%</Text>
        <Text>25%</Text>
        <Text>Custom</Text>
        <Textarea placeholder='Special requests' />
      </Flex>
      <PlaceOrderButton handleOnClick={handlePlaceOrder} />
    </Box>
  );
}
