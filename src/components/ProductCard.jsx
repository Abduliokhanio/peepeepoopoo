import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShortUniqueId from 'short-unique-id';
import { useDispatch } from 'react-redux';
import {
  Box, Text, Heading, Stack, Flex, Image, IconButton, Icon
} from '@chakra-ui/react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { setSelectedProduct } from '../context/slices/merchantSlice';

export default function ProductItem({product, title, desc, price, qty, page, imageURL, ...rest}) 
{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uid = new ShortUniqueId({
    length: 10 
  });
  const [isFavorite, setIsFavorite] = useState(false);

  const handleElementClick = (e) => {
    console.log(e);
    if (e === 'favoriteButtonOutline' || e === 'favoriteButtonFilled') {
      setIsFavorite(!isFavorite);
      console.log('like button clicked');
    }
    if (e === 'productTitle' || e === 'productDesc' || e === 'productPrice') handleProductSelect(product);
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
      <Flex h="125" direction="row">
        {imageURL !== null ? (
          <Image 
            id='productImg'
            h="100%" 
            maxW="125" 
            objectFit="cover"
            src={imageURL} 
            alt="menu" />
        ) : null}
        <Flex 
          mx="4" 
          my="1"
          direction='column' 
          w="100%" 
          justifyContent="space-around">
          <Stack w="100%" textAlign="left">
            <Heading 
              onClick={() => handleElementClick('productTitle')}
              fontSize="xl">{title}</Heading>
            <Text 
              onClick={() => handleElementClick('productDesc')}
              fontSize="sm">{desc}</Text>
          </Stack>
          <Flex direction={'row'} alignItems={'center'} justifyContent="space-between">
            <Text 
              onClick={() => handleElementClick('productPrice')}
              w="100%" 
              textAlign="left" 
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
    