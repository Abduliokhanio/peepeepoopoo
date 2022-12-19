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
import {updateCart, setOrderTotal, setOrderTax, updateOrderMethod } from '../context/slices/cartSlice';
import Payment from '../tools/payment';
import AppleGooglePay from '../tools/collectjs';
import CustomerDetails from '../components/CustomerDetails';
import PaymentDetailsButton from '../components/PaymentDetailsButton';
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
      console.log(item.modifiers);
      const { error } = await supabasePrivate.from('orders').insert({
        customer_id: user.id,
        room_id: `admin-${merchantStore.urlPath}`,  
        ticket_id: ticketID,
        item: item.item, 
        modifiers: item.modifiers,
        special_request: item.specialRequest,
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
    dispatch(updateOrderMethod(null));
    navigate('/cart/confirmation');
  };
  
  return (
    <Box minH="100vh">
      <Navbar title={orderType} showBackButton={true} />
      <Flex pb="300px" direction="column">
        <Flex
          direction="column"
        >
          <VStack>
            <Box pt="6" bg="white" width="100%" >
              {tableNumber === null ? (
                null
              ) : (
                <Heading pl="6" mb="6" size="md" textAlign="left">Table #{tableNumber}</Heading>
              )}

              <Heading size="md" textAlign={'left'} px="6" mb="5">Your Details</Heading>
              <CustomerDetails />
              
            </Box>
            
            <Box pt={6} bg="white" width="100%">
              <SelectPaymentMethods heading={'Select your payment method'} />
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

            <PaymentDetailsButton 
              isLoading={loadingPayment} 
              tip={tip}
              subTotal={subTotal.toFixed(2)}
              handleOnClick={handlePayment} 
              subTotalWithTax={subTotalWithTax} 
              totalCost={totalCost} 
              buttonLabel={'Pay'} />
          </VStack>

        </Flex>

      </Flex>
     
    </Box>
  );
}
