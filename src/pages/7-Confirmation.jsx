/* eslint-disable no-undef */
import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import {
  Flex, Heading, VStack, Text, Button, HStack, Box, Spacer, Icon, Image
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../context/slices/cartSlice';
import { MdOutlineReceiptLong } from 'react-icons/md';
import ReceiptWithCheckmark from '../assets/receipt-with-checkmark.svg';
import ReceiptGraphic from '../assets/receipt.svg';

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
    <Box bg="gray.50" h="100vh">
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
            <Image src={ReceiptWithCheckmark} maxH="200px" alt="logo" />
            <VStack px="6" mb="6" alignItems="center">
              <Heading size="md" mt="-30px" mb="8">Receipt Saved</Heading>
            </VStack>
            <Flex justifyContent={'center'} alignItems='center' direction="column" w="100%">
              <Flex pb="4" maxW="500px" minWidth="300px">
                <Text fontSize={'2.25rems'} color="gray.500">Order total</Text>
                <Spacer /><Text>${orderTotal}</Text>
              </Flex>
              <Flex pb="4" maxW="500px" minWidth="300px">
                <Text fontSize={'2.25rems'} color="gray.500">Receipt number</Text>
                <Spacer /><Text>CF09B630-0026</Text>
              </Flex>
              <Flex pb="4" maxW="500px" minWidth="300px">
                <Text fontSize={'2.25rems'} color="gray.500">Payment date</Text>
                <Spacer /><Text>January 6, 2023</Text>
              </Flex>
              <Flex pb="4" maxW="500px" minWidth="300px">
                <Text fontSize={'2.25rems'} color="gray.500">Payment method</Text>
                <Spacer /><Text>Visa •••• 7056</Text>
              </Flex>
            </Flex>
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
          <Flex 
            onClick={() => navigate('/user/receipts')}
            borderBottom='1px' 
            borderColor='gray.200' 
            pb="3" 
            alignItems="center">
            <HStack spacing="1.5">
              <Image src={ReceiptGraphic} maxH='75px' h="100%" />
              <HStack spacing="1.5">
                <Text fontSize="lg" fontWeight={'medium'}>View receipts</Text>
                <ChevronRightIcon fontWeight={'bold'} fontSize="1.30em"/>
              </HStack>
            </HStack>
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
