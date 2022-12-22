/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabasePrivate } from '../../services/supabasePrivate';
import Navbar from '../../components/Navbar';
import {
  PinInput, PinInputField, Spinner, HStack, FormControl, Box, Heading, FormHelperText, Input, VStack, Text, Button, InputGroup, InputLeftAddon, InputLeftElement,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { setFirstName, setLastName } from '../../context/slices/customerSlice';

export default function Verify() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customerNumber = useSelector((state) => state.customer.mobileNumber);
  const merchantURL = useSelector((state) => state.merchant.urlPath);
  const [isCodeError, setIsCodeError] = useState(false);
  const [codeMessage, setCodeMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) setSeconds(seconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  supabasePrivate.auth.onAuthStateChange((event, session) => {
    if (event == 'SIGNED_IN') isNewCustomer(session.user.id);
  });

  const handleVerify = async (code) => { 
    setisCodeError(false);
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
  };

  const isNewCustomer = async (userID) => {
    const { data } = await supabasePrivate
      .from('customers')
      .select('*').eq('id', userID);

    if (data.length === 0) {
      addNewCustomer(userID); 
      return;
    }

    dispatch(setFirstName(data[0].first_namee));
    dispatch(setLastName(data[0].last_name));
    navigate(`/${merchantURL}`);
  };

  const addNewCustomer = async (userID) => {
    const { error } = await supabasePrivate
      .from('customers')
      .insert({
        id: userID
      });

    if (error) throw error;
    navigate('/user/account-details');
  };

  const handleResend = async (e) => {
    setSeconds(20);
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
          {loading ? <Spinner /> : (
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
          )}
          {isCodeError ? (
            <FormHelperText mt="6" color="red.500">
              {codeMessage}
            </FormHelperText>
          ) : null}
          <Button 
            isDisabled={seconds > 0}
            onClick={handleResend} mt="12">Resend code {seconds > 0 ? `(${seconds})` : null}</Button>
        </FormControl>
      </VStack>
    </Box>
  );
}
