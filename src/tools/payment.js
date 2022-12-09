/* eslint-disable no-undef */
import React, { Component } from 'react';
import { supabasePublic } from '../services/supabasePublic';
import jsonToQueryString from '../tools/jsonToQueryString';
import queryStringToJSON from '../tools/queryStringToJSON';

class Payment extends Component {

  constructor(security_key) {
    super(security_key);
    this.security_key = security_key;
  }

  processSale = (saleParams, recordCustomerReciept, ticketID, setLoadingPayment) => {
    const requestOptions = Object.assign(saleParams, this.card);
    // this.paymentRequest(requestOptions, recordCustomerReciept, ticketID);
    this.invokeFunction(requestOptions, recordCustomerReciept, ticketID, setLoadingPayment);
  };

  setCardPayment = (cardInfo) => this.card = cardInfo;
  setBilling = (billingInfo) => this.billing = billingInfo;
  setShipping = (shippingInfo) => this.shipping = shippingInfo;

  paymentRequest = (requestOptions, recordCustomerReciept, ticketID) => {
    requestOptions.security_key = this.security_key;
    console.log('query', jsonToQueryString(requestOptions));

    fetch(`https://sharingthecredit.transactiongateway.com/api/transact.php${jsonToQueryString(requestOptions)}`, {
      method: 'POST'
    })
      .then(response => {
        response.text().then(async (query) => {
          const jsonQuery = queryStringToJSON(query);

          if (jsonQuery.responsetext === 'SUCCESS') {
            console.log('Payment successful: ', jsonQuery);
            await recordCustomerReciept(ticketID);
            return;
          }

          console.log('jsonQuery: ', jsonQuery);
          throw `${jsonQuery.responsetext}: Error making payment`;
        });
      });
  };

  invokeFunction = async (requestOptions, recordCustomerReciept, ticketID, setLoadingPayment) => {
    requestOptions.security_key = this.security_key;

    // setResponseJson({
    //   loading: true
    // });

    const requestJson = {
      url: `https://sharingthecredit.transactiongateway.com/api/transact.php${jsonToQueryString(requestOptions)}`,
      method: 'POST',
    };

    const { data, error } = await supabasePublic.functions.invoke('payment', {
      body: JSON.stringify(requestJson),
    });

    if (error) alert('Error making payment');

    const jsonQuery = queryStringToJSON(data);
    console.log('from edge jsonQuery: ', jsonQuery);
    if (jsonQuery.responsetext === 'SUCCESS') {
      console.log('Payment successful: ', jsonQuery);
      await recordCustomerReciept(ticketID);
      return;
    }
    console.log('edge data', data);
    setLoadingPayment(false);
  };

}

export default Payment;
