import React from 'react';
import {
  Box, Text, Heading, Stack, HStack, Image
} from '@chakra-ui/react';

export default function MenuItem({
  title, desc, price, qty, page, imageURL, ...rest
}) {

  return (
    <Box minH="150" shadow="xs" bg="white" borderRadius='lg' overflow='hidden' borderWidth="0.5px" {...rest}>
      {!imageURL ? null : (
        <Image maxH="150" w="100%" objectFit="cover" src={imageURL} alt="menu" />
      )}
      <Stack pl="4" py="2" textAlign="left">
        <Heading fontSize="xl" mt='2'>{title}</Heading>
        <Text fontSize="sm">{desc}</Text>
      </Stack>
    </Box>
  );
}
