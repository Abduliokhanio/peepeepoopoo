import React, { useState, useEffect } from 'react';
import {
  Box, Flex, Heading, VStack, Text, Spacer, Button
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';

export default function PaceOrderButton({handleOnClick, loading, tip, subTotal, subTotalWithTax, buttonLabel}) {

  const [totalCost, setTotalCost] = useState((parseFloat(tip)+parseFloat(subTotalWithTax)).toFixed(2));

  useEffect(() => {
    if (tip === undefined) setTotalCost(subTotalWithTax);
    else setTotalCost((parseFloat(tip)+parseFloat(subTotalWithTax)).toFixed(2));

  }, [subTotal, tip]);

  return (
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
        <Flex>
          <Text>Subtotal</Text>
          <Spacer />
          <Text>${subTotal}</Text>
        </Flex>
        <Flex>
          <Text>Tax</Text>
          <Spacer />
          <Flex alignItems='center'>
            <Text mr="2" fontSize={'12'} color='gray.700'>(8.25%)</Text>
            <Text>${(subTotalWithTax-subTotal).toFixed(2)}</Text>
          </Flex>
        </Flex>
        {tip === null || tip === undefined ? null : (
          <Flex>
            <Text>Tip</Text>
            <Spacer />
            <Text>${tip}</Text>
          </Flex>
        )}
        <Flex pb="4">
          <Text fontSize={'2.25rems'} fontWeight={'bold'}>Total</Text>
          <Spacer />
          <Text fontSize={'2.25rems'} fontWeight={'bold'}>${totalCost}</Text>
        </Flex>
      </VStack>
      <Button
        onClick={handleOnClick}
        isLoading={loading} 
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
        <Heading color="white" fontWeight='semibold' size="md">{buttonLabel}</Heading>
      </Button>
    </Flex>
  );
}
