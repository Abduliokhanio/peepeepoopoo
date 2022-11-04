/* eslint-disable no-undef */
import React from 'react';
import { supabasePrivate } from '../services/supabasePrivate';
import {
  VStack, Stack, Button, StackDivider, useDisclosure, Heading, Flex, Text, Spacer,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import ModifierModal from '../components/ModifierModal';
import TipOptions from '../components/TipOptions';

export default function CheckoutPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const roomId = 'nu-wood-fire-grill';
  const userId = 'user1';

  supabasePrivate
    .channel('private:orders')
    .on('postgres_changes', { event: 'INSERT', schema: 'private', table: 'orders', filter: `room_id=eq.${roomId}`, }, payload => handleOrderInsert(payload))
    .subscribe();

  const handleOrderInsert = (payload) => {
    console.log('INSERT', payload);
  };

  const handleOrder = async (order) => {
    const res = await supabasePrivate.from('orders').insert({
      room_id: roomId,
      user_id: userId,
      message: 'dddd!'
    });
    console.log('INSERT SUCCESS', res);
  };

  const handlePlaceOrder = async () => {
  };

  function jsonToQueryString(json) {
    return '?' + 
        Object.keys(json).map(function(key) {
          return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
  }

  const handlePayment = async () => {

    const data = {
      'type': 'sale',
      'amount': 102303.00,
      'ccnumber': 4111111111111111,
      'ccexp': 1025,
      'cvv': 999,
      // 'first_name': 'Test',
      // 'last_name': 'User',
      // 'address1': '888 Main St',
      // 'city': 'New York',
      // 'state': 'NY',
      // 'zip' : '77777',
      // 'shipping_first_name': 'User',
      // 'shipping_last_name': 'Test',
      // 'shipping_address1': '987 State St',
      // 'shipping_city': 'Los Angeles',
      // 'shipping_state': 'CA',
      // 'shipping_zip' : '98765',
      'security_key': process.env.REACT_APP_STC_SK
    };
  
    const options = {
      method: 'POST'
    };

    fetch(`https://cors-anywhere.herokuapp.com/https://sharingthecredit.transactiongateway.com/api/transact.php${jsonToQueryString(data)}`, options)
      .then(response => {
        response.text().then((s) => {
          console.log(s);
        });

      })
      .then((data, err) => {
        console.log(JSON.stringify(data));
        console.log(err);
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
        <Button onClick={handlePlaceOrder} mt="4" width="100%" bg="black" size="lg" color="white">Place Order</Button>
      </VStack>
    </div>
  );
}
