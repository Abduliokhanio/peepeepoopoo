import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AddToCartButton from '../components/AddToCartButton';
import {
  Stack, Flex, Textarea, Text, Box, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../context/slices/cartSlice';

export default function ModifiersPage() {
  const merchantStoreSelectedProduct = useSelector(state => state.merchant.selectedProduct);
  const cart = useSelector(state => state.cart);
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [totalPrice, setTotalPrice] = useState(merchantStoreSelectedProduct.price);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    checkCart();
  }, [false]);

  const checkCart = async () => { 
    //TODO: Check if the product is already in the cart
    //If it is, then update the quantity
    //If it isn't, then add it to the cart
    
    // add itemQty to the cart
  };

  const handleAddToCart = () => {
    dispatch(addToCart(merchantStoreSelectedProduct));
    navigate(-1);
  };

  return (
    <Box>
      <Flex direction="column">
        <Navbar title={localStorage.getItem('merchantName')} showBackButton={true} brandColor={localStorage.getItem('brandColor')} />
        <Text mt="16">Modifiers page</Text>
        <Text>{merchantStoreSelectedProduct.name}</Text>
        <Text>{merchantStoreSelectedProduct.description}</Text>
        <Text>{merchantStoreSelectedProduct.price}</Text>
        <Textarea placeholder='Special requests' />
        <NumberInput 
          value={numberOfItems}
          onChange={(num) => setNumberOfItems(num)}
          size='lg' 
          maxW={32} 
          min={1}
          max={100}
          defaultValue={1}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
      <AddToCartButton handleOnClick={handleAddToCart} numberOfItems={numberOfItems} totalPrice={totalPrice} />
    </Box>
  );
}
