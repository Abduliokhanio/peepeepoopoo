/* eslint-disable no-undef */
import React, { Component } from 'react';

class CollectJS extends Component {

  constructor(props) {
    super(props);
  }

  configure = async () => {
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
              'label': 'Foobar',
              'amount': '3.00'
            }
          ],
          'totalLabel': 'foobar',
          'type': 'pay'
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
          'buttonType': 'pay',
          'buttonColor': 'white',
          'buttonLocale': 'en'
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

export default CollectJS;

