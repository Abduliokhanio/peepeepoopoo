import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../services/supabaseClient';
import {
  Progress, FormControl, InputGroup, InputLeftAddon, useToast, FormLabel, Box, VStack, Input, Text, Divider, Button, Flex, Spacer, HStack, Badge, Heading
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

export default function BusinessInformationForm({setCurrentForm}) {
  const { user } = useAuth();
  const toast = useToast();

  const [hasRecord, setHasRecord] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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
    if (savedData.full_name !== null) {
      setFullName(savedData.full_name);
    }
    if (savedData.email_address !== null) {
      setEmailAddress(savedData.email_address);
    }
    if (savedData.phone_number !== null) {
      setPhoneNumber(savedData.phone_number);
    }
  };

  const setPreviousRecord = async (e) => {

    const querySavedData = await supabase
      .from('customers')
      .select('*')
      .eq('id', user.id);

    if (querySavedData.error) {
      throw querySavedData.error;
    } 

    if (querySavedData.data.length > 0) {
      prefillFields(querySavedData.data[0]);
      setHasRecord(true);
      return;
    }  
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (hasRecord) {
      const { error } = await supabase
        .from('customers')
        .update({ 
          full_name: fullName, 
          email_address: emailAddress,
          phone_number: phoneNumber
        })
        .match({ id: user.id });

      if (error) {
        showAlert(`error saving: ${error}`, 'error');
        throw error;
      } else {
        showAlert('Changes saved', 'success');
        setLoading(false);
      }
  
    }
  };

  return (
    <Box>
      <VStack spacing={6} textAlign="left">
        <FormControl>
          <FormLabel fontSize='sm' mb='2'>Full name</FormLabel>
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='Full name' size='md' width="100%" />
        </FormControl>

        <FormControl>
          <FormLabel fontSize='sm' mb='2'>Email address</FormLabel>
          <Input value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} placeholder='Email address' size='md' width="100%" />
        </FormControl>

        <FormControl>
          <FormLabel fontSize='sm' mb='2'>Phone number</FormLabel>
          <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Phone number' size='md' width="100%" />
        </FormControl>
      </VStack>
      <Flex pos="fixed"
        bottom="0" 
        bg="RGBA(255, 255, 255, 0.90)" 
        py="4" 
        blur="40%" w="100%" justifyContent="center">
        <Box
          mx="6"
          w="100%"
          py="5"
          borderRadius="md"
          backgroundColor={localStorage.getItem('brandColor')}
          onClick={handleContinue}
          isLoading={loading}
        >
          <Heading fontWeight='semibold' size="md">Save changes</Heading>
        </Box>
      </Flex>
    </Box>
  );
}
