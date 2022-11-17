/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabasePrivate } from '../../services/supabasePrivate';
import Navbar from '../../components/Navbar';
import {
  PinInput, PinInputField, Flex, HStack, FormControl, Box, Heading, FormHelperText, Input, VStack, Text, Button, InputGroup, InputLeftAddon, InputLeftElement,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export default function Verify() {
  const navigate = useNavigate();
  const customerNumber = useSelector((state) => state.customer.mobileNumber);
  const [isCodeError, setIsCodeError] = useState(false);
  const [codeMessage, setCodeMessage] = useState('');
  const [loading, setLoading] = useState(false);

  supabasePrivate.auth.onAuthStateChange((event) => {
    if (event == 'SIGNED_IN') {
      console.log('logged in');
      // TODO: navigate back to last page before auth flow
      navigate('/');
    }
  });

  const handleVerify = async (code) => { 

    let { session, error } = await supabasePrivate.auth.verifyOtp({
      phone: '+1' + customerNumber,
      token: code,
      type: 'sms',
    });

    console.log('session: ', session);
    console.log('error: ', error);

    if (error) {
      setIsCodeError(true);
      setCodeMessage(error.message);
      throw error;
    }

    setLoading(false);
  };

  return (
    <Box>
      <Navbar title="Create account" showBackButton={true} />
      <VStack
        pt="32"
        spacing={4}
        align="stretch"
        px="6"
      >
        <VStack px="6" h="20" mb="6" alignItems="center">
          <Heading size="lg">
            Verifying +1{customerNumber}
          </Heading>
          <Text textAlign="center">Enter the digits that was sent to you</Text>
        </VStack>
        <FormControl isInvalid={isCodeError}>
          <HStack justifyContent="center" w="100%" >
            <PinInput 
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
        </FormControl>
      </VStack>
    </Box>
  );
}
