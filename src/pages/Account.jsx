import React, { useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import { supabase } from '../services/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import {
  Heading, HStack, useToast, Text, FormControl, Flex, Stack, InputLeftElement, InputGroup, Box, Input, InputRightElement, Button
} from '@chakra-ui/react';
import { Icon, ChevronRightIcon } from '@chakra-ui/icons';
import { MdOutlineReceiptLong, MdOutlineAccountCircle } from 'react-icons/md';

export default function AccountPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {

  }

  return (
    <Stack backgroundColor="#F9FBFC;" direction="column" minH="100vh" h="100%">
      <Navbar title="Your account" showBackButton={true} brandColor={localStorage.getItem('brandColor')} />
      <Flex borderBottom='1px' borderColor='gray.200' px="6" py="6" justifyContent="space-between">
        <HStack spacing="4">
          <Icon fontSize="xl" as={MdOutlineAccountCircle} />
          <Text fontSize="xl">Edit account details</Text>
        </HStack>
        <ChevronRightIcon />
      </Flex>
      <Flex borderBottom='1px' borderColor='gray.200' px="6" py="6" justifyContent="space-between">
        <HStack spacing="4">
          <Icon fontSize="xl" as={MdOutlineReceiptLong} />
          <Text fontSize="xl">Orders & reciepts</Text>
        </HStack>
        <ChevronRightIcon />
      </Flex>
    </Stack>
  );
}
