/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/Auth';
import { supabasePrivate } from '../services/supabasePrivate';
import { useNavigate } from 'react-router-dom';
import {
  Flex, Heading, VStack, Text, Button, Box, Spacer, HStack, Divider, Alert
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import isIOS from '../tools/isIOS';
import {updateCart, setOrderTotal, setOrderTax } from '../context/slices/cartSlice';
import Payment from '../tools/payment';
import AppleGooglePay from '../tools/collectjs';
import {CiEdit} from 'react-icons/ci';
import { Icon } from '@chakra-ui/icons';
import TabIcon from '../components/icons/TabIcon';
import SelectPaymentMethods from '../components/SelectPaymentMethods';
import AddPaymentMethod from '../components/AddPaymentMethod';

export default function OrderConfirmed() {
  const CollectJS = new AppleGooglePay();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const merchantStore = useSelector(state => state.merchant);
  const customerFirstName = useSelector(state => state.customer.firstName);
  const customerLastName = useSelector(state => state.customer.lastName);
  const orderMethod = useSelector(state => state.cart.orderType);

  const payment = new Payment(process.env.REACT_APP_STC_SK);
  const cart = useSelector(state => state.cart.items);
  const orderTax = useSelector(state => state.cart.orderTax);
  const subTotal = cart.reduce((acc, item) => acc + (parseInt(item.item.price) * item.quantity), 0);
  const subTotalWithTax = (subTotal + (subTotal * (orderTax/100))).toFixed(2);
  const tip = useSelector(state => state.cart.tip);
  const totalCost = (parseFloat(subTotalWithTax)+parseFloat(tip)).toFixed(2);
  
  const orderType = useSelector(state => state.cart.orderType);
  const pendingOrders = cart.filter(item => item.status === 'pending');
  const openTabOrders = cart.filter(item => item.status === 'sentToKitchen');
  const merchantURLPath = useSelector(state => state.merchant.urlPath);
  const tableNumber = useSelector(state => state.merchant.tableNumber);

  const [lastFour, setLastFour] = useState(null);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [paymentChoice, setPaymentChoice] = useState(null);
  const [loadingKeepTabOpen, setLoadingKeepTabOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  useEffect(() => {
    configCollectJS();
    setPreviousRecord();
  }, [cart]);

  const prefillFields = (savedData) => {
    if (savedData.card_number !== null) setLastFour(savedData.card_number.toString().slice(-4));
    if (savedData.payment_choice !== null) setPaymentChoice(savedData.payment_choice);
    if (savedData.card_number !== null) setCardNumber(savedData.card_number);
    if (savedData.card_expiry !== null) setCardExpiry(savedData.card_expiry);
    if (savedData.card_cvv !== null) setCardCvv(savedData.card_cvv);
  };

  const configCollectJS = () => {
    if (paymentChoice === 'Apple Pay') CollectJS.configApplePay(order);
    else if (paymentChoice === 'Google Pay') CollectJS.configGooglePay(order);
  };

  const setPreviousRecord = async (e) => {

    const querySavedData = await supabasePrivate
      .from('customers')
      .select('*')
      .eq('id', user.id);

    if (querySavedData.error) throw querySavedData.error;
    if (querySavedData.data.length > 0) prefillFields(querySavedData.data[0]);
  };

  const handleKeepTabOpen = async () => { 
    setLoadingKeepTabOpen(true);
    await sendTicketToKDS();
    await pendingOrders.forEach((order) => {
      dispatch(updateCart({
        ...order, status: 'sentToKitchen'
      }));
    });
    
    navigate(`/${merchantURLPath}`);
    setLoadingKeepTabOpen(false);
  };

  const handlePayment = async () => {
    setLoadingPayment(true);
    
    const ticketID = await sendTicketToKDS();

    dispatch(setOrderTotal(parseFloat(totalCost)));
    dispatch(setOrderTax(8.25));
    
    payment.setCardPayment({
      ccnumber: cardNumber, ccexp: cardExpiry, cvv: cardCvv
    });
    payment.processSale({
      'type': 'sale',
      'amount': totalCost
    }, recordCustomerReciept, ticketID, setLoadingPayment);
  };

  const sendTicketToKDS = async () => {
    const { data , error } = await supabasePrivate.from('tickets').insert({
      customer_id: user.id,
      room_id: `admin-${merchantStore.urlPath}`,
      customer_name: customerFirstName + ' ' + customerLastName,
      order_type: orderType,
      table_number: tableNumber
    }).select();
    console.log(customerFirstName + ' ' + customerLastName, orderType, tableNumber);
    if (error) throw `${error}: Error sending ticket`;
    await sendOrderToKDS(data[0].id);
    return data[0].id;
  };

  const sendOrderToKDS = async (ticketID) => {
    await pendingOrders.forEach(async (item) => {
      const { error } = await supabasePrivate.from('orders').insert({
        customer_id: user.id,
        room_id: `admin-${merchantStore.urlPath}`,  
        ticket_id: ticketID,
        item: item.item, 
        // modifiiers: item.modifiers,
        status: 'sentToKitchen',
        quantity: item.quantity
      });

      if (error) throw `${error}: Error sending order`;
    });
  };

  const recordCustomerReciept = async (ticketID) => {
    const { error } = await supabasePrivate.from('receipts').insert({
      customer_id: user.id,
      ticket_id: ticketID,
      order_type: orderType,
      orders: cart.map(item => ({
        ...item, status: 'paid'
      })),
      merchant_name: merchantStore.brandName,
      table_number: tableNumber,
      sub_total: subTotal,
      tax: orderTax,
      tip: tip,
      total_cost: totalCost
    });

    if (error) throw `${error}: Error recording customer reciept`;
    navigate('/cart/confirmation');
  };
  
  return (
    <Box bg="#f6f6f6" minH="100vh">
      <Navbar title={'Checkout'} showBackButton={true} />
      <Flex pt={5} pb="300px" direction="column">
        <Flex
          direction="column"
        >
          <VStack px="6" mt="4">
            <Box bg="white" borderWidth="1px" width="100%" pt="6">
              {tableNumber === null ? (
                <Heading pl="6" mb="6" size="md" textAlign="left">{orderType}</Heading>
              ) : (
                <Heading pl="6" mb="6" size="md" textAlign="left">Table #{tableNumber}</Heading>
              )}
              {cart.map((item, index) => {
                return(
                  <Flex 
                    mb="6"
                    key={index}
                    px="6">
                    <Box backgroundColor={'gray.100'} borderRadius="2" mr="4" px="3.5" maxH="35px" py="1">
                      <Text textAlign="left" fontSize="lg">{item.quantity}</Text>
                    </Box>
                    <Text fontWeight='bold' textAlign='left' fontSize={'1.25rem'}>{item.item.name}</Text>
                  </Flex>
                );}
              )}
              <VStack
                mt="8"
                spacing={2}
                align="stretch"
                px="6">
                <Flex>
                  <Text>Subtotal</Text>
                  <Spacer />
                  <Text>${subTotal.toFixed(2)}</Text>
                </Flex> 
                <Flex>
                  <Text>Tax</Text>
                  <Spacer />
                  <Flex alignItems='center'>
                    <Text mr="2" fontSize={'12'} color='gray.700'>(8.25%)</Text>
                    <Text pr="1">${(subTotalWithTax-subTotal).toFixed(2)}</Text>
                  </Flex>
                </Flex>
                <Flex onClick={() => navigate('/cart/tip')}>
                  <Text>Tip</Text>
                  <Spacer />
                  <Icon mr="2" h="6" w="6" as={CiEdit} />
                  <Text>${tip}</Text>
                </Flex>
                <Divider py="2" borderColor='gray.300'/>
                <Flex pb="4" pt="2">
                  <Text fontSize={'2rems'} fontWeight={'bold'}>Total</Text>
                  <Spacer />
                  <Text fontSize={'2rems'} fontWeight={'bold'}>${totalCost}</Text>
                </Flex>
               
              </VStack>
              
            </Box>
            
            <Box bg="white" borderWidth="1px" width="100%" pt="6">
              <SelectPaymentMethods  heading={'Select your payment method'} />
              <AddPaymentMethod />
              {isIOS() ? null : (
                <Box px="6" mt={3} mb={openTabOrders.length > 0 || orderMethod === 'Pickup' ? '6' : '3'}>
                  <Alert py={4} px={6} status='warning'>
                    <Text color="orange.600">Looking for Apple Pay? Swith to Safari</Text>
                  </Alert>
                </Box>
              )}
              
              {openTabOrders.length === 0 && orderMethod === 'Dine-in' ? (
                <Flex
                  onClick={() => handleKeepTabOpen()} 
                  pb="6"
                  px="6"
                  justifyContent="space-between">
                  <HStack spacing="4" p="4" >
                    <TabIcon />
                    <Text fontSize="xl">Start a tab</Text>
                  </HStack>
                </Flex>
              ) : null}
            </Box>

            {openTabOrders.length > 0 && orderMethod === 'Dine-in' ? (
              <Box 
                px="6"
                w="100%">
                <Button 
                  mt="6"
                  onClick={() => handleKeepTabOpen()} 
                  w="100%" 
                  py="8"
                  size="lg"
                  variant={'outline'}
                  borderColor="black">
                  <TabIcon />
                  <Text ml="4">Keep tab open</Text>
                </Button>
              </Box>   
            ) : null}
        
            <VStack
              pos="fixed"
              bottom="0" 
              w="100%"
              px="6"
              bg="white"
              py="4" 
              blur="40%" 
              spacing={4}
              align="stretch">
              {paymentChoice === 'Apple Pay' ? (
                <Button id="applePayButton" py="8" disabled={loadingKeepTabOpen} isLoading={loadingPayment} onClick={() => handlePayment()} w="100%" size="lg" color="white" bg="black" borderColor="black">Pay Now | Apple Pay</Button>
              ) :
                paymentChoice === 'Google Pay' ? (
                  <Button id="googlePayButton" py="8" disabled={loadingKeepTabOpen} isLoading={loadingPayment} onClick={() => handlePayment()} w="100%" size="lg" color="white" bg="black" borderColor="black">Pay Now  | Google Pay</Button>
                ) : (
                  <Button id="customPayButton" py="8" disabled={loadingKeepTabOpen} isLoading={loadingPayment} onClick={() => handlePayment()} w="100%" size="lg" color="white" bg="black" borderColor="black">Pay Now </Button>
                ) }
            </VStack>
          </VStack>

        </Flex>

      </Flex>
     
    </Box>
  );
}
