/* eslint-disable no-undef */
import React, {useState} from 'react';
import { supabasePrivate } from '../services/supabasePrivate';
import { useNavigate } from 'react-router-dom';
import {
  VStack, Stack, useToast, Button, StackDivider, useDisclosure, Heading, Flex, Text, Spacer,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import ModifierModal from '../components/ModifierModal';
import TipOptions from '../components/TipOptions';
import jsonToQueryString from '../tools/jsonToQueryString';
import queryStringToJSON from '../tools/queryStringToJSON';

export default function CheckoutPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderSentSuccessfully, setOrderSentSuccessfully] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

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

  const handlePlaceOrder = async () => {
    setLoading(true);
    await handlePayment();
    await handleSendOrder();

    if (orderSentSuccessfully && paymentSuccessful) navigate('/order-confirmed');
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
    <div>
      <ModifierModal isOpen={isOpen} onClose={onClose} modifierType="update" />
      <Navbar title="Checkout" showBackButton={true} />
      <VStack
        pt="16"
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        px="6"
      >
        {/* <MenuItem
          onClick={onOpen}
          qty={menuItem.qty}
          title={menuItem.title}
          desc={menuItem.desc}
          price={menuItem.formattedPrice}
          page={menuItem.page}
        /> */}
        <Stack>
          <Flex>
            <Text>Subtotal</Text>
            <Spacer />
            <Text>$2.10</Text>
          </Flex>
          <Flex>
            <Text>Tax</Text>
            <Spacer />
            <Text pr="1">$2.10</Text>
            <Text>(8%)</Text>
          </Flex>
        </Stack>
        <Stack>
          <Heading size="sm">Tips</Heading>
          <TipOptions />
        </Stack>
        {/* <Stack>
          <Heading size="sm">Payment</Heading>
          <PaymentTypes />
        </Stack> */}
        <Stack>
          <Flex>
            <Text>Total</Text>
            <Spacer />
            <Text>$2.10</Text>
          </Flex>
        </Stack>
        <Button onClick={handlePlaceOrder} mt="4" isLoading={loading} width="100%" bg="black" size="lg" color="white">Continue</Button>
      </VStack>
    </div>
  );
}
