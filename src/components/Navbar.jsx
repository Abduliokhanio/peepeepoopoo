import React from 'react';
import '@fontsource/knewave';
import { useNavigate } from 'react-router-dom';
import {
  Flex, Spacer, Heading, Box, Icon, Image
} from '@chakra-ui/react';
import TabIcon from './icons/TabIcon';
import { useSelector } from 'react-redux';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { CiUser } from 'react-icons/ci';
import logo from '../assets/logo-horizontal-w.svg';

export default function NavBar({ title, showBackButton, showLeftButton, showTabButton }) {
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart.items);
  const openTabOrders = cart.filter(item => item.status === 'sentToKitchen');

  const navButton = () => {
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

  const rightNavButton = () => {
    if (showTabButton) {
      return (
        <Box onClick={() => navigate('/cart/manage-tab')}>
          <TabIcon />
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
        {title === 'OrderAhead' ? (
          <Image src={logo} maxW="125px" />
        ) : (
          <Heading 
            pt="2"
            color="#dadada" 
            letterSpacing={'1px'}
            fontSize="1.5em">{title}</Heading>
        )}
        <Spacer />
        {openTabOrders.length > 0 ? (
          rightNavButton(showTabButton)
        ) : null}
      </Flex>
    </Box>
  );
}
