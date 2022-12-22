import React, { useState, useEffect } from 'react';
import checkIOS from '../tools/isIOS';
import { supabasePrivate } from '../services/supabasePrivate';
import { useAuth } from '../context/Auth';
import { Box, Heading, Flex, VStack, HStack, Text, Icon } from '@chakra-ui/react';
import { MdPayment } from 'react-icons/md';
import { FaCcApplePay } from 'react-icons/fa';

export default function SelectPaymentMethods({ heading, updatePaymentChoice }) {
  const { user } = useAuth();
  const isIOS = checkIOS();
  const [paymentChoice, setPaymentChoice] = useState(null);
  const [lastFour, setLastFour] = useState('');

  useEffect(() => {
    if (isIOS === false) setPaymentChoice('cardPay');
    setPreviousRecord();
  }, []);

  const prefillFields = (savedData) => {
    if (savedData.card_number !== null) setLastFour(savedData.card_number.toString().slice(-4));
    if (savedData.payment_choice !== null) setPaymentChoice(savedData.payment_choice);
  };

  const setPreviousRecord = async (e) => {

    const querySavedData = await supabasePrivate
      .from('customers')
      .select('*')
      .eq('id', user.id);

    if (querySavedData.error) throw querySavedData.error;
    if (querySavedData.data.length > 0) prefillFields(querySavedData.data[0]);
  };

  const handlePaymentChoice = async (selection) => {
    const paymentChoiceRes = await supabasePrivate.from('customers').update({
      'payment_choice': selection
    }).eq('id', user.id);
    if (paymentChoiceRes.error) throw paymentChoiceRes.error;
    setPaymentChoice(selection);
    updatePaymentChoice(selection);
  };

  return(
    <Box>
      {lastFour.length > 0 ? (
        <Box>
          {heading ? (
            <Heading size="md" textAlign={'left'} px="6" mb="5">{heading}</Heading>
          ) : null}
          <Flex 
            direction={'column'}
            px="6" 
            mb="2"
            w="100%">
            <VStack w="100%" spacing={3} alignItems={'left'}>
              {isIOS ? (
                <HStack 
                  spacing="4" 
                  p="4"
                  onClick={() => handlePaymentChoice('Apple Pay')}
                  border={paymentChoice === 'Apple Pay' ? '1.5px solid #30a46c' : null}
                  borderRadius="sm">
                  <Icon h="8" w="8" as={FaCcApplePay} />
                  <Text fontSize="xl">Apple Pay</Text>
                </HStack>
              ) : null}
              <HStack 
                spacing="4" 
                p="4" 
                border={paymentChoice === 'Google Pay' ? '1.5px solid #30a46c' : null}
                onClick={() => handlePaymentChoice('Google Pay')}
                borderRadius="md">
                <Icon h="8" w="8" as={MdPayment} />
                <Text fontSize="xl">Google Pay</Text>
              </HStack>
              {lastFour.length > 0 ? (
                <HStack 
                  spacing="4" 
                  p="4" 
                  border={paymentChoice === 'cardPay' ? '1.5px solid #30a46c' : null}
                  onClick={() => handlePaymentChoice('cardPay')}
                  borderRadius="md">
                  <Icon h="8" w="8" as={MdPayment} />
                  <Text fontSize="xl">•••• {lastFour}</Text>
                </HStack>
              ) : null}
            </VStack>
          </Flex>
        </Box>
      ) : null }
    </Box>
  );
  
}