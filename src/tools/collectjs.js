import React, { Component, useState } from 'react';

class AppleGooglePay extends Component {

  constructor(props) {
    super(props);
  }

  start = async (valuee) => {
    const script = document.createElement('script');
    script.src = 'https://sharingthecredit.transactiongateway.com/token/Collect.js';
    script.setAttribute('data-tokenization-key', 'h62NTF-255gJG-Uw2UWX-k86K45');
    await document.body.appendChild(script);

    window.CollectJS.configure({
      'paymentSelector': '#customPayButton',
      'fields': {
        'ccnumber': {
          'selector': '#demoCcnumber',
          'title': 'Card Number',
          'placeholder': '0000 0000 0000 0000'
        },
        'ccexp': {
          'selector': '#demoCcexp',
          'title': 'Card Expiration',
          'placeholder': '00 / 00'
        },
        'cvv': {
          'display': 'show',
          'selector': '#demoCvv',
          'title': 'CVV Code',
          'placeholder': '***'
        },
        'googlePay': {
          'selector': '#googlePayButton',
          'shippingAddressRequired': true,
          'shippingAddressParameters': {
            'phoneNumberRequired': true,
            'allowedCountryCodes': ['US']
          },
          'billingAddressRequired': true,
          'billingAddressParameters': {
            'phoneNumberRequired': true,
            'format': 'MIN'
          },
          'emailRequired': true,
          'buttonType': 'buy',
          'buttonColor': 'white',
          'buttonLocale': 'en'
        },
        'applePay': {
          'selector': '#applePayButton',
          'requiredBillingContactFields': [
            'postalAddress',
            'name'
          ],
          'contactFields': [
            'phone',
            'email'
          ],
          'lineItems': [
            {
              'label': 'Foobar',
              'amount': '3.00'
            },
            {
              'label': 'Arbitrary Line Item #2',
              'amount': '1.00'
            }
          ],
          'totalLabel': 'foobar',
          'type': 'buy',
          'style': {
            'button-style': 'white-outline',
            'height': '50px',
            'border-radius': '0'
          }
        }
      },
      'price': '1.00',
      'currency': 'USD',
      'country': 'US',
      'variant': 'inline',
      'callback': function (response) {
        alert(response.token);
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'payment_token';
        input.value = response.token;
        var form = document.getElementsByTagName('form')[0];
        form.appendChild(input);
        form.submit();
      }
    });

  };
}

export default AppleGooglePay;

