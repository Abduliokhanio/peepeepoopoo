import React, { useRef, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/Auth';
import { useNavigate } from 'react-router-dom';
import {supabasePrivate} from '../../services/supabasePrivate';
import {
  HStack, Text, Flex, Stack, Box
} from '@chakra-ui/react';
import { Icon, ChevronRightIcon } from '@chakra-ui/icons';
import { MdOutlineReceiptLong, MdOutlineAccountCircle, MdPayment } from 'react-icons/md';

export default function AccountPage() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSelect = (option) => {
    if (option === 'account-details') navigate('/user/account-details');
    else if (option === 'receipts') navigate('/user/receipts');
    else if (option === 'payment-methods') navigate('/user/payment-methods');
  };

  const checkRecords = async (option) => {
    if (user === null) navigate('/auth/signup');
    const customer = await supabasePrivate
      .from('customers')
      .select('*')
      .match({
        id: user.id 
      });
      
    if (customer.error) navigate('/auth/signup');
    else handleSelect(option);
  };

  const handleLogout = async () => {
    const { error } = await supabasePrivate.auth.signOut();
    if (error) throw error;
    else navigate('/auth/signup');
  };

  return (
    <Stack backgroundColor="#F9FBFC;" direction="column" minH="100vh" h="100%">
      <Navbar title="Your account" showBackButton={true} brandColor={localStorage.getItem('brandColor')} />
      
      <Box>
        <Flex onClick={() => checkRecords('account-details')} borderBottom='1px' borderColor='gray.200' px="6" py="6" justifyContent="space-between">
          <HStack spacing="4">
            <Icon h="6" w="6" as={MdOutlineAccountCircle} />
            <Text fontSize="xl">Edit account details</Text>
          </HStack>
          <ChevronRightIcon />
        </Flex>
      
        <Flex onClick={() => checkRecords('receipts')} borderBottom='1px' borderColor='gray.200' px="6" py="6" justifyContent="space-between">
          <HStack spacing="4">
            <Icon h="6" w="6" as={MdOutlineReceiptLong} />
            <Text fontSize="xl">Receipts</Text>
          </HStack>
          <ChevronRightIcon />
        </Flex>

        <Flex onClick={() => checkRecords('payment-methods')} borderBottom='1px' borderColor='gray.200' px="6" py="6" justifyContent="space-between">
          <HStack spacing="4">
            <Icon h="6" w="6" as={MdPayment} />
            <Text fontSize="xl">Payment methods</Text>
          </HStack>
          <ChevronRightIcon />
        </Flex>
      </Box>

      <Text onClick={() => handleLogout()} position={'absolute'} bottom={10} left={10}>Logout</Text>
    </Stack>
  );
}
