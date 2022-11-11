import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { supabasePublic } from '../services/supabasePublic';
import Navbar from '../components/Navbar';
import ProductItem from '../components/ProductCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import CheckoutButton from '../components/CheckoutButton';
import {
  Stack, VStack, Select, Flex, Spacer, Box
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setSelectedProduct } from '../context/slices/merchantSlice';

export default function ProductsPage() {
  const merchantStore = useSelector(state => state.merchant);
  const merchantStoreProducts = useSelector(state => state.merchant.products);
  const merchantStoreBrandName = useSelector(state => state.merchant.brandName);
  const merchantStoreCategoryID = useSelector(state => state.merchant.selectedCategoryID);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentProducts, setCurrentProducts] = useState([]);

  useEffect(() => {
    filterProducts();
  }, [false]);

  const filterProducts = async () => { 
    if (merchantStoreProducts.length === 0) return;
    const filteredProducts =  merchantStoreProducts.filter((product) => {
      return product.category_id === merchantStoreCategoryID;
    });
    setCurrentProducts(filteredProducts);
    console.log('filterProducts:', filteredProducts);
  };

  const displayMenuSelections = () => {
    console.log(merchantStore.menuOptions);
    return (merchantStore.menuOptions.map((menu, index) => (
      <option key={index} value={menu.name}>{menu.name}</option>
    )));
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      setProducts(currentProducts.concat(merchantStoreProducts.from({ length: 5 })));
    }, 1500);
  };

  const displayProducts = () => {
    console.log('display products:', merchantStoreProducts);
    
    return(
      currentProducts.map((product, index) => (<ProductItem
        key={index}
        onClick={() => handleProductSelect(product)}
        title={product.name}
        desc={product.description}
        price={product.price}
      />)));
  };

  const handleProductSelect = (product) => {     
    dispatch(setSelectedProduct(product));
    navigate('/modifiers');
  };

  return (
    <Box>
      <Flex direction="column">
        <Navbar title={merchantStoreBrandName} showBackButton={true} />
        <Box py="4" pl="6">
          <Select maxW="200" placeholder="Menus">
            {currentProducts.length === 0 ? null : displayMenuSelections()}
          </Select>
        </Box>
        <Stack pb='115' px="6" bg="#F9FBFC">
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
      <CheckoutButton />
    </Box>
  );
}
