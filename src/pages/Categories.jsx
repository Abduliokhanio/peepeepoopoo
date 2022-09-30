import React, { useState, useEffect} from 'react';
import {
  Stack, VStack, Select, StackDivider, useDisclosure, Flex, Spacer,
} from '@chakra-ui/react';
import MenuItem from '../components/MenuItem';
import { supabase } from '../services/supabaseClient';
import ModifierModal from '../components/ModifierModal';
import CheckoutButton from '../components/CheckoutButton';
import Navbar from '../components/Navbar';

export default function CategoriesPage() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const QRCodeURL = 'https://www.orderahead.io/';
  const QRCodePath = 'nu-wood-fire-grill';
  const QRCodeTableNumber = '2';

  const [menuOptions, setMenuOptions] = useState([]);
  const [merchantName, setMerchantName] = useState('');

  useEffect(() => {
    fetchMenu();
  }, [false]);

  const fetchMenu = async () => { 
    const fetchMerchant = await supabase
      .from('merchants')
      .select('id, name, url_path').match({url_path: QRCodePath});

    setMerchantName(fetchMerchant.data[0].name);
    const merchantId = fetchMerchant.data[0].id;

    const fetchMenus = await supabase
      .from('categories')
      .select().match({merchant_id: merchantId});

    setMenuOptions(fetchMenus.data);

    // if (error) {
    //   throw error;
    // }
  };

  const displayMenus = () => {
    console.log(menuOptions);
    return(
      menuOptions.map((menuOption, index) => (<MenuItem
        key={index}
        onClick={onOpen}
        title={menuOption.name}
        price={menuOption.price}
      />)));
  };

  return (
    <Flex direction="column" minH="100vh">
      <Navbar title={merchantName} showBackButton={false} />
      <Stack px="6">
        <ModifierModal isOpen={isOpen} onClose={onClose} modifierType="new" />
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          {menuOptions.length === 0 ? null : displayMenus()}
        </VStack>
      </Stack>
      <Spacer />
      <CheckoutButton />
    </Flex>
  );
}
