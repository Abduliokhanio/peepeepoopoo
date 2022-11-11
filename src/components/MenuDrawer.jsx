import React from 'react';
import { Link as ReachLink } from 'react-router-dom';
import {
  VStack, Box, useDisclosure, Link, Text, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, Image, DrawerBody, DrawerFooter, Center,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

export default function MenuDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box onClick={onOpen}>
        <HamburgerIcon color="white" mb="0.5" h="6" w="6"/>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent pb="4" pt="16">
          <DrawerCloseButton />
          <Center>
            <Box pb="8">
              <Image boxSize="150px" src="https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_100,q_80,fl_lossy,dpr_2.0,c_fit,f_auto,h_100/vfyavti06gzv9mlsl2ra" />
            </Box>
          </Center>

          <DrawerBody>
            <VStack
              align="left"
              spacing={4}
            >
              <Text fontSize="sm">Vietnamese Food</Text>
              <Text fontSize="sm">Hours</Text>
              <Text fontSize="sm">1635 E Broadway St suite #125, Pearland, TX 77581</Text>
              <Text fontSize="sm">+1 281-612-2623</Text>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
