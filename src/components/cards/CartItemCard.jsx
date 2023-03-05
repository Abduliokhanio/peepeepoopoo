import React from 'react';
import {
  Box, Text, Heading, Stack, Flex, Image, IconButton, VStack
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { removeFromCart } from '../../context/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { setSelectedProduct } from '../../context/slices/merchantSlice';

export default function CartItemCard({item}) {

  const cart = useSelector(state => state.cart.items);
  const itemInCart = cart.find(cartItem => cartItem.id === item.id);

  const uniqueModGroups = itemInCart?.modifiersGroup
    .filter((value, index, array) => array.findIndex(obj => obj.id === value.id) === index)
    .sort((a, b) => a.id - b.id);

  const filteredUniqItemInCart = itemInCart?.modifiers
    .filter((value, index, array) => array.indexOf(value) === index)
    .filter((item, index, array) => index === array.findIndex(obj => obj.id === item.id));

  const merchantURLPath = useSelector(state => state.merchant.urlPath);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemTotalCost = item.quantity * item.items?.price;

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item));
    if (cart.length === 1) navigate(`/${merchantURLPath}`);
  };

  const handleCartItemClick = () => {
    dispatch(setSelectedProduct(item));
    navigate('/modifiers');
  };

  return (
    <Box shadow="xs" bg="white" borderRadius='lg' borderColor="gray.50" overflow='hidden' borderWidth="0.5px">
      <Flex px="4" py='4' direction="row" justifyContent={'space-between'}>
        {item.image_url && (
          <Image h="150" maxW="200" objectFit="cover" src={itemInCart.image_url} alt="menu" />
        )}
  
        <Stack onClick={handleCartItemClick} w="100%" textAlign="left" spacing={'4'}>
          <Flex alignItems="center">
            <Box backgroundColor={'gray.50'} borderRadius="4" mr="4" px="3.5" py="1" maxH='35px' maxW="35px">
              <Text textAlign="left" fontSize="lg">{itemInCart.quantity}</Text>
            </Box>
            <VStack align="start">
              <Heading fontSize="1.25rem" mt="1">{itemInCart?.items?.name}</Heading>
              {uniqueModGroups?.map((modifierGroup) => (
                <React.Fragment key={modifierGroup.id}>
                  <Text as='u' fontSize='lg' color='blue'>
                    {modifierGroup.name}
                  </Text>
                  {filteredUniqItemInCart
                    ?.filter((n) => n.modifier_groups_id === modifierGroup.id)
                    .map((n) => (
                      <Text key={n.id} fontSize='sm' color='green'>
                        {'~ '}
                        {n.name}
                      </Text>
                    ))}
                </React.Fragment>
              ))}
            </VStack>
          </Flex>
          <Text textAlign="left" fontSize="lg">${itemTotalCost.toFixed(2)}</Text>
        </Stack>
  
        <Flex pr="4" alignItems={'center'}>
          <Box onClick={handleRemoveFromCart}>
            <IconButton aria-label='Search database' color="red.200" bg="red.50" icon={<SmallCloseIcon fontSize={'1.75em'} />} />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
