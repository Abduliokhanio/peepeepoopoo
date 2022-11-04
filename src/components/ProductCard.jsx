import React from 'react';
import {
  Box, Text, Heading, Stack, Flex, Image
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

const imageURL = 'https://omnivorescookbook.com/wp-content/uploads/2020/03/1912_Leftover-Ham-Banh-Mi_550.jpg';

export default function MenuItem({
  title, desc, price, qty, page, ...rest
}) {
  return (
    <Box shadow="xs" bg="white" borderRadius='lg' overflow='hidden' borderWidth="0.5px" {...rest}>
      <Flex direction="row" justifyContent="space-between">
        <Image maxH="150" h="100%" objectFit="cover" src={imageURL} alt="menu" />
        <Stack pl="4" py="2" w="100%" textAlign="left">
          <Heading fontSize="xl" mt='2'>{title}</Heading>
          <Text fontSize="sm">{desc}</Text>
        </Stack>
      </Flex>
    </Box>
  );
}