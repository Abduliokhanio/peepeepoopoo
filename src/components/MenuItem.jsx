import React from 'react';
import {
  Box, Text, Heading, Stack, HStack,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

function showEditIcon(page) {
  if (page === 'checkout') {
    return (
      <EditIcon />
    );
  }
  return null;
}

export default function MenuItem({
  title, desc, price, qty, page, ...rest
}) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Stack direction="row">
        <Text mr="3" mt="0.5">{qty}</Text>
        <Stack>
          <HStack>
            <Heading fontSize="xl">{title}</Heading>
            {showEditIcon(page)}
          </HStack>
          <Text mt={4}>{desc}</Text>
          <Text mt={4}>{price}</Text>
        </Stack>
      </Stack>
    </Box>
  );
}
