/* eslint-disable no-undef */
import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';
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

  invokeFunction = async (requestOptions, recordCustomerReciept, ticketID, setLoadingPayment) => {
    requestOptions.security_key = this.security_key;

    const requestJson = {
      url: `https://sharingthecredit.transactiongateway.com/api/transact.php${jsonToQueryString(requestOptions)}`,
      method: 'POST',
    };

    const { data, error } = await supabasePublic.functions.invoke('make-payment', {
      body: JSON.stringify(requestJson),
    });

    if (error) {
      Sentry.captureException(error);
      Sentry.captureMessage('Error making payment');
      throw `${error}: Error making payment`;
    }

    const jsonQuery = queryStringToJSON(data);
    if (jsonQuery.responsetext === 'SUCCESS') {
      await recordCustomerReciept(ticketID);
      return;
    }
    setLoadingPayment(false);
  };

}

export default Payment;
