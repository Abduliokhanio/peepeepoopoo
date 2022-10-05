import React from 'react';
import Navbar from '../components/Navbar';
import {
  Flex, Box, Heading, Input, VStack, Text, Button, InputGroup, InputLeftAddon, InputLeftElement,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';

export default function Login() {
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
          <Text textAlign="center">Recieve a 4 digit number to verify your account</Text>
        </VStack>
        <InputGroup>
          <InputLeftAddon children="+1" h="" />
          <Input type="tel" placeholder="Your mobile number" size="lg" />
        </InputGroup>
        <Button size="lg" bg={localStorage.getItem('brandColor')} width="100%">Continue</Button>
      </VStack>
    </Box>
  );
}
