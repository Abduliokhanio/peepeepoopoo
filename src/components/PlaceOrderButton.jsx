import React from 'react';
import {
  Box, Flex, Heading
} from '@chakra-ui/react';

export default function PaceOrderButton({handleOnClick, totalPrice}) {

  return (
    <Flex
      onClick={handleOnClick}
      pos="fixed"
      bottom="0" 
      bg="RGBA(255, 255, 255, 0.90)" 
      py="4" 
      blur="40%" w="100%" justifyContent="center">
      <Box
        mx="6"
        w="100%"
        py="5"
        borderRadius="md"
        backgroundColor={'black'}
      >
        <Flex justifyContent='space-around' alignItems="center">
          <Heading color="white" fontWeight='semibold' size="md">Place Order • ${totalPrice}</Heading>
        </Flex>
      </Box>
    </Flex>
  );
}
