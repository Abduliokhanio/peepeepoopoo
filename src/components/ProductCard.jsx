import React from 'react';
import {
  Box, Text, Heading, Stack, Flex, Image, IconButton, Icon
} from '@chakra-ui/react';
import { BsHeart } from 'react-icons/bs';

export default function ProductItem({title, desc, price, qty, page, imageURL, ...rest}) 
{

  const priceLength = () => {
  
    let splitPrice = price.toString().split('.');
    if (splitPrice === undefined) return price;
    try {
      if (splitPrice[1].length === 1) return `${splitPrice[0]}.${splitPrice[1]}0`;
    } catch (error) {
      return price;
    }
    
    return `${splitPrice[0]}.${splitPrice[1]}`;
  };

  return (
    <Box
      shadow="xs" 
      backgroundColor={'white'}
      borderRadius='lg' overflow='hidden' borderWidth="0.5px" {...rest}>
      <Flex h="125" direction="row">
        {imageURL !== null ? (
          <Image h="100%" maxW="125" objectFit="cover" src={imageURL} alt="menu" />
        ) : null}
        <Flex ml="4" my="1" direction='column' justifyContent="space-around">
          <Stack w="100%" textAlign="left">
            <Heading fontSize="xl">{title}</Heading>
            <Text fontSize="sm">{desc}</Text>
          </Stack>
          <Flex direction={'row'} alignItems={'center'}>
            <Text w="100%" textAlign="left" fontSize="lg">${priceLength()}</Text>
            <IconButton
              bg="transparent"
              icon={<Icon color="gray.500" h="5" w="5" as={BsHeart} />}
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
