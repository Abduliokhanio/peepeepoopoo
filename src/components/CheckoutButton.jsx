import React from 'react';
import {
  Box, Flex, Heading, Text
} from '@chakra-ui/react';

export default function CheckoutButton({brandColor}) {

  return (
    <Flex pos="fixed"
      bottom="0" 
      bg="RGBA(255, 255, 255, 0.90)" 
      py="4" 
      blur="40%" w="100%" justifyContent="center">
      <Box
        mx="6"
        w="100%"
        py="5"
        borderRadius="md"
        backgroundColor={brandColor}
      >
        <Flex justifyContent='space-around' alignItems="center">
          <Box px="3" py="1" bg="#ffffff3d" borderRadius="md">
            <Text color="#1F1F1F" fontWeight="bold">3</Text>
          </Box>
          <Heading color="#1F1F1F" fontWeight='semibold' size="md">View order</Heading>
          <Text color="#1F1F1F" mt="1" fontSize='1.1em' fontWeight='semibold'>$6.50</Text>
        </Flex>
      </Box>
    </Flex>
  );
}
