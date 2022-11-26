import React from 'react';
import {
  Box, Text, Heading, Stack, HStack, Image
} from '@chakra-ui/react';

export default function MenuItem({title, desc, price, qty, page, imageURL, ...rest}) {

  return (
    <Box 
      backgroundColor={'#242424'}
      border={'1px solid #363636'}
      cursor={'default'}
      minH="150" 
      shadow="xs" 
      borderRadius='lg' 
      overflow='hidden' 
      borderWidth="0.5px" {...rest}>
      {!imageURL ? null : (
        <Image maxH="150" w="100%" objectFit="cover" src={imageURL} alt="menu" />
      )}
      <Stack pl="4" py="2" textAlign="left">
        <Heading color="#dadada" fontFamily={'Inter'} fontSize="xl" mt='2'>{title}</Heading>
        <Text color="#bababa" fontSize="sm">{desc}</Text>
      </Stack>
    </Box>
  );
}
