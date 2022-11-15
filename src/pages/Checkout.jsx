/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react';
import { supabasePrivate } from '../services/supabasePrivate';
import { useNavigate } from 'react-router-dom';
import {
  VStack, Box, useToast, Button, StackDivider, useDisclosure, Flex, Text, Spacer,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import jsonToQueryString from '../tools/jsonToQueryString';
import queryStringToJSON from '../tools/queryStringToJSON';
import CartItemCard from '../components/CartItemCard';
import { setSelectedProduct } from '../context/slices/merchantSlice';

export default function CheckoutPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cart = useSelector(state => state.cart.items);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [orderSentSuccessfully, setOrderSentSuccessfully] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [totalCost, setTotalCost] = useState(cart.reduce((acc, item) => acc + (parseInt(item.item.price) * item.quantity), 0));
  const [totalSubCost, setTotalSubCost] = useState(totalCost*(0.0825));

  const roomId = 'nu-wood-fire-grill';
  const userId = 'user1';

  useEffect(() => {
    setTotalCost(cart.reduce((acc, item) => acc + (parseInt(item.item.price) * item.quantity), 0));
  }, [false]);

  supabasePrivate
    .channel('private:orders')
    .on('postgres_changes', { event: 'INSERT', schema: 'private', table: 'orders' }, payload => handleOrderInsert(payload))
    .subscribe();

  const handleOrderInsert = (payload) => {
    console.log('INSERT', payload);
    setOrderSentSuccessfully(true);
  };

  const handleSendOrder = async () => {
    const res = await supabasePrivate.from('orders').insert({
      room_id: roomId,
      user_id: userId,
      message: '0rr!'
    });

    console.log(res);

    if (res.status !== 201) {
      showAlert('Error placing order', 'error');
      setOrderSentSuccessfully(false);
      throw `${err}: Error placing order`;
    }
  };

  const handlePayment = async () => {

    const data = {
      'security_key': process.env.REACT_APP_STC_SK,
      'type': 'sale',
      'amount': 1233.10,
      'ccnumber': 4111111111111111,
      'ccexp': 1025,
      'cvv': 999,
      // 'first_name': 'Test',
      // 'last_name': 'User'
    };
  
    const options = {
      method: 'POST'
    };

    fetch(`https://cors-anywhere.herokuapp.com/https://sharingthecredit.transactiongateway.com/api/transact.php${jsonToQueryString(data)}`, options)
      .then(response => {
        response.text().then((query) => {
          const jsonQuery = queryStringToJSON(query);
          if (jsonQuery.response_code !== '100') {
            showAlert('Error making payment', 'error');
            setPaymentSuccessful(false);
            throw `${jsonQuery.responsetext}: Error making payment`;
          }
          setPaymentSuccessful(true);
        });
      });
  };

  const handleCheckout = async () => {
    setLoading(true);
    navigate('/tips');
    // await handlePayment();
    // await handleSendOrder();

    // if (orderSentSuccessfully && paymentSuccessful) navigate('/order-confirmed');
    setLoading(false);
  };

  const handleEditCartItem = (item) => {
    dispatch(setSelectedProduct(item));
    navigate('/modifiers');
  };

  const showAlert = (message, status) => {
    toast({
      title: `${message}`,
      status: `${status}`,
      isClosable: true,
      position: 'top'
    });
  };

  return (
    <Box bg="#f6f6f6">
      <Navbar title="Checkout" showBackButton={true} />
      <VStack
        pt="32"
        spacing={4}
        align="stretch"
        px="6"
        mb="8"
      >
        {cart.map((item, index) => {
          return(
            <CartItemCard
              key={index}
              onClick={(item) => handleEditCartItem(item)}
              item={item}
              index={index}
              setTotalCost={setTotalCost}
              cart={cart}
              // totalCost={0}
              // setTotalCost={0}
            />);
         
        } )}
      </VStack>
      <VStack
        spacing={4}
        align="stretch"
        px="6">
        <Flex>
          <Text>Subtotal</Text>
          <Spacer />
          <Text>${totalCost.toFixed(2)}</Text>
        </Flex>
        <Flex>
          <Text>Tax</Text>
          <Spacer />
          <Flex alignItems='center'>
            <Text mr="2" fontSize={'12'} color='gray.700'>(8.25%)</Text>
            <Text pr="1">${totalSubCost.toFixed(2)}</Text>
          </Flex>
        </Flex>
        <StackDivider borderColor="gray.200" />
        <Flex pb="4">
          <Text fontSize={'2rems'} fontWeight={'bold'}>Total</Text>
          <Spacer />
          <Text fontSize={'2rems'} fontWeight={'bold'}>${(totalCost+totalSubCost).toFixed(2)}</Text>
        </Flex>
        <Button onClick={handleCheckout} isLoading={loading} width="100%" bg="black" size="lg" color="white">Continue</Button>
      </VStack>
      {/* <Stack>
          <Heading size="sm">Payment</Heading>
          <PaymentTypes />
        </Stack> */}

    </Box>
  );
}
