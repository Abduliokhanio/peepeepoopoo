import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabasePrivate } from '../../services/supabasePrivate';
import Navbar from '../../components/Navbar';
import {
  Flex, FormControl, Box, Heading, FormHelperText, Input, VStack, Text, Button, InputGroup, InputLeftAddon, InputLeftElement,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setMobileNumber } from '../../context/slices/customerSlice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [number, setNumber] = useState('');
  const [isNumberError, setIsNumberError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNumberInputChange = (e) => {
    setNumber(e.target.value);

    if (e.target.value.length === 10) {
      setIsNumberError(false);
    }
  };

  const handleGetCode = async () => { 
    setLoading(true);

    if (number.length != 10) {
      setIsNumberError(true);
      return;
    }
    
    let { user, error } = await supabasePrivate.auth.signInWithOtp({
      phone: '+1' + number
    });

    dispatch(setMobileNumber(number));

    console.log('user: ', user);
    console.log('error: ', error);

    if (error) throw error;
    navigate('/auth/verify');
    setLoading(false);
  };

  return (
    <Box>
      <Navbar title="Create account" showBackButton={true} brandColor={localStorage.getItem('brandColor')} />
      <VStack
        spacing={4}
        align="stretch"
        px="6"
      >
        <VStack px="6" h="20" mb="6" alignItems="center">
          <Heading size="lg">
            Verify your number
          </Heading>
          <Text textAlign="center">You&apos;ll recieve a 6 digit verification code</Text>
        </VStack>
        <FormControl isInvalid={isNumberError}>
          <InputGroup pb="4">
            <InputLeftAddon children="+1" h="" />
            <Input onChange={handleNumberInputChange} type="number" placeholder="Your mobile number" size="lg" />
          </InputGroup>
          {isNumberError ? (
            <FormHelperText color="red.500">
                Please enter a number with 10 digits
            </FormHelperText>
          ) : null}
        </FormControl>
      </VStack>

      <Flex
        pos="fixed"
        bottom="0" 
        bg="RGBA(255, 255, 255, 0.90)" 
        py="4" 
        blur="40%" w="100%" 
        justifyContent="center"
        borderTop="1px solid #e8e8e8">
        <Button
          onClick={handleGetCode}
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
          <Heading color="white" fontWeight='semibold' size="md">Get verification code</Heading>
        </Button>
      </Flex>
    </Box>
  );
}
