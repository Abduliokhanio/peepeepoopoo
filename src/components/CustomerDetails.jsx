import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import { supabasePrivate } from '../services/supabasePrivate';
import {
  FormControl, HStack, useToast, FormLabel, Box, VStack, Input, Button, Flex, Heading, FormHelperText
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export default function CustomerDetails() {
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(useSelector((state) => state.customer.mobileNumber));
  const [isFirstNameError, setIsFirstNameError] = useState(false);
  const [isEmailAddressError, setIsEmailAddressError] = useState(false);

  useEffect(() => {
    setPreviousRecord();
  }, [false]);

  const showAlert = (message, status) => {
    toast({
      title: `${message}`,
      status: `${status}`,
      isClosable: true,
      position: 'top'
    });
  };

  const prefillFields = (savedData) => {
    if (savedData.first_name !== null) setFirstName(savedData.first_name);
    if (savedData.email_address !== null) setEmailAddress(savedData.email_address);
  };

  const setPreviousRecord = async (e) => {

    const querySavedData = await supabasePrivate
      .from('customers')
      .select('*')
      .eq('id', user.id);

    if (querySavedData.error) throw querySavedData.error;
    prefillFields(querySavedData.data[0]);
  };

  const checkForInputErrors = () => {
    if (firstName.length < 3) {
      setIsFirstNameError(true);
      setLoading(false);
      return false;
    }
    if (emailAddress.includes('@') === false) {
      setIsEmailAddressError(true);
      setLoading(false);
      return false;
    }

    setIsFirstNameError(false);
    setIsEmailAddressError(false);
    return true;
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (await checkForInputErrors() === false) return;

    const { error } = await supabasePrivate
      .from('customers')
      .update({ 
        first_name: firstName, 
        last_name: lastName,
        email_address: emailAddress
      })
      .match({
        id: user.id 
      });

    if (error) {
      showAlert(`error saving: ${error}`, 'error');
      setLoading(false);
      throw error;
    } else {
      showAlert('Changes saved', 'success');
      // todo if last page is checkout, redirect to checkout
      navigate('/cart');
      setLoading(false);
    }
  };

  return (
    <Box>
      <VStack 
        spacing={4}
        align="stretch"
        px="6"
      > 
        <HStack spacing={2}>
          <FormControl isInvalid={isFirstNameError}>
            <FormLabel fontSize='sm'>Name</FormLabel>
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='Name' size='md' width="100%" />
            {isFirstNameError ? (
              <FormHelperText color="red.500" textAlign={'left'}>
                Please enter your name
              </FormHelperText>
            ) : null}
          </FormControl>
        </HStack>

        <FormControl isInvalid={isEmailAddressError}>
          <FormLabel fontSize='sm' mb='2'>Email</FormLabel>
          <Input value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} placeholder='Email' size='md' width="100%" />
          {isEmailAddressError ? (
            <FormHelperText color="red.500" textAlign={'left'}>
                Please enter a valid email address
            </FormHelperText>
          ) : null}
        </FormControl>
      </VStack>

      <Flex
        pos="fixed"
        bottom="0" 
        bg="RGBA(255, 255, 255, 0.90)" 
        py="4" 
        blur="40%" 
        w="100%" 
        justifyContent="center"
        borderTop="1px solid #e8e8e8">
        <Button
          onClick={handleContinue}
          isLoading={loading} 
          _loading={{
            bg: 'transparent' 
          }}
          mx="6"
          w="100%"
          h="65px"
          borderRadius="md"
          backgroundColor={'black'}
        >
          <Heading color="white" fontWeight='semibold' size="md">Save changes</Heading>
        </Button>
      </Flex>
    </Box>
  );
}
