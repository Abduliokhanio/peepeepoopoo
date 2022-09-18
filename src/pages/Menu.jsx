import React from 'react';
import {
  Stack, VStack, Select, StackDivider, useDisclosure, Flex, Spacer,
} from '@chakra-ui/react';
import MenuItem from '../components/MenuItem';
import ModifierModal from '../components/ModifierModal';
import CheckoutButton from '../components/CheckoutButton';
import Navbar from '../components/Navbar';

export default function MenuPage() {
  // TODO: DYNAMIC MENU ITEM
  const menuItem = [{
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
    title: 'Dumplings',
    qty: 2,
    desc: 'Steamed or fried dumplings',
    formattedPrice: '$6.50',
    page: 'menu',
  },
  {
    imageUrl: 'https://s3-media0.fl.yelpcdn.com/bphoto/PoMklTGkQ3P3biQkJqCUww/348s.jpg',
    imageAlt: 'img of noofdle',
    title: 'Noolde',
    qty: 4,
    desc: 'Stirfryed noodles',
    formattedPrice: '$12.50',
    page: 'menu',
  },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex direction="column" minH="100vh">
      <Navbar title="Menu" navType="menu" />
      <Stack px="6">
        <ModifierModal isOpen={isOpen} onClose={onClose} modifierType="new" />
        <Select placeholder="Categories">
          <option value="appetizers">Appetizers</option>
          <option value="sandwiches">Sandwiches</option>
          <option value="beef-noodle-soup">Beef Noodle Soup</option>
        </Select>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <MenuItem
            onClick={onOpen}
            title={menuItem[0].title}
            desc={menuItem[0].desc}
            price={menuItem[0].formattedPrice}
            page={menuItem[0].page}
          />
          <MenuItem
            onClick={onOpen}
            title={menuItem[1].title}
            desc={menuItem[1].desc}
            price={menuItem[1].formattedPrice}
            page={menuItem[1].page}
          />
          
        </VStack>
        {/* Checkout button Store order qty and total */}

      </Stack>
      <Spacer />
      <CheckoutButton />
    </Flex>
  );
}
