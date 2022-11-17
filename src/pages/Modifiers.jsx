import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ModifierButton from '../components/ModifierButton';
import {
  Heading, Image, Container, useNumberInput, Flex, Textarea, Text, Box, HStack, Button, Input, Divider
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
      min: 1,
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
      const cartItemUpdate = { 
        id: merchantStoreSelectedProduct.id, 
        item: merchantStoreSelectedProduct.item, 
        quantity: parseInt(itemCount), 
        modifiers: null,
        orderSent: false,
        orderCompleted: false,
        payment: false };

      console.log('update cartItem to: ', cartItemUpdate);
      dispatch(updateCart(cartItemUpdate));
    } else {
      const cartItemInsert = { 
        id: uid(), 
        item: merchantStoreSelectedProduct.item, 
        quantity: parseInt(itemCount), 
        modifiers: null,
        orderSent: false,
        orderCompleted: false,
        payment: false  };
        
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
      <Box h="60px">
        <Navbar title={merchantStoreName} showBackButton={true}  />
      </Box>
      {merchantStoreSelectedProduct.item.image_url !== null ? (
        <Image h="175" w="100vw" mb="4" objectFit="cover" src={merchantStoreSelectedProduct.item.image_url} alt="menu" />
      ) : <Divider mb="8" />}
      <Container>
        
        <Flex mb={'16'} direction="column" w="100%" textAlign={'left'}>
          <Heading mb="2">{merchantStoreSelectedProduct.item.name}</Heading>
          <Text fontSize={'20'} mb="8">{merchantStoreSelectedProduct.item.description}</Text>
          <Text fontSize={'20'}>${merchantStoreSelectedProduct.item.price}</Text>
          <Textarea minH="150" mt="8" placeholder='Special requests' />
          <HStack mt="8" maxW='320px' flexGrow={true}>
            <Button py='4' h="100%" maxH="64px" minW="64px" {...inc}>+</Button>
            <Input py='4' maxW="100px" textAlign={'center'} h="100%" maxH="64px" {...input} />
            <Button py='4' h="100%" maxH="64px" minW="64px" {...dec}>-</Button>
          </HStack>
        </Flex>

        <Flex
          pos="fixed"
          bottom="0" 
          left="0"
          bg="RGBA(255, 255, 255, 0.90)" 
          py="4" 
          blur="40%" 
          w="100%" 
          justifyContent="center"
          direction="column"
        >
          <ModifierButton isItemInCart={isItemInCart} handleOnClick={handleCartButtoon} numberOfItems={itemCount} totalPrice={itemCount * totalPrice} />
        </Flex>
      </Container>
      
    </Box>
  );
}
