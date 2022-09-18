import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex, Spacer, Heading, Box,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import MenuDrawer from './MenuDrawer';

function navButton(nav) {
  const navigate = useNavigate();
  if (nav !== 'menu') {
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

export default function NavBar({ title, navType }) {
  return (
    <nav>
      <Flex px="6" h="20" alignItems="center">
        {navButton(navType)}
        <Spacer />
        <Heading fontSize="xl">{title}</Heading>
        <Spacer />
      </Flex>
    </nav>
  );
}
