import React from 'react';
import {
  Box, Text, Heading, Stack, Flex, Image
} from '@chakra-ui/react';

export default function ProductItem({
  title, desc, price, qty, page, imageURL, ...rest
}) {

  return (
    <Box shadow="xs" bg="white" borderRadius='lg' overflow='hidden' borderWidth="0.5px" {...rest}>
      <Flex h="150" direction="row">
        {imageURL !== null ? (
          <Image h="150" maxW="200" objectFit="cover" src={imageURL} alt="menu" />
        ) : null}
        <Flex p='4' direction='column' justifyContent="space-between">
          <Stack w="100%" textAlign="left">
            <Heading fontSize="xl">{title}</Heading>
            <Text fontSize="sm">{desc}</Text>
          </Stack>
          <Text mb="2" w="100%" textAlign="left" fontSize="lg">${price}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
