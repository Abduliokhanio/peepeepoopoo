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

  const handleCheckout = async () => {
  };

  const handlePayment = async () => {
  };

  return (
    <div>
      <ModifierModal isOpen={isOpen} onClose={onClose} modifierType="update" />
      <Navbar title="Checkout" navType="checkout" />
      <VStack
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
        <Button onClick={handleCheckout} mt="4" width="100%" colorScheme="blue">Place Order</Button>
      </VStack>
    </div>
  );
}
