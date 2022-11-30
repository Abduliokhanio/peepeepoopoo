import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {supabasePublic} from '../services/supabasePublic';
import ModifierButton from '../components/ModifierButton';
import {
  Heading, Image, Container, useNumberInput, Flex, Textarea, Text, Box, HStack, Button, Input, Divider
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateCart } from '../context/slices/cartSlice';
import ShortUniqueId from 'short-unique-id';
import { Formik, Field, Form } from 'formik';

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

    const modifierGroupsRes = await fetchModifierGroups();
    await fetchModifiers(modifierGroupsRes);
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

  const fetchModifiers = async (modifierGroupsRes) => {
    await modifierGroupsRes.forEach(async (modifierGroupRes) => {
      const { data, error } = await supabasePublic.from('modifiers')
        .select('*')
        .match({
          'modifier_groups_id': modifierGroupRes.id
        });
      if (error) throw error;
      console.log('data: ', data);
      setModifiers({
        data: [...modifiers, ...data]
      });
      
    });
    console.log('aaa', modifiers);
  };

  const displayModifiers = async (modifierGroup) => {
    const rightModifers = await modifiers.filter(modifier => modifier.modifier_groups_id === modifierGroup.id);
    console.log('rightModifers: ', rightModifers);
    // modifiers.map(modifier => {
    //   return(
    //     <label key={modifier.id}>
    //       <Field type="checkbox" name={modifier.name} value="One" />
    //       {modifier.name}
    //     </label>
    //   ); 
    //   // return(modifierGroup.id === modifier.modifier_groups_id ? (
    //   //   <label key={modifier.id}>
    //   //     <Field type="checkbox" name={modifier.name} value="One" />
    //   //     {modifier.name}
    //   //   </label>
    //   // ) : null);
    // })
    return(<Text>hi</Text>);
  };

  const handleCheckedModifiers = (e) => {
    // const modifier = {
    //   id: e.target.value,
    //   name: e.target.name,
    //   price: e.target.dataset.price
    // };
    // setSelectedModifiers([...selectedModifiers, modifier]);
    // console.log('selected modifiers: ', selectedModifiers);
  };

  const handleSpecialRequest = (e) => {
    setSpecialRequest(e.target.value);
  };

  return (
    <Box bg="white" minH="100vh">
      <Box h="60px">
        <Navbar title={merchantStoreName} showBackButton={true}  />
      </Box>
      {merchantStoreSelectedProduct.item.image_url !== null ? (
        <Image h="175" w="100vw" mb="4" objectFit="cover" src={merchantStoreSelectedProduct.item.image_url} alt="menu" />
      ) : <Divider mb="8" />}
      <Container h="100%">
        
        <Flex mb={'16'} direction="column" w="100%" textAlign={'left'}>
          <Heading mb="2">{merchantStoreSelectedProduct.item.name}</Heading>
          <Text fontSize={'20'} mb="8">{merchantStoreSelectedProduct.item.description}</Text>
          <Text fontSize={'20'}>${merchantStoreSelectedProduct.item.price.toFixed(2)}</Text>
          
          {modifierGroups.length > 1 ? (
            modifierGroups.map((modifierGroup) => {
              return (modifierGroup.product_id === merchantStoreSelectedProduct.item.id ? (
                <Box key={modifierGroup.id} mb='4'>
                  <Formik
                    initialValues={{
                      checked: [],
                    }}
                  >
                    {({ values }) => (
                      <Form
                        onChange={(e) => handleCheckedModifiers(e)}>
                        <Heading size={'lg'}>{modifierGroup.name}</Heading>
                        <div role="group" aria-labelledby="checkbox-group">
                          <Flex direction={'column'}>
                            {/* {modifiers.length > 1 ? displayModifiers(modifierGroup) : null} */}
                          </Flex>
                        </div>

                      </Form>
                    )}
                  </Formik>
                </Box>
              ) : null); 
            })
          ) : null}
          
          <Textarea 
            onChange={(e) => handleSpecialRequest(e)} 
            background={'#f6f6f6'}
            minH="150"
            mt="8"
            placeholder='Special requests' />
          <HStack mt="8" maxW='320px' flexGrow={true}>
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
      </Container>
      
    </Box>
  );
}
