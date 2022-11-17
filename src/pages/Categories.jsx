import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabasePublic } from '../services/supabasePublic';
import Navbar from '../components/Navbar';
import MenuCard from '../components/MenuCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import CheckoutButton from '../components/CheckoutButton';
import {
  Stack, VStack, useEditableControls, Text, EditableInput, Flex, Spacer, Editable, IconButton, EditablePreview, EditableControls, Input, ButtonGroup, Box
} from '@chakra-ui/react';
import { CheckIcon, EditIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setMerchantID, setProducts, setURLPath, setBrandName, setMenuOptions, setCategoryName, setCategoryID, setTableNumber } from '../context/slices/merchantSlice';
import { setOrderType } from '../context/slices/cartSlice';

export default function CategoriesPage() {
  const cart = useSelector(state => state.cart.items);
  const merchantStore = useSelector(state => state.merchant);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [tableQRNumber, setTableQRNumber] = useState(null);
  const [merchantURL, setMerchantURL] = useState(null);
  const [bannerImageURL, setBannerImageURL] = useState(null);

  useEffect(() => {
    initPage();
  }, []);

  const initPage = async () => {
    const merchantURLPath = await checkURLPath();
    const merchantID = await fetchMerchantInfo(merchantURLPath);
    await fetchMenu(merchantID);
    await fetchProducts(merchantID);
    
  };

  const checkURLPath = async () => {
    let merchantURLPath;
    let tableNumber;
    const host = window.location.host;

    if (window.location.pathname.includes('table')) {
      tableNumber = window.location.pathname.match(/table\/(.*)/);
      setCurrentTableNumber(tableNumber[1]);
      dispatch(setOrderType('dineIn'));
      if (host.includes('orderahead.io')) {
        merchantURLPath = window.location.href.match(/orderahead.io\/(.*)\/table/);
        setMerchantURL(merchantURLPath[1]);
      } else if (host === 'localhost:3000') {
        merchantURLPath = window.location.href.match(/localhost:3000\/(.*)\/table/);
        setMerchantURL(merchantURLPath[1]);
      }
      
      return merchantURLPath[1];
    } 

    merchantURLPath = window.location.pathname.replace(/\//g,'');
    dispatch(setOrderType('Pickup'));
    setMerchantURL(merchantURLPath);
    return merchantURLPath;
  };

  const setCurrentTableNumber = async (tableNumber) => {
    dispatch(setTableNumber(tableNumber));
    setTableQRNumber(tableNumber);
  };

  const fetchMerchantInfo = async (merchantURLPath) => {
    dispatch(setURLPath(merchantURLPath));
    await fetchBannerImage(merchantURLPath);

    const fetchMerchant = await supabasePublic
      .from('merchants')
      .select('id, name, url_path').match({url_path: merchantURLPath});

    // if (fetchMerchant.data.length === 0) navigate('/404');
    if (fetchMerchant.data.length === 0 ) throw fetchMerchant.error;

    dispatch(setMerchantID(fetchMerchant.data[0].id));
    dispatch(setBrandName(fetchMerchant.data[0].name));
   
    return fetchMerchant.data[0].id;
  };

  const fetchMenu = async (merchantID) => { 
    setLoadingMenu(true);

    const fetchMenus = await supabasePublic
      .from('categories')
      .select().match({merchant_id: merchantID});

    if (fetchMenus.data.length === 0 ) throw fetchMenu.error;
    dispatch(setMenuOptions(fetchMenus.data));
    setLoadingMenu(false);
  };

  const fetchProducts = async (merchantID) => { 
    const fetchProducts = await supabasePublic
      .from('products')
      .select().match({ merchant_id: merchantID });
    // console.log('fetchProducts:', fetchProducts);
    if (fetchProducts.data.length === 0 ) throw fetchProducts.error;
    // console.log('fetchProducts.data:', fetchProducts.data);
    dispatch(setProducts(fetchProducts.data));
  };

  /////////////////////////////

  const handleMenuSelect = (menuId, menuName) => { 
    dispatch(setCategoryName(menuName));
    dispatch(setCategoryID(menuId));
    // console.log('merchantStore:', merchantStore.products);
    navigate('/products');
  };

  const displayMenus = () => {
    return(
      merchantStore.menuOptions.map((menu, index) => (<MenuCard
        key={index}
        onClick={() => handleMenuSelect(menu.id, menu.name)}
        title={menu.name}
        desc={menu.description}
      />)));
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      setMenuOptions(merchantStore.menuOptions.concat(merchantStore.menuOptions.from({ length: 5 })));
    }, 1500);
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

  const fetchBannerImage = async (merchantURLPath) => {
    const bannerImage = await supabasePublic.storage
      .from('merchants')
      .getPublicUrl(merchantURLPath + '/banner');
      
    if (bannerImage.data.publicUrl.length > 1) setBannerImageURL(bannerImage.data.publicUrl);
    if (bannerImage.error) throw bannerImage.error;
  };

  return (
    <Box bg="#f6f6f6">
      <Flex direction="column">
        <Navbar title={merchantStore.brandName} showBackButton={false} showAccountButton={true} />
        <VStack mt="16" py="16" backgroundImage={bannerImageURL} backgroundSize="cover" backgroundPosition="center" mb="8">
          {tableQRNumber === null ? (
            <Flex bg="white" px="5" py="3" borderWidth="1px" borderColor="gray.300" justifyContent="space-around" borderRadius="100px" direction="row" alignItems='center'>
              <Text fontSize="mg" fontWeight='semibold'>Pickup</Text>
              
            </Flex>
          ) : (
            <Editable
              textAlign='center'
              fontSize='md'
              value={tableQRNumber}
              onChange={(value) => setCurrentTableNumber(value)}
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
          )}

        </VStack>
        <Stack pb='115' px="6" bg="#F9FBFC">
          {tableQRNumber === null ? (
            <Text mb="2" fontWeight="semibold" textAlign="left" w='100%'>Prep time is currently 15 minutes</Text>
          ) : (
            <Text mb="2" fontWeight="semibold" textAlign="left" w='100%'>Order to your table</Text>
          )}
          
          <InfiniteScroll
            dataLength={merchantStore.menuOptions === null || merchantStore.menuOptions === undefined ? 0 : merchantStore.menuOptions.length} 
            next={fetchMoreData}
          >
            <VStack
              spacing='6'
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
