import React from 'react';
import {
  Box, Flex, Heading
} from '@chakra-ui/react';

export default function ModifierButton({handleOnClick, totalPrice, isItemInCart}) {

  const buttonLabelType = () => {
    if (isItemInCart === false) {
      return 'Add To Order';
    }
    return 'Update Order';
  };

  return (
    <Flex
      onClick={handleOnClick}
      py="4" 
      w="100%" 
      justifyContent="center">
      <Box
        ml="6"
        w="100%"
        py="5"
        mr='8'
        borderRadius="md"
        backgroundColor={'#085F63'}
      >
        <Flex justifyContent='space-between' px="8" alignItems="center">
          <Heading color="white" fontWeight='semibold' size="md">{buttonLabelType()}</Heading>
          <Heading color="white" fontWeight='semibold' size="md">${totalPrice.toFixed(2)}</Heading>
        </Flex>
      </Box>
    </Flex>
  );
}
