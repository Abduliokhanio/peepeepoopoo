import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ModifierButton from '../components/ModifierButton';
import {
  Heading, Container, useNumberInput, Flex, Textarea, Text, Box, HStack, Button, Input
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateCart } from '../context/slices/cartSlice';
import ShortUniqueId from 'short-unique-id';

export default function ModifiersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uid = new ShortUniqueId({ length: 10 });
  const merchantStoreSelectedProduct = useSelector(state => state.merchant.selectedProduct);
  const merchantStoreName = useSelector(state => state.merchant.brandName);
  const cart = useSelector(state => state.cart.items);

  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(merchantStoreSelectedProduct.item.price);
  const [numOfTotalItems, setNumOfTotalItems] = useState(cart.reduce((acc, item) => acc + parseInt(item.quantity), 1));
  const [itemCount, setItemCount] = useState(1);
  const [cartItemID, setCartItemID] = useState(null);
  const [isItemInCart, setIsItemInCart] = useState(false);

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      value: itemCount,
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
    // if (merchantStoreSelectedProduct.id) {
    //   console.log('merchantStoreSelectedProduct: ', merchantStoreSelectedProduct);
    //   setCartItemID(merchantStoreSelectedProduct.id);
    //   setIsItemInCart(false);
    // }
    setLoading(true);
    const itemInCart = cart.find(item => item.id === merchantStoreSelectedProduct.id);
    console.log('itemInCart: ', itemInCart);
    if (itemInCart === undefined) {
      setIsItemInCart(false); 
      setItemCount(merchantStoreSelectedProduct.quantity);
      console.log('new itemCount: ', itemCount);
    } else {
      isItemInCart ? setItemCount(1) : setItemCount(itemInCart.quantity);
      setItemCount(itemInCart.quantity);
      setIsItemInCart(true); 
      console.log('old itemCount: ', itemCount);
    }
    setLoading(false);
  };
  
  const handleCartButtoon = () => {
    if (isItemInCart) {
      const cartItemUpdate = { id: merchantStoreSelectedProduct.id, item: merchantStoreSelectedProduct.item, quantity: parseInt(itemCount), modifiers: null };
      console.log('update cartItem to: ', cartItemUpdate);
      dispatch(updateCart(cartItemUpdate));
    } else {
      const cartItemInsert = { id: uid(), item: merchantStoreSelectedProduct.item, quantity: parseInt(itemCount), modifiers: null };
      console.log('add new cartItem: ', cartItemInsert);
      dispatch(addToCart(cartItemInsert));
    }
    
    navigate(-1);
  };

  const handleModifierCountInput = (count) => {
    setItemCount(count);
    setTotalPrice(count * merchantStoreSelectedProduct.item.price);
  };

  return (
    <Box>
      <Navbar title={merchantStoreName} showBackButton={true}  />

      <Container>
        <Flex direction="column" w="100%" textAlign={'left'}>
          <Heading mt="32" mb="2">{merchantStoreSelectedProduct.item.name}</Heading>
          <Text fontSize={'20'} mb="12">{merchantStoreSelectedProduct.item.description}</Text>
          <Text fontSize={'24'}>${merchantStoreSelectedProduct.item.price}</Text>
          <Textarea minH="200" mt="8" mb={'16'} placeholder='Special requests' />
        </Flex>

        <Flex
          pos="fixed"
          bottom="0" 
          bg="RGBA(255, 255, 255, 0.90)" 
          py="4" 
          blur="40%" w="100%" justifyContent="center">
          <HStack maxW='320px' flexGrow={true}>
            <Button h="100%" maxH="64px" minW="64px" {...inc}>+</Button>
            <Input flexGrow={1} textAlign={'center'} h="100%" maxH="64px" {...input} />
            <Button flexGrow={1} h="100%" maxH="64px" minW="64px" {...dec}>-</Button>
          </HStack>
          <ModifierButton isItemInCart={isItemInCart} handleOnClick={handleCartButtoon} numberOfItems={itemCount} totalPrice={itemCount * totalPrice} />
        </Flex>
      </Container>
      
    </Box>
  );
}
