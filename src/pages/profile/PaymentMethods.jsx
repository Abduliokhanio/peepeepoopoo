/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/Auth';
import { supabasePrivate } from '../../services/supabasePrivate';
import {
  Stack, HStack, Text, Box, VStack, Button, Flex, Heading, FormHelperText
} from '@chakra-ui/react';
import { Icon, ChevronRightIcon } from '@chakra-ui/icons';
import { MdPayment } from 'react-icons/md';
import { FaApplePay } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import AppleGooglePay from '../../tools/collectjs';

function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
}

export default function PaymentMethods() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const CollectJS = new AppleGooglePay();

  const [loading, setLoading] = useState(false);
  const [isIOS, setIsIOS] = useState(iOS());
  const [lastFour, setLastFour] = useState('');
  const OrderType = useSelector((state) => state.cart.orderType);

  useEffect(() => {
    CollectJS.start();
    setPreviousRecord();
  }, []);

  const prefillFields = (savedData) => {
    if (savedData.card_number !== null) setLastFour(savedData.card_number.toString().slice(-4));
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
      {lastFour.length > 0 ? (
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
                <Text fontSize="xl">•••• {lastFour}</Text>
              </HStack>
              {isIOS ? (
                <HStack spacing="4">
                  <Icon h="6" w="6" as={FaApplePay} />
                  <Text fontSize="xl">Apple Pay</Text>
                </HStack>
              ) : (<HStack spacing="4">
                <Icon h="6" w="6" as={FcGoogle} />
                <Text fontSize="xl">Google Pay</Text>
              </HStack>)}
            </VStack>
          </Flex>
        </Box>
      ) : null }
    
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
 
