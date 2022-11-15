import React from 'react';
import {
  Box, Flex, Heading
} from '@chakra-ui/react';

export default function ModifierButton({handleOnClick, totalPrice, isItemInCart}) {

  const buttonLabelType = () => {
    console.log('isItemInCart: dddd ', isItemInCart);
    if (isItemInCart === false) {
      return 'Add To Order';
    }
    return 'Update Order';
  };

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
        mr='8'
        borderRadius="md"
        backgroundColor={'black'}
      >
        <Flex justifyContent='space-around' alignItems="center">
          <Heading color="white" fontWeight='semibold' size="md">{buttonLabelType()} • ${totalPrice}</Heading>
        </Flex>
      </Box>
    </Flex>
  );
}
