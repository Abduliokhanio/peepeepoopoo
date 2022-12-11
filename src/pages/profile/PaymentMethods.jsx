/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import SelectPaymentMethods from '../../components/SelectPaymentMethods';
import AddPaymentMethod from '../../components/AddPaymentMethod';
import Navbar from '../../components/Navbar';
import {
  Stack, Box
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export default function PaymentMethods() {
  const OrderType = useSelector((state) => state.cart.orderType);
  return (
    <Stack backgroundColor="#F9FBFC;" direction="column" minH="100vh" h="100%">
      <Navbar title={OrderType} showBackButton={true} />
      <Box pt='8'>
        {SelectPaymentMethods()}
        {AddPaymentMethod()}
      </Box>
    </Stack>
  );
}
 
