import React from 'react';
import {
  VStack, Link, Stack, Button, StackDivider, useDisclosure, Heading, Flex, Text, Spacer,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ModifierModal from '../components/ModifierModal';
import MenuItem from '../components/MenuItem';
import TipOptions from '../components/TipOptions';

export default function CheckoutPage() {
  // TODO: DYNAMIC MENU ITEM
  const menuItem = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
    title: 'Dumplings',
    qty: 2,
    desc: 'Steamed or fried dumplings',
    formattedPrice: '$6.50',
    page: 'checkout',
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <MenuItem
          onClick={onOpen}
          qty={menuItem.qty}
          title={menuItem.title}
          desc={menuItem.desc}
          price={menuItem.formattedPrice}
          page={menuItem.page}
        />
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
        <Link as={ReachLink} to="/signup">
          <Button mt="4" width="100%" colorScheme="blue">Place Order</Button>
        </Link>
      </VStack>
    </div>
  );
}
