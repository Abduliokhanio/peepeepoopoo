import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  Box,
  HStack,
  Icon,
  VStack
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import React from 'react';

export default function FeatureLeft({ heading, subheading, image, features}) {
  return (
    <Container maxW={'5xl'} py={12}>
      <Box py={50}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4} textAlign="left">
            <Heading>{heading}</Heading>
            <Text pb="1rem" color={'gray.500'} fontSize={'lg'}>
              {subheading}
            </Text>
            <VStack w="100%" alignItems={'left'} spacing={4}>
              {features.map((feature, index) => (
                <HStack align={'top'} key={index}>
                  <Box color={'green.400'} px={2}>
                    <Icon as={CheckIcon} />
                  </Box>
                  <VStack align={'start'}>
                    <Text>{feature}</Text>
                  </VStack>
                </HStack>
              ))}
            </VStack>
          </Stack>
          <Flex>
            <Image
              rounded={'md'}
              alt={'feature image'}
              src={image}
              w="100%"
              h="100%"
              objectFit={'cover'}
            />
          </Flex>
        </SimpleGrid>
      </Box>
    </Container>
  );
}