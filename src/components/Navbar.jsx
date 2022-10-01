import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex, Spacer, Heading, Box,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import MenuDrawer from './MenuDrawer';

function navButton(showBackButton) {
  const navigate = useNavigate();
  if (showBackButton) {
    return (
      <Box onClick={() => navigate(-1)}>
        <ChevronLeftIcon />
      </Box>
    );
  }
  return (
    <MenuDrawer />
  );
}

export default function NavBar({ title, showBackButton, brandColor }) {
  return (
    <nav>
      <Flex px="6" h="16" alignItems="center" bg={brandColor}>
        {navButton(showBackButton)}
        <Spacer />
        <Heading fontSize="lg">{title}</Heading>
        <Spacer />
      </Flex>
    </nav>
  );
}
