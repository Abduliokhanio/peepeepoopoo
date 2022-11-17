import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex, Spacer, Heading, Box, extendTheme
} from '@chakra-ui/react';
import { ChevronLeftIcon, Icon } from '@chakra-ui/icons';
import { MdOutlineAccountCircle } from 'react-icons/md';
import MenuDrawer from './MenuDrawer';

export default function NavBar({ title, showBackButton, showLeftButton, showAccountButton }) {
  const navigate = useNavigate();

  const navButton = (showBackButton) => {
    if (showBackButton) {
      return (
        <Box onClick={() => navigate(-1)}>
          <ChevronLeftIcon color={'white'} h="7" w="7"/>
        </Box>
      );
    } else if (showLeftButton === false) {
      return null;
    }
    return (
      <MenuDrawer />
    );
  };

  const rightNavButton = (showAccountButton) => {
    if (showAccountButton) {
      return (
        <Box onClick={() => navigate('/user/account')}>
          <Icon color="white" mt="1.5" h="8" w="8" as={MdOutlineAccountCircle} />
        </Box>
      );
    }
    return (
      null
    );
  };

  return (
    <Box w="100%" top="0" position="sticky" zIndex={10} >
      <Flex px="6" h="16" alignItems="center" bg={'black'}>
        {navButton(showBackButton)}
        <Spacer />
        <Heading color="white" fontSize="lg">{title}</Heading>
        <Spacer />
        {rightNavButton(showAccountButton)}
      </Flex>
    </Box>
  );
}
