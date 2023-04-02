import React, { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {supabasePublic} from '../services/supabasePublic';
import ModifierButton from '../components/buttons/ModifierButton';
import {
  Heading, Image, IconButton, Checkbox, CheckboxGroup, Stack, StackDivider, useNumberInput, Flex, Textarea, Text, Box, HStack, Button, Input, Divider
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateCart } from '../context/slices/cartSlice';
import ShortUniqueId from 'short-unique-id';
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai';
import CheckBoxForOptions from '../components/CheckBoxForOptions';
import { current } from '@reduxjs/toolkit';

export default function ModifiersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uid = new ShortUniqueId({
    length: 10 
  });
  
  const merchantStoreSelectedProduct = useSelector(state => state.merchant.selectedProduct);

  const merchantStoreName = useSelector(state => state.merchant.brandName);

  const cart = useSelector(state => state.cart.items);

  const itemInCart = cart.find(cartItem => cartItem?.id === merchantStoreSelectedProduct.id);

  const [loading, setLoading] = useState(true);

  const [totalPrice, setTotalPrice] = useState(merchantStoreSelectedProduct?.item?.price);

  const [itemCount, setItemCount] = useState(1);

  const [isItemInCart, setIsItemInCart] = useState(false);
  
  const [modifierGroups, setModifierGroups] = useState([]);

  const [specialRequest, setSpecialRequest] = useState('');

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
    setTotalPrice(itemCount * merchantStoreSelectedProduct?.item?.price);
  }, []);

  const checkCart = async () => { 
    setLoading(true);
    const itemInCart = cart.find(item => item?.id === merchantStoreSelectedProduct.id);
    
    if (itemInCart === undefined) {
      setIsItemInCart(false); 
      setItemCount(merchantStoreSelectedProduct.quantity);
    } 

    const modifierGroupsData = await fetchModifierGroups();
    await fetchModifiers(modifierGroupsData);
    setLoading(false);
  };

  const handleCartButtoon = () => {
    if (loading) return;
    
    if (isItemInCart) {
      let cartItemUpdate = { 
        id: merchantStoreSelectedProduct.id, 
        items: merchantStoreSelectedProduct.item, 
        quantity: parseInt(itemCount), 
        modifiers: [], 
        specialRequest: 'specialRequest - cartItemUpdate',
        status: 'pending',
      };

      dispatch(addToCart(cartItemUpdate));
    } else {
      let cartOrderInsert = { 
        id: merchantStoreSelectedProduct.id, 
        items: merchantStoreSelectedProduct.item, 
        quantity: parseInt(itemCount), 
        modifiersGroup: [],
        modifiers: [],
        specialRequest: 'specialRequest - cartOrderInsert',
        status: 'pending',
      };

      dispatch(addToCart(cartOrderInsert));
    }
    navigate('/cart');
  };

  const handleModifierCountInput = (count) => {
    setItemCount(count);
    setTotalPrice(count * merchantStoreSelectedProduct?.item?.price);
  };

  const fetchModifierGroups = async () => {
    const { data, error } = await supabasePublic.from('modifiergroups')
      .select('*')
      .match({
        'product_id': merchantStoreSelectedProduct?.item?.id
      });

    if (error) {
      Sentry.captureException(error);
      throw error;
    }
 
    const sortModifierGroupOrder = data.sort((a, b) => b.required - a.required);
    setModifierGroups(sortModifierGroupOrder);
    return sortModifierGroupOrder;
  };

  const fetchModifiers = async (modifierGroupsData) => {
    const hydratedModifierGroups = modifierGroupsData.map(async (modifierGroup) => {
      const { data, error } = await supabasePublic.from('modifiers')
        .select('*')
        .match({
          'modifier_groups_id': modifierGroup.id
        });
      
      if (error) {
        Sentry.captureException(error);
        throw error;
      }
    
      return {
        ...modifierGroup, modifiers: data 
      };
    });
    setModifierGroups(await Promise.all(hydratedModifierGroups));
  };

  return (
    <Box bg="brand.bg" minH="100vh" color='black'>
      <Box h="60px">
        <Navbar title={merchantStoreName} showBackButton={true}  />
      </Box>

      {merchantStoreSelectedProduct?.item?.image_url !== null ? (
        <Image h="175" w="100vw" mb="4" objectFit="cover" src={merchantStoreSelectedProduct?.item?.image_url} alt="menu" />
      ) : <Divider mb="8" />}

      <Box h="100%" pb="200px">
        <Flex mb={'16'} direction="column" w="100%" textAlign={'left'}>
          <Box px="6" mb="8">
            <Text mb="2" fontSize="1.75em" fontWeight="bold">{merchantStoreSelectedProduct?.item?.name}</Text>

            <Text fontSize={'20'} mb="8">{merchantStoreSelectedProduct?.item?.description}</Text>

            <Text fontSize={'20'}>${merchantStoreSelectedProduct?.item?.price}</Text>
          </Box>

          {modifierGroups.length > 1 &&
            modifierGroups.map((modifierGroup) => (
              modifierGroup.product_id === merchantStoreSelectedProduct?.item?.id && (
                <CheckBoxForOptions key={modifierGroup.id} modifierGroup={modifierGroup} />
              )
            ))
          }

          <Box px="6">

          </Box>

          <HStack 
            mt="8" 
            mx="6"
          >
            <Flex
              justifyContent={'center'}
              borderRadius={'md'}
              alignItems={'center'}
              border={'2px solid #363636'}
              bg="white"
            >
              <IconButton 
                icon={<AiOutlinePlus />}
                color={'black'}
                _hover={{
                  bg: 'white'
                }}
                _focusVisible={{
                  outline: 'none',
                  backgroundColor: 'transparent' 
                }}
                _active={{
                  backgroundColor: 'transparent' 
                }}
                fontSize={'25'}
                bg="transparent"
                py="4"
                pl="8"
                pr="4"
                h="100%" 
                maxH="64px" 
                minW="30px" {...inc} />

              <Input 
                _focusVisible={{
                  outline: 'none'
                }}
                outline="none"
                bg="transparent"
                py='4'
                alignItems={'center'}
                px="0"
                border="none"
                maxW="50px"
                fontSize={'20'}
                textAlign={'center'}
                h="100%"
                {...input} />

              <IconButton 
                icon={<AiOutlineMinus />}
                bg="transparent"
                _hover={{
                  bg: 'transparent'
                }}
                _focusVisible={{
                  outline: 'none',
                  backgroundColor: 'transparent' 
                }}
                _active={{
                  backgroundColor: 'transparent' 
                }}
                color={'black'}
                fontSize={'25px'}
                py='4' 
                pl="4"
                pr="8"
                h="100%" 
                maxH="64px" 
                minW="30px" 
                {...dec} />
            </Flex>
          </HStack>
        </Flex>

        <Flex
          pos="fixed"
          bottom="0" 
          left="0"
          backdropFilter="blur(5px)"
          borderTop='1px solid rgba(255, 255, 255, 0.1)'
          bg="RGBA(255, 255, 255, 0.90)" 
          py="4" 
          w="100%" 
          justifyContent="center"
          direction="column"
          
        >
          <ModifierButton 
            loading={loading}
            isItemInCart={isItemInCart} 
            handleOnClick={handleCartButtoon} 
            numberOfItems={itemCount} 
            totalPrice={totalPrice} />
            
        </Flex>
      </Box>
      
    </Box>
  );
}
