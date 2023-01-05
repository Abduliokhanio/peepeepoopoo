import React, { useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import ProductItem from '../components/cards/ProductCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import CheckoutButton from '../components/buttons/CheckoutButton';
import {
  Stack, VStack, Text, Flex, Spacer, Box, Tag, HStack, TagLabel
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setCategoryID } from '../context/slices/merchantSlice';

export default function ProductsPage() {
  const cart = useSelector(state => state.cart.items);
  const merchantStore = useSelector(state => state.merchant);
  const merchantStoreProducts = useSelector(state => state.merchant.products);
  const merchantStoreCategoryID = useSelector(state => state.merchant.selectedCategoryID);
  const merchantStoreCategoryName = useSelector(state => state.merchant.selectedCategoryName);
  const [selectedCategory , setSelectedCategory] = useState(merchantStoreCategoryID);
  const dispatch = useDispatch();
  const [currentProducts, setCurrentProducts] = useState([]);

  useEffect(() => {
    filterProducts();
  }, []);

  const filterProducts = async () => { 
    if (merchantStoreProducts.length === 0) return;
    const filteredProducts =  merchantStoreProducts.filter((product) => {
      return product.category_id === merchantStoreCategoryID ;
    });
    setCurrentProducts(filteredProducts);
  };

  const filterSelectedProducts = async (categoryID) => { 
    if (merchantStoreProducts.length === 0) return;
    const filteredProducts =  merchantStoreProducts.filter((product) => {
      return product.category_id === categoryID;
    });
    setCurrentProducts(filteredProducts);
  };

  const displayMenuSelections = () => {
    return (merchantStore.menuOptions.map((menu, index) =>  (
      <Tag
        size={'lg'}
        key={index}
        onClick={() => handleCategorySelect(menu)}
        value={menu.id}
        borderRadius='full'
        variant='outline'
        bg={selectedCategory === parseInt(menu.id) ? 'black' : 'white'}
        color={selectedCategory === parseInt(menu.id) ? 'white' : 'black'}
        py={3}
        px={4}
        display={'inline-block'}
      >
        <Text fontWeight="bold" w="100%" letterSpacing={'0.5px'}>{menu.name}</Text>
      </Tag>
    )
    ));
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      setProducts(currentProducts.concat(merchantStoreProducts.from({
        length: 5 
      })));
    }, 1500);
  };

  const displayProducts = () => {
    return(
      currentProducts.map((product, index) => (<ProductItem
        key={index}
        product={product}
        title={product.name}
        desc={product.description}
        price={product.price}
        imageURL={product.image_url}
      />)));
  };

  const handleCategorySelect = async (menu) => {
    dispatch(setCategoryID(parseInt(menu.id)));
    setSelectedCategory(parseInt(menu.id));
    filterSelectedProducts(parseInt(menu.id));
  };

  return (
    <Box pb="300px">
      <Flex direction="column">
        <Navbar title={merchantStoreCategoryName} showBackButton={true}  showTabButton={true}/>
        <HStack 
          id="menu-slider"
          w="100%"
          overflowY={'scroll'}
          pt="5"
          pb="7" 
          pl="2"
          display={'block'}
          whiteSpace={'nowrap'}
        >
          {currentProducts.length === 0 ? null : displayMenuSelections()}

        </HStack>
        <Stack pb='115' px="2">
          <InfiniteScroll
            dataLength={currentProducts.length === 0 ? 0 : merchantStoreProducts.length} 
            next={fetchMoreData}
          >
            <VStack
              spacing='6'
              align="stretch"
            >
              {currentProducts.length === 0 ? null : displayProducts()}
            </VStack>
          </InfiniteScroll>;
        </Stack>
        <Spacer />
      </Flex>
      {cart ? <CheckoutButton /> : null}
    </Box>
  );
}
