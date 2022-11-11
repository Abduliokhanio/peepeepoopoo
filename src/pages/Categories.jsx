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
import { setMerchantID, setProducts, setURLPath, setBrandName, setMenuOptions, setCategoryName, setCategoryID, setQRCodeTableNumber } from '../context/slices/merchantSlice';

export default function CategoriesPage() {
  // const cart = useSelector(state => state.cart);
  const merchantStore = useSelector(state => state.merchant);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingMenu, setLoadingMenu] = useState(false);

  useEffect(() => {
    initPage();
  }, [merchantStore.merchantID]);

  const initPage = async () => {
    const merchantURLPath = await checkURLPath();
    const merchantID = await fetchMerchantInfo(merchantURLPath);
    await fetchMenu(merchantID);
    await fetchProducts(merchantID);
  };

  const checkURLPath = async () => {
    let merchantURLPath;
    const URLPath = window.location.pathname;
    const merchantTableURLPath = URLPath.match(/menu\/(.*)\/table/);
    const QRCodeTableNumber = URLPath.match(/table\/(.*)/);
    merchantURLPath = URLPath.match(/menu\/(.*)/);
    if (merchantTableURLPath !== null) merchantURLPath = merchantTableURLPath[1];
    if (QRCodeTableNumber !== null) dispatch(setQRCodeTableNumber(QRCodeTableNumber[1]));
    if (merchantTableURLPath === null && QRCodeTableNumber === null) {
      merchantURLPath = merchantURLPath[1];
    }
    return merchantURLPath;
  };

  const fetchMerchantInfo = async (merchantURLPath) => {
    dispatch(setURLPath(merchantURLPath));
    const fetchMerchant = await supabasePublic
      .from('merchants')
      .select('id, name, url_path, brand_primary_color').match({url_path: merchantURLPath});

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
    console.log('fetchProducts:', fetchProducts);
    if (fetchProducts.data.length === 0 ) throw fetchProducts.error;
    console.log('fetchProducts.data:', fetchProducts.data);
    dispatch(setProducts(fetchProducts.data));
  };

  /////////////////////////////

  const handleMenuSelect = (menuId, menuName) => { 
    dispatch(setCategoryName(menuName));
    dispatch(setCategoryID(menuId));
    console.log('merchantStore:', merchantStore.products);
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

  const bannerImage = 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=100';

  return (
    <Box>
      <Flex direction="column">
        <Navbar title={merchantStore.brandName} showBackButton={false} showAccountButton={true} />
        <VStack mt="16" py="16" backgroundImage={bannerImage} backgroundSize="cover" backgroundPosition="center" mb="8">
          {merchantStore.QRCodeTableNumber === null ? null : (
            <Editable
              textAlign='center'
              fontSize='md'
              value={merchantStore.QRCodeTableNumber}
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
          )}
        </VStack>
        <Stack pb='115' px="6" bg="#F9FBFC">
          <Text mb="2" fontWeight="semibold" textAlign="left" w='100%'>Order to your table</Text>
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
      <CheckoutButton handleCheckout={handleCheckout} />
    </Box>
  );
}
