import React, { useState, useEffect} from 'react';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../context/Auth';
import Navbar from '../components/Navbar';
import ProductItem from '../components/ProductCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import CheckoutButton from '../components/CheckoutButton';
import {
  Stack, VStack, Select, useDisclosure, Flex, Spacer, Editable, IconButton, EditablePreview, EditableControls, Input, ButtonGroup, Box
} from '@chakra-ui/react';
import { CheckIcon, EditIcon } from '@chakra-ui/icons';

export default function ProductsPage() {
  const { selection } = useAuth();
  const [products, setProducts] = useState([]);
  const [menuOptions, setMenuOptions] = useState([]);

  useEffect(() => {
    fetchMenu();
    fetchProducts();
  }, [false]);

  const fetchMenu = async () => { 
    const fetchMenus = await supabase
      .from('categories')
      .select().match({merchant_id: localStorage.getItem('merchantID')});
      
    if (fetchMenus.error) {
      throw fetchMenus.error;
    } else {
      setMenuOptions(fetchMenus.data);
    }
  };

  const fetchProducts = async () => { 
    const fetchProducts = await supabase
      .from('products')
      .select().match(
        { category_id: localStorage.getItem('categoryID'),
          category_name: localStorage.getItem('categoryName')
        });

    console.log('categoryID', localStorage.getItem('categoryID'));
    console.log('categoryName',  localStorage.getItem('categoryName'));
    console.log(fetchProducts);

    setProducts(fetchProducts.data);

    if (fetchProducts.error) {
      throw fetchProducts.error;
    } else {
      setProducts(fetchProducts.data);
    }
  };

  const displayMenuSelections = () => {
    console.log(menuOptions);
    return (menuOptions.map((menu, index) => (
      <option key={index} value={menu.name}>{menu.name}</option>
    )));
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      setProducts(products.concat(products.from({ length: 5 })));
    }, 1500);
  };

  const displayProducts = () => {
    console.log(products);
    
    return(
      products.map((product, index) => (<ProductItem
        key={index}
        onClick={null}
        title={product.name}
        desc={product.description}
      />)));
  };

  return (
    <Box>
      <Flex direction="column">
        <Navbar title={localStorage.getItem('merchantName')} showBackButton={true} brandColor={localStorage.getItem('brandColor')} />
        <Box py="4" pl="6">
          <Select maxW="200" placeholder="Menus">
            {menuOptions.length === 0 ? null : displayMenuSelections()}
          </Select>
        </Box>
        <Stack pb='115' px="6" bg="#F9FBFC">
          <InfiniteScroll
            dataLength={products.length} 
            next={fetchMoreData}
          >
            <VStack
              spacing='6'
              align="stretch"
            >
              {products.length === 0 ? null : displayProducts()}
            </VStack>
          </InfiniteScroll>;
        </Stack>
        <Spacer />
      </Flex>
      <CheckoutButton brandColor={localStorage.getItem('brandColor')} />
    </Box>
  );
}
