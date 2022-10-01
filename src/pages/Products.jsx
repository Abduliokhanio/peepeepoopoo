import React, { useState, useEffect} from 'react';
import { supabase } from '../services/supabaseClient';
import Navbar from '../components/Navbar';
import MenuItem from '../components/MenuCard';
import ModifierModal from '../components/ModifierModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import CheckoutButton from '../components/CheckoutButton';
import {
  Stack, VStack, useEditableControls, Text, EditableInput, StackDivider, useDisclosure, Flex, Spacer, Editable, IconButton, EditablePreview, EditableControls, Input, ButtonGroup, Box
} from '@chakra-ui/react';
import { CheckIcon, EditIcon } from '@chakra-ui/icons';

export default function ProductsPage() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const QRCodeURL = 'https://www.orderahead.io/';
  const QRCodePath = 'nu-wood-fire-grill';
  const QRCodeTableNumber = '2';

  const [menuOptions, setMenuOptions] = useState([]);
  const [menuLoadList, setMenuLoadList] = useState([]);
  const [merchantName, setMerchantName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [brandColor, setBrandColor] = useState('');

  useEffect(() => {
    fetchMenu();
    setTableNumber(QRCodeTableNumber);
  }, [false]);

  const fetchMenu = async () => { 
    const fetchMerchant = await supabase
      .from('merchants')
      .select('id, name, url_path, brand_color').match({url_path: QRCodePath});

    console.log(fetchMerchant);
    setMerchantName(fetchMerchant.data[0].name);
    setBrandColor(fetchMerchant.data[0].brand_color);
    const merchantId = fetchMerchant.data[0].id;

    const fetchMenus = await supabase
      .from('categories')
      .select().match({merchant_id: merchantId});

    setMenuOptions(fetchMenus.data);
    setMenuLoadList(menuOptions.slice(0, 5));

    // if (error) {
    //   throw error;
    // }
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      setMenuLoadList(menuLoadList.concat(menuOptions.from({ length: 5 })));
    }, 1500);
  };

  const displayMenus = () => {
    console.log(menuOptions);
    
    return(
      menuOptions.map((menuOption, index) => (<MenuItem
        key={index}
        onClick={onOpen}
        title={menuOption.name}
        desc={menuOption.description}
      />)));
  };

  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  };

  const bannerImage = 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80';

  return (
    <Box>
      <Flex direction="column">
        <ModifierModal isOpen={isOpen} onClose={onClose} modifierType="new" />
        <Navbar title={merchantName} showBackButton={true} brandColor={brandColor} />
        <VStack py="16" backgroundImage={bannerImage} objectFit="cover" mb="8">
          <Editable
            textAlign='center'
            fontSize='md'
            value={tableNumber}
            isPreviewFocusable={false}
          >
            <Flex bg="white" px="5" py="3" borderWidth="1px" borderColor="gray.300" justifyContent="space-around" borderRadius="100px" direction="row" alignItems='center'>
              <Flex alignItems='center'>
                <Text fontSize="mg" fontWeight='semibold'>Table</Text>
                <Input w='100%' mx="2" maxW="14" as={EditableInput} />
                <EditablePreview fontSize="md" fontWeight='semibold' ml="1" mr="3"/>
              </Flex>
              <EditableControls />
            </Flex>
          </Editable>
        </VStack>

        <Stack pb='100' px="6" bg="#F9FBFC">
          <Text mb="2" fontWeight="semibold" textAlign="left" w='100%'>Order to your table</Text>
          <InfiniteScroll
            dataLength={menuLoadList.length} 
            next={fetchMoreData}
            hasMore={true}
          >
            <VStack
              spacing='6'
              align="stretch"
            >
              {menuLoadList.length === 0 ? null : displayMenus()}
            </VStack>
          </InfiniteScroll>;
        </Stack>
        <Spacer />
      </Flex>
      <CheckoutButton brandColor={brandColor} />
    </Box>
  );
}
