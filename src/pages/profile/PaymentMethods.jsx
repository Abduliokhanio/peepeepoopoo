/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/Auth';
import { supabasePrivate } from '../../services/supabasePrivate';
import {
  Stack, HStack, useToast, Text, Box, VStack, Input, Button, Flex, Heading, FormHelperText
} from '@chakra-ui/react';
import { Icon, ChevronRightIcon } from '@chakra-ui/icons';
import { MdOutlineReceiptLong, MdOutlineAccountCircle, MdPayment } from 'react-icons/md';
import { useSelector } from 'react-redux';
import AppleGooglePay from '../../tools/collectjs';

export default function PaymentMethods() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const CollectJS = new AppleGooglePay();

  const [loading, setLoading] = useState(false);
  const OrderType = useSelector((state) => state.cart.orderType);

  useEffect(() => {
    CollectJS.start();
    setPreviousRecord();
  }, []);

  const prefillFields = (savedData) => {
    // if (savedData.first_name !== null) setFirstName(savedData.first_name);
  };

  const setPreviousRecord = async (e) => {

    const querySavedData = await supabasePrivate
      .from('customers')
      .select('*')
      .eq('id', user.id);

    if (querySavedData.error) throw querySavedData.error;
    if (querySavedData.data.length > 0) prefillFields(querySavedData.data[0]);
  };

  return (
    <Stack backgroundColor="#F9FBFC;" direction="column" minH="100vh" h="100%">
      <Navbar title={OrderType} showBackButton={true} />
      
      <Box>
        <Heading size="lg" textAlign={'left'} px="6" mt="6">Saved Payment Methods</Heading>
        <Flex 
          direction={'column'}
          px="6" 
          py="10" 
          w="100%">
          <VStack w="100%" spacing={6} alignItems={'left'}>
            <HStack spacing="4">
              <Icon h="6" w="6" as={MdPayment} />
              <Text fontSize="xl">•••• 3829</Text>
            </HStack>
            <div id="googlePayButton"></div>
            <div id="applePayButton"></div>
          </VStack>
        </Flex>
      </Box>
      <Box px="6">
        <Heading size="lg" textAlign={'left'} mt="6">Add  Payment Methods</Heading>
        <Flex onClick={() => navigate('/user/new-card')} 
          py="6" 
          justifyContent="space-between">
          <HStack spacing="4">
            <Icon h="6" w="6" as={MdPayment} />
            <Text fontSize="xl">Credit/Debit Card</Text>
          </HStack>
          <ChevronRightIcon />
        </Flex>
      </Box>
    </Stack>
  );
}
 
