import React, { useRef, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import {
  Heading, Image, useToast, Text, FormControl, Flex, Stack, InputLeftElement, InputGroup, Box, Input, InputRightElement, Button
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
      <Heading>Your account</Heading>
      <Flex>
        <Box>
          <Icon as={MdOutlineAccountCircle} />
          <Text>Edit account details</Text>
        </Box>
        <ChevronRightIcon />
      </Flex>
    </Stack>
  );
}
