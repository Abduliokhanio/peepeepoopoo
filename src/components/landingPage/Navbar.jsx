import React from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  Image,
  useDisclosure,
  Container
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Container maxW={'7xl'}>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{
          base: 6 
        }}
        px={{
          base: 4 
        }}
        align={'center'}>
        <Flex
          flex={{
            base: 1, md: 'auto' 
          }}
          ml={{
            base: -2 
          }}
          display={{
            base: 'flex', md: 'none' 
          }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{
          base: 1 
        }} justify={{
          base: 'center', md: 'start' 
        }}>
          <Image maxW="75" objectFit="contain" src={'#'} />

          <Flex display={{
            base: 'none', md: 'flex' 
          }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{
            base: 1, md: 0 
          }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button
            display={{
              base: 'none', md: 'inline-flex' 
            }}
            as={'a'}
            color={useColorModeValue('gray.600', 'gray.200')}
            fontSize={'sm'}
            fontWeight={600}
            variant={'link'}
            href={'/login'}>
            Login
          </Button>
          <Button
            as={'a'}
            rounded={'full'}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            colorScheme={'blue'}
            bg={'blue.400'}
            href={'/signup'}>
            Sign Up
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Container>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{
        md: 'none' 
      }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <Flex direction={'column'}>
        <Button
          as={'a'}
          mb='4'
          mt="2"
          color={useColorModeValue('gray.600', 'gray.200')}
          fontSize={'sm'}
          fontWeight={600}
          variant={'link'}
          href={'/login'}>
            Login
        </Button>
        <Button
          as={'a'}
          rounded={'full'}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          colorScheme={'blue'}
          bg={'blue.400'}
          href={'/signup'}
        >
            Sign Up
        </Button>
      </Flex>
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          w='100%'
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: 'Features',
    href: '#features',
  },
  {
    label: 'Pricing',
    href: '#pricing',
  },
];