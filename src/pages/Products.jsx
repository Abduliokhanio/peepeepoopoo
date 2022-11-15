import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { supabasePublic } from '../services/supabasePublic';
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
  const merchantStoreBrandName = useSelector(state => state.merchant.brandName);
  const merchantStoreCategoryID = useSelector(state => state.merchant.selectedCategoryID);
  const merchantStoreCategoryName = useSelector(state => state.merchant.selectedCategoryName);
  const [selectedCategory , setSelectedCategory] = useState(merchantStoreCategoryID);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uid = new ShortUniqueId({ length: 10 });
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
    // console.log(merchantStore.menuOptions);
    
    return (merchantStore.menuOptions.map((menu, index) =>  (
      <option key={index} value={menu.id}>{menu.name}</option>)
    ));
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      setProducts(currentProducts.concat(merchantStoreProducts.from({ length: 5 })));
    }, 1500);
  };

  const displayProducts = () => {
    // console.log('display products:', merchantStoreProducts);
    
    return(
      currentProducts.map((product, index) => (<ProductItem
        key={index}
        onClick={() => handleProductSelect(product)}
        title={product.name}
        desc={product.description}
        price={product.price}
        imageURL={product.image_url}
      />)));
  };

  const handleProductSelect = (product) => {   
    const cartItem = { id: uid(), item: product, quantity: 1, modifiers: null };  
    dispatch(setSelectedProduct(cartItem));
    navigate('/modifiers');
  };

  const handleCategorySelect = async (option) => {
    console.log('options.target.value:', option.target.value);
   
    // dispatch(setCategoryName(option.target.value));
    dispatch(setCategoryID(parseInt(option.target.value)));
    setSelectedCategory(parseInt(option.target.value));
    filterSelectedProducts(parseInt(option.target.value));
    console.log('selectedCategory:', selectedCategory);
  };

  return (
    <Box bg="#f6f6f6">
      <Flex direction="column">
        <Navbar title={merchantStoreBrandName} showBackButton={true} />
        <Box mt="16" py="4" pl="6">
          <Select bg="white" maxW="200" value={selectedCategory} onChange={(option) => handleCategorySelect(option)}>
            {currentProducts.length === 0 ? null : displayMenuSelections()}
          </Select>
        </Box>
        <Stack pb='115' px="6">
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
