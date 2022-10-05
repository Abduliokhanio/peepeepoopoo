import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex, Spacer, Heading, Box,
} from '@chakra-ui/react';
import { ChevronLeftIcon, Icon } from '@chakra-ui/icons';
import { MdOutlineAccountCircle } from 'react-icons/md';
import MenuDrawer from './MenuDrawer';

export default function NavBar({ title, showBackButton, brandColor, showAccountButton }) {
  const navigate = useNavigate();

  const navButton = (showBackButton) => {
    if (showBackButton) {
      return (
        <Box onClick={() => navigate(-1)}>
          <ChevronLeftIcon h="5" w="5"/>
        </Box>
      );
    }
    return (
      <MenuDrawer />
    );
  };

  const rightNavButton = (showAccountButton) => {
    if (showAccountButton) {
      return (
        <Box onClick={() => navigate('account')}>
          <Icon mt="1.5" h="8" w="8" as={MdOutlineAccountCircle} />
        </Box>
      );
    }
    return (
      null
    );
  };

  return (
    <nav>
      <Flex px="6" h="16" alignItems="center" bg={brandColor}>
        {navButton(showBackButton)}
        <Spacer />
        <Heading fontSize="lg">{title}</Heading>
        <Spacer />
        {rightNavButton(showAccountButton)}
      </Flex>
    </nav>
  );
}
