/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import { supabasePrivate } from '../../services/supabasePrivate';
import Navbar from '../../components/Navbar';
import {
  PinInput, PinInputField, Flex, HStack, FormControl, Box, Heading, FormHelperText, Input, VStack, Text, Button, InputGroup, InputLeftAddon, InputLeftElement,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { setFirstName, setLastName } from '../../context/slices/customerSlice';

export default function Verify() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const customerNumber = useSelector((state) => state.customer.mobileNumber);
  const merchantURL = useSelector((state) => state.merchant.urlPath);
  const [isCodeError, setIsCodeError] = useState(false);
  const [codeMessage, setCodeMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // supabasePrivate.auth.onAuthStateChange((event) => {
  //   if (event == 'SIGNED_IN') isNewCustomer();
  // });

  const handleVerify = async (code) => { 
    setLoading(true);
    let { error } = await supabasePrivate.auth.verifyOtp({
      phone: '+1' + customerNumber,
      token: code,
      type: 'sms'
    });

    if (error) {
      setIsCodeError(true);
      setCodeMessage(error.message);
      setLoading(false);
      throw error;
    }
    isNewCustomer();
  };

  // const fetchCustomerData = async () => {
  //   const { data, error } = await supabasePrivate
  //     .from('customers')
  //     .select('first_name, last_name').match({
  //       id: user.id 
  //     });
  //   if (error) throw error;

  //   dispatch(setFirstName(data[0].first_name));
  //   dispatch(setLastName(data[0].last_name));
  // };

  const isNewCustomer = async () => {
    const { data, error } = await supabasePrivate
      .from('customers')
      .select('*').eq('id', user.id);

    console.log('error add: ', error);

    if (error) {
      addNewCustomer(); 
      return;
    }
    dispatch(setFirstName(data[0].first_namee));
    dispatch(setLastName(data[0].last_name));
    navigate(`/${merchantURL}`);
  };

  const addNewCustomer = async () => {
    const { error } = await supabasePrivate
      .from('customers')
      .insert({
        id: user.id
      });

    if (error) throw error;
    navigate(`/${merchantURL}`);
  };

  const handleResend = async (e) => {
    await supabasePrivate.auth.signInWithOtp({
      phone: '+1' + customerNumber
    });
  };

  return (
    <Box>
      <Navbar title="Create account" showBackButton={true} />
      <VStack
        pt="20"
        spacing={4}
        align="stretch"
        px="6"
      >
        <VStack px="6" h="20" mb="6" alignItems="center">
          <Heading size="lg">
            Verifying +1{customerNumber}
          </Heading>
          <Text textAlign="center">Enter the code sent to your phone</Text>
        </VStack>
        <FormControl isInvalid={isCodeError}>
          <HStack justifyContent="center" w="100%" >
            <PinInput 
              otp
              onComplete={(code) => handleVerify(code)}
              size="lg">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          
          {isCodeError ? (
            <FormHelperText mt="6" color="red.500">
              {codeMessage}
            </FormHelperText>
          ) : null}
          <Button onClick={handleResend} mt="8">Retry</Button>
        </FormControl>
      </VStack>
    </Box>
  );
}
