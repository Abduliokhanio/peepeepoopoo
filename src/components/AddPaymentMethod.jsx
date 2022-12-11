import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading, Box, Flex, HStack, Text } from '@chakra-ui/react';
import { Icon, ChevronRightIcon } from '@chakra-ui/icons';
import { MdPayment } from 'react-icons/md';

export default function AddPaymentMethod() {
  const navigate = useNavigate();

  return (
    <Box px="6">
      <Heading size="md" textAlign={'left'} mt="6">Add  Payment Method</Heading>
      <Flex
        onClick={() => navigate('/user/new-card')} 
        py="6" 
        justifyContent="space-between">
        <HStack spacing="4">
          <Icon h="6" w="6" as={MdPayment} />
          <Text fontSize="xl">Credit/Debit Card</Text>
        </HStack>
        <ChevronRightIcon />
      </Flex>
    </Box>
  );
}