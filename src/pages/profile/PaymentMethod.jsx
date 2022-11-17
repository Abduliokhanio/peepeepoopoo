/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards-2';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/auth';
import { supabasePrivate } from '../../services/supabasePrivate';
import {
  FormControl, HStack, useToast, FormLabel, Box, VStack, Input, Button, Flex, Heading, FormHelperText
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import 'react-credit-cards-2/es/styles-compiled.css';

export default function PaymentMethod() {
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [isFirstNameError, setIsFirstNameError] = useState(false);
  const [cardInputFocus, setCardInputFocus] = useState('');
  const [cardInfo, setCardInfo] = useState({
    cvc: '',
    expiry: '',
    name: '',
    number: '',
  });
  const [isCardNumberError, setIsCardNumberError] = useState(false);
  const [isCardNameError, setIsCardNameError] = useState(false);
  const [isCardExpiryError, setIsCardExpiryError] = useState(false);
  const [isCardCvcError, setIsCardCvcError] = useState(false);

  // const [cvc, setCvc] = useState('');
  // const [expiry, setExpiry] = useState('');
  // const [focus, setFocus] = useState('');
  // const [name, setName] = useState('');
  // const [number, setNumber] = useState('');

   useEffect(() => {
    setPreviousRecord();
  }, [false]);
  
  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    
    setCardInfo({ ...cardInfo, [name]: value });
  };

 

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
  };

  const setPreviousRecord = async (e) => {

    const querySavedData = await supabasePrivate
      .from('customers')
      .select('*')
      .eq('id', user.id);

    if (querySavedData.error) throw querySavedData.error;
    if (querySavedData.data.length > 0) prefillFields(querySavedData.data[0]);
  };

  const checkForInputErrors = () => {
    if (firstName.length < 3) {
      setIsFirstNameError(true);
      return false;
    }

    setIsFirstNameError(false);

    return true;
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (await checkForInputErrors() === false) return;

    const { error } = await supabasePrivate
      .from('customers')
      .update({ 
        first_name: firstName
      })
      .match({ id: user.id });

    if (error) {
      showAlert(`error saving: ${error}`, 'error');
      setLoading(false);
      throw error;
    } else {
      showAlert('Changes saved', 'success');
      // todo if last page is checkout, redirect to checkout
      navigate('/cart/checkout');
      setLoading(false);
    }
  };

  return (
    <Box>
      <Navbar title="Your details" showBackButton={true} brandColor={localStorage.getItem('brandColor')} />
      <VStack 
        pt="36"
        spacing={4}
        align="stretch"
        px="6"
      > 

        <Cards
          cvc={cardInfo.cvc}
          expiry={cardInfo.expiry}
          focused={focus}
          name={cardInfo.name}
          number={cardInfo.number}
        />

        <FormControl isError={isCardNumberError}>
          <FormLabel fontSize='sm'>Card Number</FormLabel>
          <Input 
            value={cardInfo.number}
            onChange={handleCardInputChange} 
            name="number" onFocus={(e) => setCardInputFocus(e.target.name)} 
            placeholder='Required' 
            size='md' width="100%" />
          {isCardNumberError ? (
            <FormHelperText color="red.500">
                Please enter 16 digits
            </FormHelperText>
          ) : null}
        </FormControl>

        <FormControl isError={isCardNameError}>
          <FormLabel fontSize='sm'>Name</FormLabel>
          <Input 
            value={cardInfo.name} 
            name={'name'} 
            onChange={handleCardInputChange} 
            placeholder='Required' size='md' width="100%" />
          {isCardNameError ? (
            <FormHelperText color="red.500">
                Please enter name displayed on the card
            </FormHelperText>
          ) : null}
        </FormControl>

        <HStack spacing={2}>
          <FormControl isError={isCardExpiryError}>
            <FormLabel fontSize='sm'>Expiry date </FormLabel>
            <HStack>
              <Input 
                value={cardInfo.expiry} 
                name={'expiry'} 
                onChange={handleCardInputChange} 
                onFocus={(e) => setCardInputFocus(e.target.name)}
                placeholder='MM' size='md' width="100%" />
              <Input 
                value={cardInfo.expiry} 
                name={'expiry'} 
                onChange={handleCardInputChange} 
                onFocus={(e) => setCardInputFocus(e.target.name)}
                placeholder='YY' size='md' width="100%" />
            </HStack>
            {isCardExpiryError ? (
              <FormHelperText color="red.500">
                Please enter date in format MM/YY
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl isError={isCardCvcError}>
            <FormLabel fontSize='sm'>CVC</FormLabel>
            <Input 
              value={cardInfo.cvc} 
              name={'cvc'} 
              onChange={handleCardInputChange} 
              onFocus={(e) => setCardInputFocus(e.target.name)}
              placeholder='Required' size='md' width="100%" />
            {isCardCvcError ? (
              <FormHelperText color="red.500">
                Please enter 3 digits
              </FormHelperText>
            ) : null}
          </FormControl>
        </HStack>
      </VStack>

    </Box>
  );
}
 
