import React from 'react';
import {
  Box, Flex, Heading
} from '@chakra-ui/react';

export default function AddToCartButton({handleOnClick, totalPrice, numberOfItems}) {

  return (
    <Flex
      onClick={handleOnClick}
      bg="RGBA(255, 255, 255, 0.90)" 
      py="4" 
      blur="40%" w="100%" justifyContent="center">
      <Box
        ml="6"
        w="100%"
        py="5"
        borderRadius="md"
        backgroundColor={'black'}
      >
        <Flex justifyContent='space-around' alignItems="center">
          <Heading color="white" fontWeight='semibold' size="md">Add To Order • ${totalPrice}</Heading>
        </Flex>
      </Box>
    </Flex>
  );
}
