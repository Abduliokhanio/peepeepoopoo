import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading, Box, Flex, HStack, Text } from '@chakra-ui/react';
import { Icon, ChevronRightIcon } from '@chakra-ui/icons';
import { MdPayment } from 'react-icons/md';

export default function AddPaymentMethod({ heading }) {
  const navigate = useNavigate();

  return (
    <Box px="6">
      {heading ? (
        <Heading size="md" textAlign={'left'} mt="6">{heading}</Heading>
      ) : null}
      <Flex
        onClick={() => navigate('/user/new-card')} 
        justifyContent="space-between"
        alignItems={'center'}>
        <HStack spacing="4" p="4" >
          <Icon h="8" w="8" as={MdPayment} />
          <Text fontSize="xl">Credit/Debit Card</Text>
        </HStack>
        {heading ? (
          <ChevronRightIcon />
        ) : null}
      </Flex>
    </Box>
  );
}