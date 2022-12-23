import React, { useState, useEffect } from 'react';
import {
  Box, Flex, Heading, VStack, Text, Spacer, Button, Icon
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineEdit } from 'react-icons/ai';

export default function PaceOrderButton({page, handleOnClick, buttonLabel, loading, tip, subTotal, subTotalWithTax, paymentChoice}) {
  const navigate = useNavigate();
  const venueServiceFee = (subTotal*0.018).toFixed(2) || 0;
  const [totalCost, setTotalCost] = useState((parseFloat(tip)+parseFloat(subTotalWithTax)+parseFloat(venueServiceFee)).toFixed(2));

  useEffect(() => {
    if (tip === undefined) setTotalCost(subTotalWithTax);
    else setTotalCost((parseFloat(tip)+parseFloat(subTotalWithTax)).toFixed(2));
  }, [subTotal, tip, paymentChoice]);

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
          <Box>
            <Flex>
              <Text>Tip</Text>
              <Spacer />
              <Flex
                onClick={() => navigate('/cart/tip')}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Icon mr={2} as={AiOutlineEdit} />
                <Text>${tip}</Text>
              </Flex>
            </Flex>
          </Box>
        )}
        <Flex>
          <Text>Venue Service Fee</Text>
          <Spacer />
          <Flex alignItems='center'>
            <Text>${venueServiceFee}</Text>
          </Flex>
        </Flex>
        <Flex pb="4">
          <Text fontSize={'2.25rems'} fontWeight={'bold'}>Total</Text>
          <Spacer />
          <Text fontSize={'2.25rems'} fontWeight={'bold'}>${totalCost}</Text>
        </Flex>
      </VStack>

      {page === 'cart' ? (
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
      ) : null}

      {paymentChoice === 'Apple Pay' ? (
        <Button
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
          <Box id="applePayButton" color="white">Apple Pay</Box>
        </Button>
      ) : null}

      {paymentChoice === 'Google Pay' ? (
        <Box
          mx="6"
          h="50px"
          id="googlePayButton" 
          color="white">Google Pay</Box>
      ) : null}

      {paymentChoice === 'cardPay' ? (
        <Button
          display={paymentChoice !== 'cardPay' ? 'none' : 'block'}
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
          <Heading color="white" fontWeight='semibold' size="md">Pay</Heading>
        </Button>
      ) : null}
      
    </Flex>
  );
}
