/* eslint-disable no-mixed-spaces-and-tabs */
import {
  FormControl, HStack, useToast, FormLabel, Box, VStack, Input, Button, Flex, Heading, FormHelperText
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { supabasePrivate } from '../../services/supabasePrivate';
import Cards from 'react-credit-cards-2';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/auth';
import { useSelector } from 'react-redux';
import 'react-credit-cards-2/es/styles-compiled.css';

export default function PaymentMethod() {
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [cardInputFocus, setCardInputFocus] = useState('');
  const [cardInfo, setCardInfo] = useState({cvc: '', expiry: '', name: '', number: ''});
  const [isCardNumberError, setIsCardNumberError] = useState(false);
  const [isCardNameError, setIsCardNameError] = useState(false);
  const [isCardExpiryError, setIsCardExpiryError] = useState(false);
  const [isCardCvcError, setIsCardCvcError] = useState(false);

  useEffect(() => {
    setPreviousRecord();
  }, [false]);
  
  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    
    setCardInfo({ ...cardInfo, [name]: value });
  };

  const prefillFields = (savedData) => {
    if (savedData.card_number !== null) setCardInfo({number: savedData.card_number});
    if (savedData.card_name !== null) setCardInfo({name: savedData.card_name});
    if (savedData.card_expiry !== null) setCardInfo({expiry: savedData.card_expiry});
    if (savedData.card_cvc !== null) setCardInfo({cvc: savedData.card_cvc});
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
    if (cardInfo.number.length !== 16) {
      setIsCardNumberError(true);
      return false;
    }
    if (cardInfo.name.length < 3) {
      setIsCardNameError(true);
      return false;
    }
    if (cardInfo.expiry.length !== 4) {
      setIsCardExpiryError(true);
      return false;
    }
    if (cardInfo.cvc.length !== 3) {
      setIsCardCvcError(true);
      return false;
    }

    setIsCardNumberError(false);
    setIsCardNameError(false);
    setIsCardExpiryError(false);
    setIsCardCvcError(false);
    return true;
  };

  const handleSavePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (await checkForInputErrors() === false) return;

    const { error } = await supabasePrivate
      .from('customers')
      .update({ 
        card_name: cardInfo.name,
        card_number: cardInfo.number,
        card_expiry: cardInfo.expiry,
        card_cvc: cardInfo.cvc
      })
      .match({ id: user.id });

    if (error)  throw error;
    else {
      console.log('payment saved');
      // todo if last page is checkout, redirect to checkout
      // navigate('/cart/checkout');
      navigate(-1);
      
    }

    setLoading(false);
  };

  return (
    <Box>
      <Navbar title="Your details" showBackButton={true} brandColor={localStorage.getItem('brandColor')} />
      <VStack 
        pt="115px"
        spacing={4}
        align="stretch"
        px="6"
      > 
        <Box mb="12"> 
          <Cards
            cvc={cardInfo.cvc}
            expiry={cardInfo.expiry}
            focused={focus}
            name={cardInfo.name}
            number={cardInfo.number}
          />
        </Box>

        <FormControl mt="32" isError={isCardNumberError}>
          <FormLabel fontSize='sm'>Card Number</FormLabel>
          <Input 
            value={cardInfo.number}
            onChange={handleCardInputChange} 
            name="number" 
            onFocus={(e) => setCardInputFocus(e.target.name)} 
            placeholder='xxxx xxxx xxxx xxxx' 
            size='md' width="100%" />
          {isCardNumberError ? (
            <FormHelperText color="red.500">
                Please enter 16 digits
            </FormHelperText>
          ) : null}
        </FormControl>

        <FormControl isError={isCardNameError}>
          <FormLabel fontSize='sm'>Full Name</FormLabel>
          <Input 
            value={cardInfo.name} 
            name={'name'} 
            onChange={handleCardInputChange} 
            onFocus={(e) => setCardInputFocus(e.target.name)}
            placeholder='Required' size='md' width="100%" />
          {isCardNameError ? (
            <FormHelperText color="red.500">
                Please enter name displayed on the card
            </FormHelperText>
          ) : null}
        </FormControl>

        <HStack spacing={4}>
          <FormControl isError={isCardExpiryError}>
            <FormLabel fontSize='sm'>Expiry Date </FormLabel>
            <Input 
              value={cardInfo.expiry} 
              name={'expiry'} 
              onChange={handleCardInputChange} 
              onFocus={(e) => setCardInputFocus(e.target.name)}
              placeholder='MMYY' size='md' width="100%" />
            {isCardExpiryError ? (
              <FormHelperText color="red.500">
                Please enter date in format MMYY
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
          onClick={handleSavePayment}
          isLoading={loading} 
          _loading={{ bg: 'transparent' }}
          mx="6"
          w="100%"
          h="65px"
          borderRadius="md"
          backgroundColor={'black'}
        >
          <Heading color="white" fontWeight='semibold' size="md">Save card</Heading>
        </Button>
      </Flex>

    </Box>
  );
}
 
