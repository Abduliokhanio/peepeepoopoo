/* eslint-disable no-undef */
import React, {useState} from 'react';
import { supabasePrivate } from '../services/supabasePrivate';
import { useNavigate } from 'react-router-dom';
import {
  VStack, Stack, Box, useToast, Button, StackDivider, useDisclosure, Heading, Flex, Text, Spacer,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import ModifierModal from '../components/ModifierModal';
import jsonToQueryString from '../tools/jsonToQueryString';
import queryStringToJSON from '../tools/queryStringToJSON';
import CartItemCard from '../components/CartItemCard';

export default function CheckoutPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cart = useSelector(state => state.cart.items);
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderSentSuccessfully, setOrderSentSuccessfully] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [totalCost, setTotalCost] = cart.reduce((acc, item) => acc + item.price, 0);
  const [totalSubCost, setTotalSubCost] = useState(0);

  const roomId = 'nu-wood-fire-grill';
  const userId = 'user1';

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
      <ModifierModal isOpen={isOpen} onClose={onClose} modifierType="update" />
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
              onClick={onOpen}
              item={item}
              totalCost={totalCost}
              setTotalCost={setTotalCost}
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
          <Text>${totalSubCost}</Text>
        </Flex>
        <Flex>
          <Text>Tax</Text>
          <Spacer />
          <Text pr="1">$2.10</Text>
          <Text>(8%)</Text>
        </Flex>
        <StackDivider borderColor="gray.200" />
        <Flex pb="4">
          <Text fontSize={'2rems'} fontWeight={'bold'}>Total</Text>
          <Spacer />
          <Text fontSize={'2rems'} fontWeight={'bold'}>${totalCost}</Text>
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
