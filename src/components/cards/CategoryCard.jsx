import React from 'react';
import {
  Box, Text, Heading, Stack, HStack, Image
} from '@chakra-ui/react';

export default function MenuItem({title, desc, price, qty, page, imageURL, ...rest}) {

  return (
    <Box 
      bg='white'
      cursor={'default'}
      minH="150" 
      shadow="xs" 
      borderRadius='lg' 
      overflow='hidden' 
      display={!imageURL ? 'flex' : 'block'}
      justifyContent={!imageURL ? 'center' : 'none'}  
      alignItems={!imageURL ? 'center' : 'none'}
      borderWidth="0.5px" 
      {...rest}>
      {!imageURL ? null : (
        <Image maxH="150" w="100%" objectFit="cover" src={imageURL} alt="menu" />
      )}
      <Stack 
        pl="4" 
        py="2" 
        h="100%" >
        <Heading fontSize="xl" mt='2'>{title}</Heading>
        <Text fontSize="sm">{desc}</Text>
      </Stack>
    </Box>
  );
}
