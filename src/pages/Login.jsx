/* eslint-disable no-undef */
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Magic } from 'magic-sdk';
import {
  Flex, Box, Heading, Input, VStack, Text, Button, InputGroup, InputLeftAddon, InputLeftElement,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';

export default function Login() {
  const [number, setNumber] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = async () => { 

    // if login fails, try signup
    const { user, error } = await supabase.auth.signIn({
      phone: '+1' + number
    });

    // let { session, error } = await supabase.auth.verifyOTP({
    //   phone: '+1' + number,
    //   token: token,
    // });

    if (error) throw error;
    alert('Check your email for the login link!');
  };

  return (
    <Box>
      <Navbar title="Create account" showBackButton={true} brandColor={localStorage.getItem('brandColor')} />
      <VStack
        mt="14"
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
        <InputGroup>
          <InputLeftAddon children="+1" h="" />
          <Input type="email" placeholder="Your mobile number" size="lg" />
        </InputGroup>
        <Button size="lg" onClikc={handleLogin} bg={localStorage.getItem('brandColor')} width="100%">Continue</Button>
      </VStack>
    </Box>
  );
}
