/* eslint-disable no-undef */
import React, { Component } from 'react';
import { supabasePrivate } from '../services/supabasePrivate';
import jsonToQueryString from '../tools/jsonToQueryString';
import queryStringToJSON from '../tools/queryStringToJSON';
import { useNavigate } from 'react-router-dom';

class Payment extends Component {

  constructor(security_key) {
    super(security_key);
    this.security_key = security_key;
  }

  processSale = (saleParams, navigate) => {
    // Object.assign(saleParams, this.security_key, this.card, this.billing, this.shipping);
    const requestOptions = Object.assign(saleParams, this.card);
    this.paymentRequest(requestOptions, navigate);
  };

  setCardPayment = (cardInfo) => this.card = cardInfo;
  setBilling = (billingInfo) => this.billing = billingInfo;
  setShipping = (shippingInfo) => this.shipping = shippingInfo;

  paymentRequest = (requestOptions, navigate) => {
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
            console.log('Payment successful: ', jsonQuery);
            navigate('/cart/closed-tab');
            return;
          }

          console.log('jsonQuery: ', jsonQuery);
          throw `${jsonQuery.responsetext}: Error making payment`;
        });
      });
  };

  recordOrder = async (reciept, tableNumber, merchant, user, dispatch, clearCart, totalCost, tax) => {
    if (tableNumber === undefined) tableNumber = null;
    console.log('reciept: ', reciept);
    const recordRes = await supabasePrivate.from('past_orders').insert({
      customer_id: user.id,
      order_type: reciept.orderType,
      orders: reciept.items,
      tip: reciept.tip,
      table_number: tableNumber,
      merchant: merchant,
      total_cost: totalCost,
      tax: tax
    });
    if (recordRes.error) {
      console.log(recordRes.error);
      return false;
    }

    return true;

  };

}

export default Payment;
