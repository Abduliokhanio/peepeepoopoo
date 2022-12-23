import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heading,
  Box, 
  Flex, 
  HStack, 
  Text, 
  FormHelperText,
  Input,
  FormControl,
  Image
} from '@chakra-ui/react';
import { Icon, ChevronRightIcon } from '@chakra-ui/icons';
import { MdPayment } from 'react-icons/md';
import blueCreditCard from '../assets/blue-credit-card.png';

export default function AddPaymentMethod({ heading }) {
  const navigate = useNavigate();

  const [addCardSelected, setAddCardSelected] = useState(false);

  const [cardInputFocus, setCardInputFocus] = useState('');
  const [cardInfo, setCardInfo] = useState({
    cvv: '', expiry: '', name: '', number: ''
  });
  const [isCardNumberError, setIsCardNumberError] = useState(false);
  const [isCardNameError, setIsCardNameError] = useState(false);
  const [isCardExpiryError, setIsCardExpiryError] = useState(false);
  const [isCardCvvError, setIsCardCvvError] = useState(false);

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    
    setCardInfo({
      ...cardInfo, [name]: value 
    });
  };

  const addCardView = () => {
    return (   <HStack 
      borderColor={'gray.200'}
      borderWidth="1px"
      borderRadius="md"
      spacing="4" 
      px="4"
      py={2}
    >
      <Icon h="8" w="8" as={MdPayment} />
      <Flex>
        <FormControl isInvalid={isCardNumberError} w="65%">
          <Input 
            border="none"
            value={cardInfo.number}
            onChange={handleCardInputChange} 
            name="number" 
            onFocus={(e) => setCardInputFocus(e.target.name)} 
            placeholder='Card number' 
            size='md' width="100%" />
          {isCardNumberError ? (
            <FormHelperText color="red.500">
                Please enter 16 digits
            </FormHelperText>
          ) : null}
        </FormControl>
        <FormControl isInvalid={isCardExpiryError} w="20%">
          <Input 
            border="none"
            value={cardInfo.expiry} 
            name={'expiry'} 
            onChange={handleCardInputChange} 
            onFocus={(e) => setCardInputFocus(e.target.name)}
            placeholder='MM/YY' size='md' width="100%" />
          {isCardExpiryError ? (
            <FormHelperText color="red.500">
                Please enter date in format MMYY
            </FormHelperText>
          ) : null}
        </FormControl>
        <FormControl isInvalid={isCardCvvError} w="15%">
          <Input 
            border="none"
            value={cardInfo.cvv} 
            name={'cvv'} 
            onChange={handleCardInputChange} 
            onFocus={(e) => setCardInputFocus(e.target.name)}
            placeholder='CVC' size='md' width="100%" />
          {isCardCvvError ? (
            <FormHelperText color="red.500">
                Please enter 3 digits
            </FormHelperText>
          ) : null}
        </FormControl>
      </Flex>
    </HStack>);
  };
  
  return (
    <Box px="6" onClick={() => setAddCardSelected(!addCardSelected)}>
      {heading ? (
        <Heading size="md" textAlign={'left'} mt="6">{heading}</Heading>
      ) : null}
      
      <Flex
        onClick={() => navigate('/user/new-card')} 
        justifyContent="space-between"
        alignItems={'center'}>
        <HStack spacing="4" p="4" >
          <Image maxW="40px" borderRadius={4} src={blueCreditCard} />
          <Text fontSize="xl">Credit/Debit Card</Text>
        </HStack>
        <ChevronRightIcon />
      </Flex>
    </Box>
  );
}
 