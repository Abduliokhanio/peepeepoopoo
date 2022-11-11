import React from 'react';
import {
  Box, Text, Heading, Stack, Flex, Image, HStack, Button, useNumberInput, Input
} from '@chakra-ui/react';

export default function CartItemCard({
  item
}) {

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 0,
      max: 99,
      precision: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Box shadow="xs" bg="white" borderRadius='lg' overflow='hidden' borderWidth="0.5px">
      <Flex h="150" px="8" direction="row" justifyContent={'space-between'}>
        {!item.image_url ? null : (
          <Image h="150" maxW="200" objectFit="cover" src={item.image_url} alt="menu" />
        )}
        <Flex py='4' direction='column' justifyContent="space-between">
          <Stack w="100%s" textAlign="left">
            <Heading fontSize="xl" mt='2'>{item.name}</Heading>
            <Text fontSize="sm">{item.desc}</Text>
          </Stack>
          <Text mb="2" w="100%" textAlign="left" fontSize="lg">${item.price}</Text>
        </Flex>
        <HStack maxW='150px'>
          <Button color={'black'} size={'sm'} variant='outline' borderColor={'black'} borderWidth={'1px'} {...inc}>+</Button>
          <Input color="black" variant='unstyled' fontSize="1.5rem" textAlign={'center'} maxW="100%" {...input} />
          <Button color={'black'} size={'sm'} variant='outline' borderColor={'black'} {...dec}>-</Button>
        </HStack>
      </Flex>
    </Box>
  );
}
