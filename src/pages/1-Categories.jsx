/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabasePublic } from '../services/supabasePublic';
import { supabasePrivate } from '../services/supabasePrivate';
import Navbar from '../components/Navbar';
import InfiniteScroll from 'react-infinite-scroll-component';
import CheckoutButton from '../components/buttons/CheckoutButton';
import { useAuth } from '../context/Auth';
import {
  Stack, 
  VStack, 
  Text, 
  Flex,
  Spacer, 
  Box
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import {setMerchantID, 
  setProducts, 
  setURLPath, 
  setBrandName, 
  setMenuOptions, 
  setCategoryName,
  setCategoryID, 
  setTableNumber, 
  updateBannerImageURL,
  updateAddress } from '../context/slices/merchantSlice';
import { setOrderTax, updateOrderMethod } from '../context/slices/cartSlice';
import { setFirstName, setLastName } from '../context/slices/customerSlice';
import { track, init } from '@amplitude/analytics-browser';

export default function CategoriesPage() {
  const cart = useSelector(state => state.cart.items);
  const merchantStore = useSelector(state => state.merchant);
  const customerFirstName = useSelector(state => state.customer.firstName);
  const selectedOrderMethod = useSelector(state => state.cart.orderType);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [currentTableNumber, setCurrentTableNumber] = useState(null);
  const [merchantURL, setMerchantURL] = useState(null);
  const [bannerImageURL, setBannerImageURL] = useState(useSelector(state => state.merchant.bannerImageURL));
  const [merchantName, setMerchantName] = useState(null);
  const [merchantAddress, setMerchantAddress] = useState(useSelector(state => state.merchant.address));
  const [orderMethod, setOrderMethod] = useState(selectedOrderMethod);

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
    if (customerFirstName === null) await fetchCustomerInfo();
  };

  const fetchCustomerInfo = async () => {
    const customerInfo = await supabasePrivate
      .from('customers')
      .select('first_name, last_name')
      .match({
        id: user.id
      });

    if (customerInfo.error) throw customerInfo.error;
    dispatch(setFirstName(customerInfo.data[0].first_name));
    dispatch(setLastName(customerInfo.data[0].last_name));
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
      setOrderMethod('Dine-in');
      return merchantURLPath[1];
    } 

    merchantURLPath = window.location.pathname.replace(/\//g,'');
    dispatch(updateOrderMethod('Pickup'));
    setOrderMethod('Pickup');
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
      .select('id, name, url_path, sales_tax, street_address').match({
        url_path: merchantURLPath
      });

    // if (fetchMerchant.data.length === 0) navigate('/404');
    if (fetchMerchant.error) throw fetchMerchant.error;
   
    dispatch(setOrderTax(fetchMerchant.data[0].sales_tax));
    dispatch(setMerchantID(fetchMerchant.data[0].id));
    dispatch(setBrandName(fetchMerchant.data[0].name));
    dispatch(updateAddress(fetchMerchant.data[0].street_address));
    setMerchantName(fetchMerchant.data[0].name);
    setMerchantAddress(fetchMerchant.data[0].street_address);
   
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
    dispatch(updateBannerImageURL(bannerImage.data.publicUrl));
    if (bannerImage.error) throw bannerImage.error;
  };

  return (
    <Box 
      bg="#f6f6f6">
      <Flex direction="column">
        <Navbar title={merchantStore.brandName} showBackButton={false} showTabButton={true} />
        <VStack 
          py={'12'}
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
          >
            <Text color="#1e1e1e" fontSize="lg" fontWeight='semibold'>{orderMethod}</Text>
          </Flex>
        </VStack>
        {orderMethod === 'Dine-in' ? null : (
          orderMethod === 'Pickup' ? (
            <Flex 
              textAlign={'left'}
              id="selectTableNumberWrapper"
              justifyContent={'space-between'} 
              alignItems={'center'}
              py="4"
              borderBottomWidth="1px"
              px="6" 
            >
              {merchantAddress}
            </Flex>
          ) : null
        )}
        <Stack pb='115' px="6" bg="white">
         
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
      {cart.length > 0 ? <CheckoutButton handleCheckout={handleCheckout} /> : null}
    </Box>
  );
}
