import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {supabasePublic} from '../services/supabasePublic';
import ModifierButton from '../components/ModifierButton';
import {
  Heading, Image, Checkbox, CheckboxGroup, Stack, StackDivider, useNumberInput, Flex, Textarea, Text, Box, HStack, Button, Input, Divider
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateCart } from '../context/slices/cartSlice';
import ShortUniqueId from 'short-unique-id';

export default function ModifiersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uid = new ShortUniqueId({
    length: 10 
  });
  
  const merchantStoreSelectedProduct = useSelector(state => state.merchant.selectedProduct);
  const merchantStoreName = useSelector(state => state.merchant.brandName);
  const cart = useSelector(state => state.cart.items);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(merchantStoreSelectedProduct.item.price);
  const [itemCount, setItemCount] = useState(1);
  const [isItemInCart, setIsItemInCart] = useState(false);
  const [modifierGroups, setModifierGroups] = useState([]);
  const [modifiers, setModifiers] = useState([]);
  const [selectedModifiers, setSelectedModifiers] = useState([]);
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
    setTotalPrice(itemCount * merchantStoreSelectedProduct.item.price);
  }, [false]);

  const checkCart = async () => { 
    setLoading(true);
    const itemInCart = cart.find(item => item.id === merchantStoreSelectedProduct.id);
    
    if (itemInCart === undefined) {
      setIsItemInCart(false); 
      setItemCount(merchantStoreSelectedProduct.quantity);

    } else {
      isItemInCart ? setItemCount(1) : setItemCount(itemInCart.quantity);
      setItemCount(itemInCart.quantity);
      setIsItemInCart(true); 
      console.log('old itemCount: ', itemCount);
    }

    const modifierGroupsData = await fetchModifierGroups();
    await fetchModifiers(modifierGroupsData);
    setLoading(false);
  };
  
  const handleCartButtoon = () => {
    if (isItemInCart) {
      const cartItemUpdate = { 
        id: merchantStoreSelectedProduct.id, 
        item: merchantStoreSelectedProduct.item, 
        quantity: parseInt(itemCount), 
        modifiers: null, // TODO: update modifiers
        sentToKitchen: merchantStoreSelectedProduct.sentToKitchen,
        customerRecieved: merchantStoreSelectedProduct.customerRecieved,
        orderPaid: merchantStoreSelectedProduct.paid 
      };

      console.log('update cartItem to: ', cartItemUpdate);
      dispatch(updateCart(cartItemUpdate));
    } else {
      const cartOrderInsert = { 
        id: uid(), 
        item: merchantStoreSelectedProduct.item, 
        quantity: parseInt(itemCount), 
        modifiers: null, // TODO: add initial modifiers
        status: 'pending',
        sentToKitchen: false
      };
        
      console.log('add new order to cart: ', cartOrderInsert);
      dispatch(addToCart(cartOrderInsert));
    }
    
    navigate(-1);
  };

  const handleModifierCountInput = (count) => {
    setItemCount(count);
    console.log('item price: ', merchantStoreSelectedProduct.item.price);
    setTotalPrice(count * merchantStoreSelectedProduct.item.price);
  };

  const fetchModifierGroups = async () => {
    const { data, error } = await supabasePublic.from('modifiergroups')
      .select('*')
      .match({
        'product_id': merchantStoreSelectedProduct.item.id
      });

    console.log('modifier groups: ', data);
    if (error) throw error;
    setModifierGroups(data);
    return data;
  };

  const fetchModifiers = async (modifierGroupsData) => {
    const hydratedModifierGroups = modifierGroupsData.map(async (modifierGroup) => {
      const { data, error } = await supabasePublic.from('modifiers')
        .select('*')
        .match({
          'modifier_groups_id': modifierGroup.id
        });
      return {
        ...modifierGroup, modifiers: data 
      };
    });

    setModifierGroups(await Promise.all(hydratedModifierGroups));
    console.log('hydrated modifier groups: ', await Promise.all(hydratedModifierGroups));
  };

  const handleSpecialRequest = (e) => {
    setSpecialRequest(e.target.value);
  };

  const modifierGroupDescription = (modifierGroup) => {
    if (modifierGroup.select_count === 1) return (<Text>Select one</Text>);
    else if (modifierGroup.select_count >= 2) return (<Text>Select up to {modifierGroup.select_count}</Text>);

    return (<Text>{modifierGroup.description}</Text>);
  };

  const modifierGroupRequired = (modifierGroup) => {
    if (modifierGroup.required) return (
      <Box bg="gray.100" borderRadius={'md'} px={2} py={1}>
        <Text fontSize={'xs'} color="gray.500" >Required</Text>
      </Box>
    );
    return null;
  };

  return (
    <Box bg="white" minH="100vh">
      <Box h="60px">
        <Navbar title={merchantStoreName} showBackButton={true}  />
      </Box>
      {merchantStoreSelectedProduct.item.image_url !== null ? (
        <Image h="175" w="100vw" mb="4" objectFit="cover" src={merchantStoreSelectedProduct.item.image_url} alt="menu" />
      ) : <Divider mb="8" />}
      <Box h="100%" pb="200px">
        
        <Flex mb={'16'} direction="column" w="100%" textAlign={'left'}>
          <Box px="6" mb="8">
            <Heading mb="2">{merchantStoreSelectedProduct.item.name}</Heading>
            <Text fontSize={'20'} mb="8">{merchantStoreSelectedProduct.item.description}</Text>
            <Text fontSize={'20'}>${merchantStoreSelectedProduct.item.price.toFixed(2)}</Text>
          </Box>
          
          {modifierGroups.length > 1 ? (
            modifierGroups.map((modifierGroup) => {
              return (modifierGroup.product_id === merchantStoreSelectedProduct.item.id ? (
                <Box key={modifierGroup.id} mb='4'>
                  <Box py="4" px="6" mb="2" bg="gray.50">
                    <Flex alignItems={'center'} justifyContent='space-between' mb={1}>
                      <Heading size={'md'}>{modifierGroup.name}</Heading>
                      {modifierGroupRequired(modifierGroup)}
                    </Flex>
                    {modifierGroupDescription(modifierGroup)}
                  </Box>
                  <CheckboxGroup>
                    <Stack 
                      direction='column' 
                      px="6"
                      divider={<StackDivider borderColor='gray.200' />}>
                      {modifierGroup?.modifiers?.map(modifier => {
                        return(
                          <Checkbox py="3" key={modifier.id} value={modifier.name}>{modifier.name}</Checkbox>
                        );  
                      })}
                    </Stack>
                  </CheckboxGroup>
                </Box>
              ) : null); 
            })
          ) : null}
          <Box px="6">
            <Textarea 
              onChange={(e) => handleSpecialRequest(e)} 
              background={'gray.50'}
              minH="150"
              mt="8"
              placeholder='Special requests' />
          </Box>
          <HStack 
            mt="8" 
            px="6"
            maxW='320px' 
            flexGrow={true}>
            <Button 
              border="1px solid #363636" 
              bg={'black'}
              color={'#f6f6f6'}
              py='4' 
              h="100%" 
              maxH="64px" 
              minW="64px" {...inc}>+</Button>
            <Input 
              background={'#f6f6f6'}
              focusBorderColor={'#363636'} 
              py='4'
              maxW="100px"
              borderColor={'#363636'}
              textAlign={'center'}
              h="100%"
              maxH="64px"
              {...input} />
            <Button 
              border="1px solid #363636" 
              bg={'black'}
              color={'#f6f6f6'}
              py='4' 
              h="100%" 
              maxH="64px" 
              minW="64px" 
              {...dec}>-</Button>
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
          <ModifierButton isItemInCart={isItemInCart} handleOnClick={handleCartButtoon} numberOfItems={itemCount} totalPrice={totalPrice} />
        </Flex>
      </Box>
      
    </Box>
  );
}
