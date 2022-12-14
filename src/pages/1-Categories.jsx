/* eslint-disable no-undef */
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabasePublic } from '../services/supabasePublic';
import Navbar from '../components/Navbar';
import MenuCard from '../components/CategoryCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import CheckoutButton from '../components/CheckoutButton';
import {
  Stack, VStack, HStack, Image, Button, Drawer, DrawerOverlay, DrawerBody, DrawerHeader, DrawerContent, useDisclosure, useEditableControls, Text, EditableInput, Flex, Spacer, Editable, IconButton, EditablePreview, EditableControls, Input, ButtonGroup, Box
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setMerchantID, setProducts, setURLPath, setBrandName, setMenuOptions, setCategoryName, setCategoryID, setTableNumber } from '../context/slices/merchantSlice';
import { setOrderTax, updateOrderMethod } from '../context/slices/cartSlice';
import { track, init } from '@amplitude/analytics-browser';

export default function CategoriesPage() {
  const cart = useSelector(state => state.cart.items);
  const merchantStore = useSelector(state => state.merchant);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderMethodDisclosure = useDisclosure();
  const changeTableDisclosure = useDisclosure();
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [currentTableNumber, setCurrentTableNumber] = useState(null);
  const [merchantURL, setMerchantURL] = useState(null);
  const [bannerImageURL, setBannerImageURL] = useState(null);
  const [merchantName, setMerchantName] = useState(null);
  const [orderMethod, setOrderMethod] = useState(currentTableNumber ? 'Dine-in' : 'Pickup');

  useEffect(() => {
    initPage();
  }, []);

  const initPage = async () => {
    const merchantURLPath = await checkURLPath();
    const merchantID = await fetchMerchantInfo(merchantURLPath);
    await fetchMenu(merchantID);
    await fetchProducts(merchantID);
    init(process.env.REACT_APP_AMPLITUDE_KEY);
    track('Page Visit', merchantName);
    
  };

  const checkURLPath = async () => {
    let merchantURLPath;
    let currentTableNumber;
    const host = window.location.host;

    if (window.location.pathname.includes('table')) {
      currentTableNumber = window.location.pathname.match(/table\/(.*)/);
      updateTableNumber(currentTableNumber[1]);
      if (host.includes('orderahead.io')) {
        merchantURLPath = window.location.href.match(/orderahead.io\/(.*)\/table/);
        setMerchantURL(merchantURLPath[1]);
      } else if (host === 'localhost:3000') {
        merchantURLPath = window.location.href.match(/localhost:3000\/(.*)\/table/);
        setMerchantURL(merchantURLPath[1]);
      }
      dispatch(updateOrderMethod('Dine-in'));
      return merchantURLPath[1];
    } 

    merchantURLPath = window.location.pathname.replace(/\//g,'');
    dispatch(updateOrderMethod('Pickup'));
    updateTableNumber(null);
    setMerchantURL(merchantURLPath);
    return merchantURLPath;
  };

  const updateTableNumber = async (currentTableNumber) => {
    dispatch(setTableNumber(currentTableNumber));
    setCurrentTableNumber(currentTableNumber);
  };

  const fetchMerchantInfo = async (merchantURLPath) => {
    dispatch(setURLPath(merchantURLPath));
    await fetchBannerImage(merchantURLPath);

    const fetchMerchant = await supabasePublic
      .from('merchants')
      .select('id, name, url_path, sales_tax').match({
        url_path: merchantURLPath
      });

    // if (fetchMerchant.data.length === 0) navigate('/404');
    if (fetchMerchant.error) throw fetchMerchant.error;
   
    dispatch(setOrderTax(fetchMerchant.data[0].sales_tax));
    dispatch(setMerchantID(fetchMerchant.data[0].id));
    dispatch(setBrandName(fetchMerchant.data[0].name));
    setMerchantName(fetchMerchant.data[0].name);
   
    return fetchMerchant.data[0].id;
  };

  const fetchMenu = async (merchantID) => { 
    setLoadingMenu(true);

    const fetchMenus = await supabasePublic
      .from('categories')
      .select().match({
        merchant_id: merchantID
      });

    if (fetchMenus.data.length === 0 ) throw fetchMenu.error;
    const sortedCategories = fetchMenus.data.sort((a, b) => parseFloat(a.position) - parseFloat(b.position));
    dispatch(setMenuOptions(sortedCategories));
    setLoadingMenu(false);
  };

  const fetchProducts = async (merchantID) => { 
    const fetchProducts = await supabasePublic
      .from('products')
      .select().match({
        merchant_id: merchantID 
      });
    // console.log('fetchProducts:', fetchProducts);
    if (fetchProducts.data.length === 0 ) throw fetchProducts.error;
    // console.log('fetchProducts.data:', fetchProducts.data);
    dispatch(setProducts(fetchProducts.data));
  };

  const handleMenuSelect = (menuId, menuName) => { 
    dispatch(setCategoryName(menuName));
    dispatch(setCategoryID(menuId));
    navigate('/products');
  };

  const displayMenus = () => {
    return(
      merchantStore.menuOptions.map((menu, index) => (
        <Flex 
          key={index} 
          onClick={() => handleMenuSelect(menu.id, menu.name)}
          borderBottom='1px' 
          borderColor='gray.200' 
          px="6" 
          py="4" 
          alignItems={'center'}
          justifyContent="space-between">
          <VStack spacing="1">
            <Text  textAlign={'left'} fontSize="xl" w="100%">{menu.name}</Text>
            <Text  textAlign={'left'} fontSize="sm" w="100%" color="gray.500">{menu.description}</Text>
          </VStack>
          <ChevronRightIcon />
        </Flex>
      )));
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      setMenuOptions(merchantStore.menuOptions.concat(merchantStore.menuOptions.from({
        length: 5 
      })));
    }, 1500);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const fetchBannerImage = async (merchantURLPath) => {
    const bannerImage = await supabasePublic.storage
      .from('merchants')
      .getPublicUrl(merchantURLPath + '/banner');
      
    if (bannerImage.data.publicUrl.length > 1) setBannerImageURL(bannerImage.data.publicUrl);
    if (bannerImage.error) throw bannerImage.error;
  };

  const handleOrderMethod = (orderMethod) => {
    setOrderMethod(orderMethod);
    dispatch(updateOrderMethod(orderMethod));
    orderMethodDisclosure.onClose();
  };

  return (
    <Box 
      bg="#f6f6f6">
      <Drawer placement={'bottom'} onClose={orderMethodDisclosure.onClose} isOpen={orderMethodDisclosure.isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>How would you like to order?</DrawerHeader>
          <DrawerBody>
            <Flex onClick={() => handleOrderMethod('Dine-in')} borderBottom='1px' borderColor='gray.200' py="6" justifyContent="space-between">
              <HStack spacing="4">
                <Text fontSize="xl">Dine-in</Text>
              </HStack>
              <ChevronRightIcon fontSize="xl"/>
            </Flex>
            <Flex onClick={() => handleOrderMethod('Pickup')} borderBottom='1px' borderColor='gray.200' py="6" justifyContent="space-between">
              <HStack spacing="4">
                <Text fontSize="xl">Pickup</Text>
              </HStack>
              <ChevronRightIcon fontSize="xl"/>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Drawer placement={'bottom'} onClose={changeTableDisclosure.onClose} isOpen={changeTableDisclosure.isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Where are you seated?</DrawerHeader>
          <DrawerBody>
            <Flex direction={'column'}>
              <Input mt="2" onChange={(e) => updateTableNumber(e.target.value)} placeholder='Table number' size='lg' />
              <Button onClick={changeTableDisclosure.onClose} my="4" bg={'black'} color={'white'} size='lg'>Confirm</Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Flex direction="column">
        <Navbar title={merchantStore.brandName} showBackButton={false} showAccountButton={true} />
        <VStack 
          py={'20'}
          backgroundImage={bannerImageURL} 
          backgroundSize="cover" 
          backgroundPosition="center">
          <Flex 
            backdropFilter="blur(3px)"
            bg='rgba(240, 240, 240, 0.8)'            
            px="6"
            py="3"
            borderWidth="1px"
            borderColor="gray.300"
            justifyContent="space-around"
            borderRadius="100px"
            direction="row"
            alignItems='center'
            onClick={orderMethodDisclosure.onOpen}
          >
            <Text color="#1e1e1e" fontSize="lg" fontWeight='semibold'>{orderMethod}</Text>
            <ChevronDownIcon ml="2" fontSize="xl"/>
          </Flex>
        </VStack>
        {orderMethod === 'Dine-in' ? (
          <Flex 
            id="selectTableNumberWrapper"
            justifyContent={'space-between'} 
            alignItems={'center'}
            py="4"
            borderBottomWidth="1px"
            px="6" 
            bg="white">
            {currentTableNumber ? (
              <Text fontSize={'lg'}>Table {currentTableNumber}</Text>
            ) : (
              <Text fontSize={'lg'}>Where are you seated?</Text>
            )}
            <Button onClick={changeTableDisclosure.onOpen}>Change</Button>
          </Flex>
        ) : null}
        <Stack pb='115' px="6">
         
          <InfiniteScroll
            dataLength={merchantStore.menuOptions === null || merchantStore.menuOptions === undefined ? 0 : merchantStore.menuOptions.length} 
            next={fetchMoreData}
          >
            <VStack
              mt="2"
              align="stretch"
            >
              {merchantStore.menuOptions === null || merchantStore.menuOptions === undefined ? null : displayMenus()}
            </VStack>
          </InfiniteScroll>;
        </Stack>
        <Spacer />
      </Flex>
      {cart ? <CheckoutButton handleCheckout={handleCheckout} /> : null}
    </Box>
  );
}
