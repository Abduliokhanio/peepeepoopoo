/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  VStack, Box, useToast, Button, StackDivider, useDisclosure, Flex, Text, Spacer,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import CartItemCard from '../components/CartItemCard';
import { setSelectedProduct } from '../context/slices/merchantSlice';

export default function CheckoutPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cart = useSelector(state => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [totalCost, setTotalCost] = useState(cart.reduce((acc, item) => acc + (parseInt(item.item.price) * item.quantity), 0));
  const [totalSubCost, setTotalSubCost] = useState(totalCost*(0.0825));

  useEffect(() => {
    setTotalCost(cart.reduce((acc, item) => acc + (parseInt(item.item.price) * item.quantity), 0));
  }, [false]);

  const handleCheckout = async () => {
    setLoading(true);
    navigate('/tips');
    setLoading(false);
  };

  const handleEditCartItem = (item) => {
    dispatch(setSelectedProduct(item));
    navigate('/modifiers');
  };

  return (
    <Box bg="#f6f6f6">
      <Navbar title="Checkout" showBackButton={true} />
      <VStack
        pt="32"
        spacing={4}
        align="stretch"
        px="6"
        mb="8"
      >
        {cart.map((item, index) => {
          return(
            <CartItemCard
              key={index}
              onClick={(item) => handleEditCartItem(item)}
              item={item}
              index={index}
              setTotalCost={setTotalCost}
              cart={cart}
            />);
         
        } )}
      </VStack>
      <VStack
        spacing={4}
        align="stretch"
        px="6">
        <Flex>
          <Text>Subtotal</Text>
          <Spacer />
          <Text>${totalCost.toFixed(2)}</Text>
        </Flex>
        <Flex>
          <Text>Tax</Text>
          <Spacer />
          <Flex alignItems='center'>
            <Text mr="2" fontSize={'12'} color='gray.700'>(8.25%)</Text>
            <Text pr="1">${totalSubCost.toFixed(2)}</Text>
          </Flex>
        </Flex>
        <StackDivider borderColor="gray.200" />
        <Flex pb="4">
          <Text fontSize={'2rems'} fontWeight={'bold'}>Total</Text>
          <Spacer />
          <Text fontSize={'2rems'} fontWeight={'bold'}>${(totalCost+totalSubCost).toFixed(2)}</Text>
        </Flex>
        <Button onClick={handleCheckout} isLoading={loading} width="100%" bg="black" size="lg" color="white">Continue</Button>
      </VStack>
      {/* <Stack>
          <Heading size="sm">Payment</Heading>
          <PaymentTypes />
        </Stack> */}

    </Box>
  );
}
