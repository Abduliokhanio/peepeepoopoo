import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShortUniqueId from 'short-unique-id';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../context/Auth';
import {
  Box, Text, Heading, Stack, Flex, Image, IconButton, Icon
} from '@chakra-ui/react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { setSelectedProduct } from '../context/slices/merchantSlice';
import { supabasePrivate } from '../services/supabasePrivate';

export default function ProductItem({product, title, desc, price, qty, page, imageURL, ...rest}) 
{ 
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uid = new ShortUniqueId({
    length: 10 
  });
  const merchantID = useSelector(state => state.merchant.merchantID);

  const [isFavorite, setIsFavorite] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    isFavorited();
  }, []);

  useEffect(() => {
    if (firstLoad === false) handleFavorite();
  }, [isFavorite]);

  if (user === null) navigate('/auth/signup');

  const isFavorited = () => {
    supabasePrivate.from('customers_favorites').select('*').eq('product_id', product.id).then(({ data, error }) => {
      if (error) throw error;
      if (data.length > 0) setIsFavorite(true); 
      setFirstLoad(false);
    });
  };

  const handleFavorite = () => {
    if (isFavorite === true && firstLoad === false) {
      supabasePrivate.from('customers_favorites').select('*').eq('product_id', product.id).then(({ data, error }) => {
        if (error) throw error;
        if (data.length === 0) {
          supabasePrivate.from('customers_favorites').insert([
            {
              product_id: product.id, 
              merchant_id: merchantID,
              customer_id: user.id
            }
          ]).then(({ error }) => {
            if (error) throw error;
          });   
        }
      });
      
    } else {
      supabasePrivate.from('customers_favorites').delete().eq('product_id', product.id).then(({ error }) => {
        if (error) throw error;
      });
    }
  };

  const handleElementClick = (e) => {
    if (e === 'favoriteButtonOutline' || e === 'favoriteButtonFilled') {
      setIsFavorite(!isFavorite);
    }
    if (e === 'productSelect') handleProductSelect(product);
  };

  const handleProductSelect = (product) => {   
    const cartItem = {
      id: uid(), item: product, quantity: 1, modifiers: null 
    };  
    dispatch(setSelectedProduct(cartItem));
    navigate('/modifiers');
  };

  return (
    <Box
      shadow="xs" 
      backgroundColor={'white'}
      borderRadius='lg' 
      overflow='hidden' 
      borderWidth="0.5px" {...rest}>
      <Flex direction="column">
        {imageURL !== null ? (
          <Image 
            id='productImg'
            onClick={() => handleElementClick('productSelect')}
            maxH="125px" 
            objectFit="cover"
            src={imageURL} 
            alt="menu" />
        ) : null}
        <Flex 
          mx="4" 
          mt="3"
          mb="1"
          direction='column' 
          justifyContent="space-around">
          <Stack 
            id="productInfo"
            w="100%" 
            textAlign="left">
            <Heading 
              onClick={() => handleElementClick('productSelect')}
              fontSize="xl">{title}</Heading>
            <Text 
              onClick={() => handleElementClick('productSelect')}
              fontSize="sm">{desc}</Text>
          </Stack>
          <Flex 
            id="productPriceAndFavorite"
            direction={'row'} 
            alignItems={'center'} 
            justifyContent="space-between">
            <Text 
              id='productPrice'
              onClick={() => handleElementClick('productSelect')}
              textAlign="left" 
              w="100%"
              fontSize="lg">${price.toFixed(2)}</Text>
            {isFavorite ? (
              <IconButton
                _focus={{
                  bg: 'transparent' 
                }}
                onClick={() => handleElementClick('favoriteButtonFilled')}
                bg="transparent"
                icon={
                  <Icon 
                    color='red.500' 
                    h="5"
                    w="5" 
                    as={BsHeartFill} /> } />
  
            ) : (
              <IconButton
                _focus={{
                  bg: 'transparent' 
                }}
                onClick={() => handleElementClick('favoriteButtonOutline')}
                bg="transparent"
                pb="0"
                icon={
                  <Icon 
                    color='gray.500'
                    h="5"
                    w="5" 
                    as={BsHeart} /> } />
            )}  
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
    