import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import {
  Heading, Image, useToast, Text, FormControl, Flex, Stack, InputLeftElement, InputGroup, Box, Input, InputRightElement, Button
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import logo from '../assets/logo-d.png';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { loginIn } = useAuth();

  supabase.auth.onAuthStateChange((event) => {
    if (event == 'SIGNED_IN') {
      navigate('/');
      setLoading(false);
    }
  });

  const handleClick = () => setShowPassword(!show);
  const handleRedirect = () => {
    navigate('/signup');
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await loginIn({ email: email, password: password });

    if (error) {
      if (error.message == 'Failed to fetch') {
        toast({
          title: 'No user found with that email',
          status: 'error',
          isClosable: true,
          position: 'top'
        });
      } else {
        toast({
          title: `${error.message}`,
          status: 'error',
          isClosable: true,
          position: 'top'
        });
      }
    } else {
      toast({
        title: 'Logged in successfully',
        status: 'success',
        isClosable: true,
        position: 'top'
      });
    }
  }

  return (
    <Flex backgroundColor="#F9FBFC;" direction="column" minH="100vh" h="100%">
      <Flex mt="24" mb="8" px="6" h="20" alignItems="center" justifyContent="center">
        <Image maxW="250" objectFit="contain" src={logo} />
      </Flex>
      <Flex direction="column" alignItems="center" >
        <Box bg="white" minW="511px" maxW='lg' px="12" py="12" borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Flex direction="column" mb="14">
            <Heading size='lg' mb="4">
              Hey there, welcome back!
            </Heading>
            <Text fontSize='lg'>Sign in to continue</Text>
          </Flex>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Stack spacing={4}>
                <InputGroup>
                  <InputLeftElement
                    h="100%"
                    pointerEvents='none'
                    fontSize='1.2em'
                    children={<EmailIcon color='gray.300' />}
                  />
                  <Input
                    id="email"
                    className="inputField"
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter Email'
                    size="lg"
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement
                    h="100%"
                    pointerEvents='none'
                    color='gray.300'
                    fontSize='1.2em'
                    children={<LockIcon color='gray.300' />}
                  />
                  <Input
                    id="password"
                    type={show ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter Password'
                    size="lg"
                  />
                  <InputRightElement h="100%" width='4.5rem'>
                    <Button size='md' mr="1" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Stack>
              <Button
                isLoading={loading}
                type="submit"
                spinnerPlacement='start'
                colorScheme='teal'
                w='full'
                mt="8"
                size='lg'
              >
                Sign in
              </Button>
              <Button onClick={handleRedirect} isLoading={loading} colorScheme='teal' size="md" variant='link' mt="8">Create Account</Button>
            </FormControl>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
}
