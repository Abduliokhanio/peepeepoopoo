import React, { useRef, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import {supabasePublic} from '../../services/supabasePublic';
import {
  HStack, Text, Flex, Stack, Box
} from '@chakra-ui/react';
import { Icon, ChevronRightIcon } from '@chakra-ui/icons';
import { MdOutlineReceiptLong, MdOutlineAccountCircle, MdPayment } from 'react-icons/md';

export default function AccountPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {

  }

  return (
    <Stack backgroundColor="#F9FBFC;" direction="column" minH="100vh" h="100%">
      <Navbar title="Your account" showBackButton={true} brandColor={localStorage.getItem('brandColor')} />
      
      <Box>
        <Flex onClick={() => navigate('/user/account-details')} borderBottom='1px' borderColor='gray.200' px="6" py="6" justifyContent="space-between">
          <HStack spacing="4">
            <Icon h="6" w="6" as={MdOutlineAccountCircle} />
            <Text fontSize="xl">Edit account details</Text>
          </HStack>
          <ChevronRightIcon />
        </Flex>
      
        <Flex onClick={() => navigate('/user/orders')} borderBottom='1px' borderColor='gray.200' px="6" py="6" justifyContent="space-between">
          <HStack spacing="4">
            <Icon h="6" w="6" as={MdOutlineReceiptLong} />
            <Text fontSize="xl">Receipts</Text>
          </HStack>
          <ChevronRightIcon />
        </Flex>

        <Flex onClick={() => navigate('/user/payment-methods')} borderBottom='1px' borderColor='gray.200' px="6" py="6" justifyContent="space-between">
          <HStack spacing="4">
            <Icon h="6" w="6" as={MdPayment} />
            <Text fontSize="xl">Payment methods</Text>
          </HStack>
          <ChevronRightIcon />
        </Flex>
      </Box>
    </Stack>
  );
}
