import React from 'react';
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

function PriceWrapper({children}) {
  return (
    <Box
      mb={4}
      w="100%"
      shadow="base"
      borderWidth="1px"
      alignSelf={{
        base: 'center', lg: 'flex-start' 
      }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}>
      {children}
    </Box>
  );
}

export default function ThreeTierPricing() {
  return (
    <Box py={12}>
      <VStack spacing={2} mb={8} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Plans that fit your need
        </Heading>
        <Text fontSize="lg" color={'gray.500'}>
          Unlimited edits, 24/7 support, launch in minutes.
        </Text>
      </VStack>
      <Stack
        direction={{
          base: 'column', lg: 'row' 
        }}
        textAlign="center"
        justify="center"
        spacing={{
          base: 4, lg: 10 
        }}
        py={10}
        px={{
          base: 4, md: 8, lg: 10 
        }}>
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Basic
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                $
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                997
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Profile
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Personal Bio
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Company Bio
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Testimonials
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Photo Gallery
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Contact Information
              </ListItem>
            </List>
            <Box w="80%" pt={7} pb={4}>
              <Button w="full" colorScheme="blue" variant="outline">
                Get started
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>

        <PriceWrapper>
          <Box position="relative" z>
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{
                transform: 'translate(-50%)' 
              }}>
              <Text
                textTransform="uppercase"
                bg={'blue.500'}
                px={3}
                py={1}
                color={'white'}
                fontSize="sm"
                fontWeight="600"
                rounded="xl">
                Most Popular
              </Text>
            </Box>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Pro
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  $
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  1,500
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}>
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Everything included in Basic
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Client Logos
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Video Bio
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Press
                </ListItem>
                <ListItem>
                  <HStack justifyContent="left">
                    <Text fontSize="2xl" fontWeight="600">
                  $
                    </Text>
                    <Text fontSize="2xl" fontWeight="900">
                  19.97
                    </Text>
                    <Text fontSize="2xl" color="gray.500">
                  /month
                    </Text>
                  </HStack>
                </ListItem>
              </List>
              <Box w="80%" pt={7} pb={4}>
                <Button w="full" colorScheme="blue">
                  Get started
                </Button>
              </Box>
            </VStack>
          </Box>
        </PriceWrapper>
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Elite
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                $
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                1,799
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Everything included in Basic & Pro
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Video Testimonials
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Services
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Podcast
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Contact From
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Downloadable contacts
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Downloadable PDF mediakit
              </ListItem>
              <ListItem>
                <HStack justifyContent="left">
                  <Text fontSize="2xl" fontWeight="600">
                  $
                  </Text>
                  <Text fontSize="2xl" fontWeight="900">
                  39.97
                  </Text>
                  <Text fontSize="2xl" color="gray.500">
                  /month
                  </Text>
                </HStack>
              </ListItem>
            </List>
            <Box w="80%" pt={7} pb={4}>
              <Button w="full" colorScheme="blue" variant="outline">
                Get started
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>
      </Stack>
    </Box>
  );
}