/* eslint-disable no-undef */
import React, { Component } from 'react';

class CollectJS extends Component {

  constructor(props) {
    super(props);
  }

  configure = async ({ totalCost, merchantName }) => {
    console.log(totalCost, merchantName);
    window.CollectJS.configure({
      'fields': {
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
              'label': merchantName,
              'amount': totalCost.toString()
            }
          ],
          'totalLabel': totalCost,
          'type': 'order'
        },
        'googlePay': {
          'selector': '#googlePayButton',
          'billingAddressRequired': true,
          'billingAddressParameters': {
            'phoneNumberRequired': true,
            'format': 'MIN'
          },
          'emailRequired': true,
          'buttonType': 'checkout',
          'buttonColor': 'white',
          'buttonLocale': 'en'
        }
      },
      'price': totalCost.toString(),
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

export default CollectJS;

