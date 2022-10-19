/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import {
  Text
} from '@chakra-ui/react';

export default function PostPayment() {
  const Skey = process.env.REACT_APP_STC_SK;
  const [response, setResponse] = useState('none');
  const [resData, setResData] = useState('none');

  useEffect(() => {
    postPayment();
  }, [false]);

  const data = {
    'type': 'sale',
    'amount': 100.00,
    'ccnumber': 4111111111111111,
    'ccexp': 1025,
    'cvv': 999,
    'first_name': 'Test',
    'last_name': 'User',
    'address1': '888 Main St',
    'city': 'New York',
    'state': 'NY',
    'zip' : '77777',
    'shipping_first_name': 'User',
    'shipping_last_name': 'Test',
    'shipping_address1': '987 State St',
    'shipping_city': 'Los Angeles',
    'shipping_state': 'CA',
    'shipping_zip' : '98765',
    'sercurity_key': Skey
  };

  const postPayment = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Content-Length': data.length
      },
      body: data
    };

    fetch('https://sharingthecredit.transactiongateway.com/api/transact.php', requestOptions)
      .then(response => {
        console.log(response);
        setResponse(JSON.stringify(response));
      })
      .then((data, err) => {
        console.log(data);
        console.log(err);
        setResData(resData);
      });   
  };

  return(
    <>
      <Text>response: {response}</Text>
      <Text>data: {resData}</Text>
    </>
  );

}

