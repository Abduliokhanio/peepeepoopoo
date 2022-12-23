/* eslint-disable no-undef */
import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import {
  Flex, Heading, VStack, Text, Button, HStack, Box, Spacer, Icon
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../context/slices/cartSlice';
import { MdOutlineReceiptLong } from 'react-icons/md';

export default function ClosedTab() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customerName = useSelector(state => state.customer.firstName);
  const merchantURLPath = useSelector(state => state.merchant.urlPath);
  const orderTotal = useSelector(state => state.cart.orderTotal);
  
  const handleReturnButton = () => {
    dispatch(clearCart());
    navigate(`/${merchantURLPath}`);
  };

  return (
    <Box>
      <Navbar title="OrderAhead" showLeftButton={false} />
      <Flex direction="column">
        <Flex
          mt="12"
          direction="column"
        >
          <VStack
            spacing={4}
            align="stretch"
            px="6"
          >
            <VStack px="6" h="20" mb="6" alignItems="center">
              <Heading size="lg">Thank you, {customerName}!</Heading>
            </VStack>

          </VStack>
        </Flex>
      </Flex>

      <Flex
        pos="fixed"
        bottom="0" 
        left="0"
        bg="RGBA(255, 255, 255, 0.90)" 
        py="4" 
        blur="40%" 
        w="100%" 
        justifyContent="center"
        direction={'column'}
        borderTop="1px solid #e8e8e8">
        <VStack
          spacing={1}
          align="stretch"
          px="6">
          <Flex pb="4">
            <Text fontSize={'2.25rems'} fontWeight={'bold'}>Order total</Text>
            <Spacer /><Text>${orderTotal}</Text>
          </Flex>
          <Flex 
            onClick={() => navigate('/user/receipts')}
            borderBottom='1px' 
            borderColor='gray.200' 
            py="6" 
            justifyContent="space-between">
            <HStack spacing="4">
              <Icon h="6" w="6" as={MdOutlineReceiptLong} />
              <Text fontSize="xl">Receipts</Text>
            </HStack>
            <ChevronRightIcon />
          </Flex>
        </VStack>
        <Button
          onClick={handleReturnButton} 
          _loading={{
            bg: 'transparent' 
          }}
          _hover={{
            bg: 'black' 
          }}
          _focus={{
            bg: 'black' 
          }}
          mx="6"
          h="65px"
          mt="4"
          borderRadius="md"
          backgroundColor={'black'}
        >
          <Heading color="white" fontWeight='semibold' size="md">Return to Menu</Heading>
        </Button>
      </Flex>
     
    </Box>
  );
}
