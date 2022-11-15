import React, { useEffect } from 'react';
import {
  Box, Text, Heading, Stack, Flex, Image
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteIcon } from '@chakra-ui/icons';
import { removeFromCart } from '../context/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { setSelectedProduct } from '../context/slices/merchantSlice';

export default function CartItemCard({
  item
}) {

  useEffect(() => {
    console.log('item: ', item);
  }, [false]);

  const cart = useSelector(state => state.cart.items);
  const itemInCart = cart.find(cartItem => cartItem.id === item.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemTotalCost = item.quantity * parseInt(item.item.price);

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item));
    if (cart.length === 1) navigate(-1);
  };

  const handleCartItemClick = () => {
    dispatch(setSelectedProduct(item));
    navigate('/modifiers');
  };

  return (
    <Box shadow="xs" bg="white" borderRadius='lg' overflow='hidden' borderWidth="0.5px">
      <Flex px="4" py='4' direction="row" justifyContent={'space-between'}>
        {!item.image_url ? null : (
          <Image h="150" maxW="200" objectFit="cover" src={itemInCart.image_url} alt="menu" />
        )}

        <Stack onClick={handleCartItemClick} w="100%" textAlign="left" spacing={'4'}>
          <Flex>
            <Box backgroundColor={'gray.100'} borderRadius="2" mr="4" px="3" py="1">
              <Text textAlign="left" fontSize="lg">{itemInCart.quantity}</Text>
            </Box>
            <Heading fontSize="1.5rem">{itemInCart.item.name}</Heading>
          </Flex>
          <Text w="100%" textAlign="left" fontSize="lg">${itemTotalCost}</Text>
        </Stack>

        <Flex pr="4" alignItems={'center'}>
          <Box onClick={handleRemoveFromCart}>
            <DeleteIcon />
          </Box>
        </Flex>

      </Flex>
      
    </Box>
  );
}
