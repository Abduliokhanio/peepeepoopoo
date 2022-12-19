import React, { useState, useEffect } from 'react';
import {
  Box, Flex, Heading, VStack, Text, Spacer, Button
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';

export default function PaceOrderButton({handleOnClick, loading, tip, subTotal, subTotalWithTax, buttonLabel}) {

  const revenueServiceFee = (subTotal*0.018).toFixed(2) || 0;
  const [totalCost, setTotalCost] = useState((parseFloat(tip)+parseFloat(subTotalWithTax)).toFixed(2)+revenueServiceFee);

  useEffect(() => {
    if (tip === undefined) setTotalCost(subTotalWithTax);
    else setTotalCost((parseFloat(tip)+parseFloat(subTotalWithTax)).toFixed(2));

  }, [subTotal, tip]);

  {/* <VStack
              pos="fixed"
              bottom="0" 
              w="100%"
              px="6"
              bg="white"
              py="4" 
              blur="40%" 
              spacing={4}
              align="stretch">
              {paymentChoice === 'Apple Pay' ? (
                <Button id="applePayButton" py="8" disabled={loadingKeepTabOpen} isLoading={loadingPayment} onClick={() => handlePayment()} w="100%" size="lg" color="white" bg="black" borderColor="black">Pay Now | Apple Pay</Button>
              ) :
                paymentChoice === 'Google Pay' ? (
                  <Button id="googlePayButton" py="8" disabled={loadingKeepTabOpen} isLoading={loadingPayment} onClick={() => handlePayment()} w="100%" size="lg" color="white" bg="black" borderColor="black">Pay Now  | Google Pay</Button>
                ) : (
                  <Button id="customPayButton" py="8" disabled={loadingKeepTabOpen} isLoading={loadingPayment} onClick={() => handlePayment()} w="100%" size="lg" color="white" bg="black" borderColor="black">Pay Now </Button>
                ) }
            </VStack> */}

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
        {tip === null || tip === undefined ? null : (
          <Flex>
            <Text>Tip</Text>
            <Spacer />
            <Text>${tip}</Text>
          </Flex>
        )}
        <Flex>
          <Text>Venue Service Fee</Text>
          <Spacer />
          <Flex alignItems='center'>
            <Text>${revenueServiceFee}</Text>
          </Flex>
        </Flex>
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
