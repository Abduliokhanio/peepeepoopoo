import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AddToCartButton from '../components/AddToCartButton';
import {
  Heading, Container, NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper, useNumberInput, Flex, Textarea, Text, Box, HStack, Button, Input
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../context/slices/cartSlice';

export default function ModifiersPage() {
  const merchantStoreSelectedProduct = useSelector(state => state.merchant.selectedProduct);
  const cart = useSelector(state => state.cart);
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [totalPrice, setTotalPrice] = useState(merchantStoreSelectedProduct.price);
  const [numOfItems, setNumOfItems] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const merchantStoreName = useSelector(state => state.merchant.brandName);

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: numOfItems,
      min: 0,
      max: 99,
      onChange: (value) => handleModifierCountInput(value)
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

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
    console.log(numOfItems);
    // dispatch(addToCart(merchantStoreSelectedProduct));
    // navigate(-1);
  };

  const handleModifierCountInput = (count) => {
    setNumOfItems(count);
  };

  return (
    <Box>
      <Navbar title={merchantStoreName} showBackButton={true}  />

      <Container>
        <Flex direction="column" w="100%" textAlign={'left'}>
          <Heading mt="32" mb="2">{merchantStoreSelectedProduct.name}</Heading>
          <Text fontSize={'20'} mb="12">{merchantStoreSelectedProduct.description}</Text>
          <Text fontSize={'24'}>${merchantStoreSelectedProduct.price}</Text>
          <Textarea minH="200" mt="8" mb={'16'} placeholder='Special requests' />
        </Flex>

        <Flex>
          <HStack maxW='320px' flexGrow={true}>
            <Button h="100%" maxH="64px" minW="64px" {...inc}>+</Button>
            <Input flexGrow={1} textAlign={'center'} h="100%" maxH="64px" {...input} />
            <Button flexGrow={1} h="100%" maxH="64px" minW="64px" {...dec}>-</Button>
          </HStack>
          <AddToCartButton handleOnClick={handleAddToCart} numberOfItems={numberOfItems} totalPrice={numOfItems * totalPrice} />
        </Flex>
      </Container>
      
    </Box>
  );
}
