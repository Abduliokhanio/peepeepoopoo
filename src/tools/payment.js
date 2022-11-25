/* eslint-disable no-undef */
import React, { Component } from 'react';
import jsonToQueryString from '../tools/jsonToQueryString';
import queryStringToJSON from '../tools/queryStringToJSON';

class Payment extends Component {

  constructor(security_key) {
    super(security_key);
    this.security_key = security_key;
  }

  processSale = (saleParams, recordCustomerReciept, ticketID) => {
    const requestOptions = Object.assign(saleParams, this.card);
    this.paymentRequest(requestOptions, recordCustomerReciept, ticketID);
  };

  setCardPayment = (cardInfo) => this.card = cardInfo;
  setBilling = (billingInfo) => this.billing = billingInfo;
  setShipping = (shippingInfo) => this.shipping = shippingInfo;

  paymentRequest = (requestOptions, recordCustomerReciept, ticketID) => {
    requestOptions.security_key = this.security_key;
    console.log('query', jsonToQueryString(requestOptions));

    fetch(`https://cors-anywhere.herokuapp.com/https://sharingthecredit.transactiongateway.com/api/transact.php${jsonToQueryString(requestOptions)}`, {
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

}

export default Payment;
