import React from 'react';
import {
  Box, Text, Heading, Stack, HStack, Image
} from '@chakra-ui/react';

const imageURL = 'https://omnivorescookbook.com/wp-content/uploads/2020/03/1912_Leftover-Ham-Banh-Mi_550.jpg';

export default function MenuItem({
  title, desc, price, qty, page, ...rest
}) {

  return (
    <Box shadow="xs" bg="white" borderRadius='lg' overflow='hidden' borderWidth="0.5px" {...rest}>
      <Image maxH="150" w="100%" objectFit="cover" src={imageURL} alt="menu" />
      <Stack pl="4" py="2" textAlign="left">
        <Heading fontSize="xl" mt='2'>{title}</Heading>
        <Text fontSize="sm">{desc}</Text>
      </Stack>
    </Box>
  );
}
