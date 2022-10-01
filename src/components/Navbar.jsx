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

export default function NavBar({ title, showBackButton }) {
  return (
    <nav>
      <Flex px="6" h="20" alignItems="center">
        {navButton(showBackButton)}
        <Spacer />
        <Heading fontSize="sm">{title}</Heading>
        <Spacer />
      </Flex>
    </nav>
  );
}
