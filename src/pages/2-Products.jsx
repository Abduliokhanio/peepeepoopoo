import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductItem from '../components/ProductCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import CheckoutButton from '../components/CheckoutButton';
import ShortUniqueId from 'short-unique-id';
import {
  Stack, VStack, Select, Flex, Spacer, Box
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setSelectedProduct, setCategoryID, setCategoryName } from '../context/slices/merchantSlice';

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
      <option key={index} value={menu.id}>{menu.name}</option>)
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

  const handleCategorySelect = async (option) => {
    dispatch(setCategoryID(parseInt(option.target.value)));
    setSelectedCategory(parseInt(option.target.value));
    filterSelectedProducts(parseInt(option.target.value));
  };

  return (
    <Box bg="#f6f6f6" pb="300px">
      <Flex direction="column">
        <Navbar title={merchantStoreCategoryName} showBackButton={true}  showTabButton={true}/>
        <Box py="4" pl="2">
          <Select 
            borderColor={'gray.300'}
            maxW="200" 
            bg="white"
            value={selectedCategory} 
            onChange={(option) => handleCategorySelect(option)}>
            {currentProducts.length === 0 ? null : displayMenuSelections()}
          </Select>
        </Box>
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
