/* eslint-disable no-undef */
import React, { Component, useState } from 'react';
import jsonToQueryString from '../tools/jsonToQueryString';
import queryStringToJSON from '../tools/queryStringToJSON';

class Payment extends Component {

  constructor(security_key) {
    super(security_key);
    this.security_key = security_key;
  }

  processSale = (saleParams, dispatch, clearCart, navigate) => {
    // Object.assign(saleParams, this.security_key, this.card, this.billing, this.shipping);
    const requestOptions = Object.assign(saleParams, this.card);
    this.paymentRequest(requestOptions, dispatch, clearCart, navigate);
  };

  setCardPayment = (cardInfo) => this.card = cardInfo;
  setBilling = (billingInfo) => this.billing = billingInfo;
  setShipping = (shippingInfo) => this.shipping = shippingInfo;

  paymentRequest = (requestOptions, dispatch, clearCart, navigate) => {
    console.log('security_key', this.security_key);
    requestOptions.security_key = this.security_key;
    console.log('requestOptions', requestOptions);
    console.log('query', jsonToQueryString(requestOptions));
    fetch(`https://cors-anywhere.herokuapp.com/https://sharingthecredit.transactiongateway.com/api/transact.php${jsonToQueryString(requestOptions)}`, {
      method: 'POST'
    })
      .then(response => {
        response.text().then(async (query) => {
          const jsonQuery = queryStringToJSON(query);

          if (jsonQuery.responsetext === 'SUCCESS') {
            dispatch(clearCart());
            navigate('/cart/closed-tab');
            return;
          }

          console.log('100: ', jsonQuery);
          throw `${jsonQuery.responsetext}: Error making payment`;
        });
      });
  };
}

export default Payment;
