import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { supabasePublic } from '../services/supabasePublic';
import Navbar from '../components/Navbar';
import MenuCard from '../components/MenuCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import CheckoutButton from '../components/CheckoutButton';
import {
  Stack, VStack, useEditableControls, Text, EditableInput, StackDivider, useDisclosure, Flex, Spacer, Editable, IconButton, EditablePreview, EditableControls, Input, ButtonGroup, Box
} from '@chakra-ui/react';
import { CheckIcon, EditIcon } from '@chakra-ui/icons';

export default function CategoriesPage() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const QRCodeURL = 'https://www.orderahead.io/';
  const QRCodePath = 'nu-wood-fire-grill';
  const QRCodeTableNumber = '2';
  const navigate = useNavigate();
  
  const [menuOptions, setMenuOptions] = useState([]);
  const [merchantName, setMerchantName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [brandColor, setBrandColor] = useState('');

  useEffect(() => {
    fetchMenu();
    setTableNumber(QRCodeTableNumber);
    localStorage.setItem('tableNumber', QRCodeTableNumber);
  }, [false]);

  const handleMenuSelect = (menuId, menuName) => { 
    console.log('menu selected', menuName, menuId);
    localStorage.setItem('categoryName', menuName);
    localStorage.setItem('categoryID', menuId);
    navigate('/products');
  };

  const fetchMenu = async () => { 
    const fetchMerchant = await supabasePublic
      .from('merchants')
      .select('id, name, url_path, brand_primary_color').match({url_path: QRCodePath});

    setMerchantName(fetchMerchant.data[0].name);
    localStorage.setItem('merchantName', fetchMerchant.data[0].name);
    setBrandColor(fetchMerchant.data[0].brand_primary_color);
    localStorage.setItem('brandColor', fetchMerchant.data[0].brand_primary_color);
    
    const merchantId = fetchMerchant.data[0].id;
    localStorage.setItem('merchantID', merchantId);

    const fetchMenus = await supabasePublic
      .from('categories')
      .select().match({merchant_id: merchantId});
      
    if (fetchMerchant.error) {
      throw fetchMerchant.error;
    } else {
      setMenuOptions(fetchMenus.data);
      localStorage.setItem('menuOptions', fetchMenus.data);
    }
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      menuOptions(menuOptions.concat(menuOptions.from({ length: 5 })));
    }, 1500);
  };

  const displayMenus = () => {
    return(
      menuOptions.map((menu, index) => (<MenuCard
        key={index}
        onClick={() => handleMenuSelect(menu.id, menu.name)}
        title={menu.name}
        desc={menu.description}
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

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const bannerImage = 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=100';

  return (
    <Box>
      <Flex direction="column">
        <Navbar title={merchantName} showBackButton={false} showAccountButton={true} brandColor={brandColor} />
        <VStack mt="16" py="16" backgroundImage={bannerImage} backgroundSize="cover" backgroundPosition="center" mb="8">
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

        <Stack pb='115' px="6" bg="#F9FBFC">
          <Text mb="2" fontWeight="semibold" textAlign="left" w='100%'>Order to your table</Text>
          <InfiniteScroll
            dataLength={menuOptions.length} 
            next={fetchMoreData}
          >
            <VStack
              spacing='6'
              align="stretch"
            >
              {menuOptions.length === 0 ? null : displayMenus()}
            </VStack>
          </InfiniteScroll>;
        </Stack>
        <Spacer />
      </Flex>
      <CheckoutButton handleCheckout={handleCheckout} brandColor={brandColor} />
    </Box>
  );
}
