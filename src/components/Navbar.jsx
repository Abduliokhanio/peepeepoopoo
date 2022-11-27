import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex, Spacer, Heading, Box, extendTheme
} from '@chakra-ui/react';
import { ChevronLeftIcon, Icon } from '@chakra-ui/icons';
import { CiShoppingCart } from 'react-icons/ci';
import { CiUser } from 'react-icons/ci';

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
      <Box onClick={() => navigate('/user/account')}>
        <Icon color="gray.400" mt="1.5" h="7" w="7" as={CiUser} />
      </Box>
    );
  };

  const rightNavButton = (showAccountButton) => {
    if (showAccountButton) {
      return (
        <Box onClick={() => navigate('/cart/opened-tab')}>
          <Icon color="gray.400" mt="1.5" h="8" w="8" as={CiShoppingCart} />
        </Box>
      );
    }
    return (
      null
    );
  };

  return (
    <Box 
      w="100%" 
      top="0" 
      position="sticky" 
      zIndex={10}
      backdropFilter="blur(5px)"
      borderBottom='1px solid rgba(255, 255, 255, 0.1)'
      bg='black'
    >
      <Flex px="6" h="16" alignItems="center">
        {navButton(showBackButton)}
        <Spacer />
        <Heading 
          color="#dadada" 
          fontSize="lg">{title}</Heading>
        <Spacer />
        {rightNavButton(showAccountButton)}
      </Flex>
    </Box>
  );
}
